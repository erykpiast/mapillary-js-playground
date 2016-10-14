import React from 'react';
import { render } from 'react-dom';
import { RxStateProvider } from 'rx_state';

import './styles.scss';

import App from './index';
import state$ from './state';

render(
  <RxStateProvider state$={state$}>
    <App />
  </RxStateProvider>,
  document.getElementById('app'),
);
