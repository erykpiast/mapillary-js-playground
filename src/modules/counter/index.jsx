import { prop } from 'ramda';
import React, { PropTypes } from 'react';
import { connect } from 'rx_state';

import { addLifecycleHooks, selectState } from 'utils';
import { inc$, dec$ } from './actions';

function Counter({ dec, inc, value }) {
  return (
    <div>
      <p>{ value }</p>
      <button onClick={() => inc()}>+</button>
      <button onClick={dec}>-</button>
    </div>
  );
}

Counter.propTypes = {
  dec: PropTypes.func.isRequired,
  inc: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default connect(selectState(prop('counter'), {
  dec: dec$,
  inc: inc$,
}))(addLifecycleHooks({
  componentDidMount() { console.log('counter component mounted!'); }, // eslint-disable-line no-console
}, Counter));
