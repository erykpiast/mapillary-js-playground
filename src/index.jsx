import React from 'react';

import Preview from 'modules/preview';
import Thumbnails from 'modules/thumbnails';

export default function App() {
  return (
    <div className="page-wrapper">
      <Thumbnails />
      <Preview />
    </div>
  );
}
