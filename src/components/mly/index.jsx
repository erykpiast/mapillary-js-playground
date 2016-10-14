import { Viewer } from 'mapillary-js';
import React, { Component, PropTypes } from 'react';

import './styles.scss';

export default class MlyWrapper extends Component {
  static propTypes = {
    clientId: PropTypes.string.isRequired,
    photoKey: PropTypes.string,
  }

  componentDidMount() {
    console.log('preview component mounted!');
  }

  componentWillReceiveProps(nextProps) {
    const createViewer = () => {
      window.MLY = this.viewer = new Viewer('mly', this.props.clientId, nextProps.photoKey);
    };

    if (nextProps.photoKey !== this.props.photoKey) {
      if (!nextProps.photoKey) {
        return;
      }


      if (!this.viewer) {
        createViewer();
      } else {
        this.viewer.moveToKey(nextProps.photoKey).then(() => console.debug('photo changed!'));
      }
    } else if (this.props.photoKey && !this.viewer) {
      createViewer();
    }
  }

  shouldComponentUpdate() {
    return false; // prevent React from modyfinig DOM
  }

  render() {
    return <div className="mly-wrapper"><div id="mly" /></div>;
  }
}
