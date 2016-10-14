import { always, dec, inc } from 'ramda';
import { Observable } from 'rxjs';
import { createState } from 'rx_state';

import { inc$, dec$ } from 'modules/counter/actions';

export default createState(Observable.merge(
  dec$.map(always(dec)),
  inc$.map(always(inc)),
).map(reducer => ['value', reducer]), Observable.of({ value: 0 }));
