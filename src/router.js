import { Observable } from 'rxjs';

export default Observable.fromEvent(window, 'hashchange')
  .startWith(true)
  .map(() => window.location.hash.slice(1));
