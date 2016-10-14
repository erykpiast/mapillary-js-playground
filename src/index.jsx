import React from 'react';

import Preview from 'modules/preview';
import Thumbnails from 'modules/thumbnails';

import './styles.scss';

export default function App() {
  return (
    <div className="page">
      <div className="page__content"><Preview /></div>
      <aside className="page__sidebar"><Thumbnails /></aside>
    </div>
  );
}
