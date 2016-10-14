import React, { PropTypes } from 'react';
import { connect } from 'rx_state';

import MlyWrapper from 'components/mly';
import GeoPoint from 'utils/geopoint';

import { CLIENT_ID } from '../../api';
import User from './components/user';
import './styles.scss';

function formatLocation({ lat, lon }) {
  const g = new GeoPoint(lon, lat);

  return `${g.getLonDeg()}, ${g.getLatDeg()}`;
}


function Preview({ photo, user }) {
  if (!photo) {
    return (<p>Choose valid photo from list on the right</p>);
  }

  return (
    <div>
      <MlyWrapper clientId={CLIENT_ID} photoKey={photo.key} />
      <div className="photo-meta">
        <strong className="photo-meta__label">Location:</strong>&nbsp;
        {formatLocation(photo.location)}
      </div>
      { user ? <User {...user} /> : null }
    </div>
  );
}

Preview.propTypes = {
  photo: PropTypes.shape({
    key: PropTypes.string.isRequired,
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lon: PropTypes.number.isRequired,
    }).isRequired,
  }),
  user: PropTypes.object,
};

export default connect(({ currentPhotoId, photos, users }) => {
  const photo = photos[currentPhotoId];
  if (!photo) {
    return {
      photo: null,
      user: null,
    };
  }

  const user = users[photo.authorId];
  return { photo, user };
})(Preview);
