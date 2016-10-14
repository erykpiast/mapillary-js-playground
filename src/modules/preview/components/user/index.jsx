import moment from 'moment';
import React, { PropTypes } from 'react';

import './styles.scss';

function formatDistance(distance) {
  return `${Number(distance / 1000).toFixed(2)}km`;
}

export default function User({ id, avatarUrl, distance, joinedAt, photosCount }) {
  return (
    <div className="media user-info">
      <div className="avatar user-info__avatar media__image">
        <img
          className="avatar__image"
          role="presentation"
          src={avatarUrl}
        />
      </div>
      <div className="media__content">
        <strong className="user-info__name">{id}</strong>
        <dl>
          <dt className="user-info-detail__label">Joined</dt>
          <dd className="user-info-detail__value user-info__joined">{moment(joinedAt).format('MM/DD/YYYY')}</dd>
          <br />
          <dt className="user-info-detail__label">Photos added</dt>
          <dd className="user-info-detail__value user-info__photos-count">{photosCount}</dd>
          <br />
          <dt className="user-info-detail__label">Total distance photographed</dt>
          <dd className="user-info-detail__value user-info__distance">{formatDistance(distance)}</dd>
        </dl>
      </div>
    </div>
  );
}

User.propTypes = {
  id: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
  joinedAt: PropTypes.instanceOf(Date).isRequired,
  photosCount: PropTypes.number.isRequired,
};
