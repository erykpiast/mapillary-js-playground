import { filter, map, pipe, slice, values } from 'ramda';
import React, { PropTypes } from 'react';
import { connect } from 'rx_state';

import { addLifecycleHooks, selectState } from 'utils';
import { shuffle } from 'utils/fun';
import { isDefined } from 'utils/is';

import './styles.scss';

function Thumbnails({ featured }) {
  return (
    <ul className="featured unstyled-list unstyled-list--vertical">{
      featured.map(({ id, thumbnailUrl, author }) => (
        <li className="featured__item thumbnail unstyled-list__item" key={id}>
          <a className="thumbnail__link" href={`#/${id}/`}>
            <img className="thumbnail__image" role="presentation" src={thumbnailUrl} />
          </a>
          { author ?
            <div className="featured__author-avatar avatar avatar--micro">
              <img className="avatar__image" role="presentation" src={author.avatarUrl} />
            </div> :
            null
          }
        </li>
      ))
    }</ul>
  );
}

Thumbnails.propTypes = {
  featured: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbnailUrl: PropTypes.string.isRequired,
    author: PropTypes.shape({
      avatarUrl: PropTypes.string.isRequired,
    }),
  })).isRequired,
};

export default connect(selectState(({ currentPhotoId, photos, users }) => {
  const featured = pipe(
    values,
    filter(({ id }) => id !== currentPhotoId),
    arr => arr.reduce(shuffle, []),
    slice(0, 10),
    filter(isDefined),
    map(photo => ({
      ...photo,
      author: users[photo.authorId],
    }))
  )(photos);

  return { featured };
}))(addLifecycleHooks({
  componentDidMount() { console.log('thumbnails component mounted!'); }, // eslint-disable-line no-console
}, Thumbnails));
