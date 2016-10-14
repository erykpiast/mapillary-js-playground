import { always } from 'ramda';
import { Observable } from 'rxjs';
import { createState } from 'rx_state';

import previewState$ from 'modules/preview/state';
import thumbnailsState$ from 'modules/thumbnails/state';
import { currentPhotoId$, featured$, photos$, users$ } from './resources';

export default createState(
  Observable.merge(
    currentPhotoId$.map(currentPhotoId => ['currentPhotoId', always(currentPhotoId)]),
    photos$.map(photos => ['photos', always(photos.toObject())]),
    users$.map(users => ['users', always(users.toObject())]),
    featured$.map(featured => ['featured', always(featured.toArray())]),
    previewState$.map(preview => ['preview', always(preview)]),
    thumbnailsState$.map(thumbnails => ['thumbnails', always(thumbnails)]),
  ),
  Observable.of({ preview: { }, thumbnails: { } })
).do(state => console.debug('STATE', state)); // eslint-disable-line no-console
