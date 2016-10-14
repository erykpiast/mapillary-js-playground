import { always } from 'ramda';
import { Observable } from 'rxjs';
import { createState } from 'rx_state';

import { currentPhotoId$, photos$, users$ } from './resources';

export default createState(
  Observable.merge(
    currentPhotoId$.map(currentPhotoId => ['currentPhotoId', always(currentPhotoId)]),
    photos$.map(photos => ['photos', always(photos.toObject())]),
    users$.map(users => ['users', always(users.toObject())]),
  ),
  Observable.of({
    currentPhotoId: null,
    photos: {},
    users: {},
  })
).do(state => console.debug('STATE', state)); // eslint-disable-line no-console
