import { complement, identity, invoker, prop, reduce } from 'ramda';
import { Observable } from 'rxjs';
import { List, Map } from 'immutable';

import { shuffle } from 'utils/fun';
import { isNull } from 'utils/is';

import router$ from './router';
import { fetchFeatured, fetchPhotoDetails, fetchUserDetails } from './api';

const toArray = invoker(0, 'toArray');

const photoIdPattern = /^\/([0-9a-z-_]+)\/$/i;
function extractPhotoId(url) {
  const matched = url.match(photoIdPattern);
  if (matched) {
    return matched[1];
  }

  return null;
}

// fetch resource with fetchFn or get it from in-memory cache by cacheKey
// obtained from cacheKeySelector
function cachedFetch(cacheKeySelector, fetchFn) {
  return this.scan((cache, item) => {
    const cacheKey = cacheKeySelector(item);
    if (cache.has(cacheKey)) {
      return cache;
    }

    return cache.set(cacheKey, fetchFn(cacheKey));
  }, new Map())
  .flatMap(cache => Promise.all(
    cache
      .entrySeq()
      // dematerialize map
      .map(([key, promise]) => promise.then(value => [key, value]))
    )
    // and materialize again
    .then(reduce((acc, [key, value]) => acc.set(key, value), new Map()))
  )
  .map(cache => cache.filter(complement(isNull)));
}


/** @type {Observable<String>} */
export const currentPhotoId$ = router$.map(extractPhotoId).distinctUntilChanged();

/**
 * @type Photo
 * @property {String} id
 * @property {String} authorId
 * @property {Date} createdAt
 * @property {Object} location
 * @property {Number} location.lat
 * @property {Number} location.lon
 */
/** @type {Observable<Array<Photo>>} */
export const photos$ = currentPhotoId$
  .flatMap(() => fetchFeatured(10))
  .flatMap(identity)
  ::cachedFetch(identity, fetchPhotoDetails)
  .distinctUntilChanged()
  .publishReplay(1)
  .refCount();

/**
 * @type User
 * @property {String} id
 * @property {String} avatarUrl
 * @property {Date} joinedAt
 * @property {Number} distance
 * @property {Number} photosCount
 */
/** @type {Observable<Array<User>>} */
export const users$ = photos$
  .flatMap(toArray)
  ::cachedFetch(prop('authorId'), fetchUserDetails)
  .distinctUntilChanged()
  .publishReplay(1)
  .refCount();


export const featured$ = Observable.combineLatest(
  currentPhotoId$,
  photos$,
  users$,
  (currentPhotoId, photos, users) =>
    photos
      .toList()
      .filter(({ id }) => id !== currentPhotoId)
      .reduce(shuffle, new List())
      .take(10)
      .map(photo => ({
        ...photo,
        user: users.get(photo.authorId),
      }))
);
