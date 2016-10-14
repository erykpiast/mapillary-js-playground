import { always, invoker, map, prop } from 'ramda';
import querystring from 'querystring';

export const CLIENT_ID = 'TXZSREplNUF4ZnRTa2FzMHEzV3ptUTo5ZmIzOWVhNTM4MGFjYjg1';
export const DEFAULT_AVATAR = 'http://res.cloudinary.com/demo/image/facebook/w_100,h_100,c_fill,d_avatar2.png/non_existing_id.jpg';

const ROOT = 'https://a.mapillary.com/v2/';

const createPath = (path, params = {}) => `${ROOT}${path}?${querystring.stringify({
  ...params,
  client_id: CLIENT_ID,
})}`;
const createThumbUrl = id => `https://d1cuyjsrcm0gby.cloudfront.net/${id}/thumb-320.jpg`;
const json = invoker(0, 'json');
const fetchJson = url => fetch(url).then(json);

export const fetchFeatured = amount => fetchJson(createPath('search/s/ul', {
  max_lat: 180,
  max_lon: 90,
  min_lat: -90,
  min_lon: -180,
  limit: amount,
  starred: true,
})).then(prop('ss'), always([])).then(map(prop('mkey')));


export const fetchPhotoDetails = id => fetchJson(createPath(`im/${id}`))
  .then(({ captured_at, key, lat, lon, user }) => ({
    id,
    key,
    authorId: user,
    createdAt: captured_at,
    location: { lat, lon },
    thumbnailUrl: createThumbUrl(id),
  }), always(null));

export const fetchUserDetails = id => fetchJson(createPath(`u/${id}`))
  .then(({ avatar, distance_all, images_all, member_since }) => ({
    id,
    avatarUrl: avatar || DEFAULT_AVATAR,
    distance: distance_all,
    joinedAt: new Date(member_since), // eslint-disable-line camelcase
    photosCount: images_all,
  }), always(null));
