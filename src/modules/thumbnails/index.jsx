import { prop } from 'ramda';
import React, { PropTypes } from 'react';
import { connect } from 'rx_state';

import { addLifecycleHooks, selectState } from 'utils';

import './styles.scss';
import { inc$, dec$ } from './actions';

function Thumbnails({ dec, inc, value }) {
  return (
    <div>
      <p>{ value }</p>
      <button onClick={() => inc()}>+</button>
      <button onClick={dec}>-</button>
    </div>
  );
}

Thumbnails.propTypes = {
  dec: PropTypes.func.isRequired,
  inc: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default connect(selectState(prop('thumbnails'), {
  dec: dec$,
  inc: inc$,
}))(addLifecycleHooks({
  componentDidMount() { console.log('thumbnails component mounted!'); }, // eslint-disable-line no-console
}, Thumbnails));
