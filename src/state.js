import { always } from 'ramda';
import { Observable } from 'rxjs';
import { createState } from 'rx_state';
import counterState$ from 'modules/counter/state';

export default createState(
  counterState$.map(counter => ['counter', always(counter)]),
  Observable.of({ counter: { } })
).do(state => console.debug('STATE', state)); // eslint-disable-line no-console
