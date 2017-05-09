import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import FlatButton from 'material-ui/FlatButton';
import NavigateBefore from 'material-ui/svg-icons/image/navigate-before';


const BackButton = (props) => {
  const link = props.toAlbum ? `/albums/${props.albumId}` : '/';
  return (
    <FlatButton
      icon={<NavigateBefore />}
      containerElement={<Link to={link} />}
    />
  );
};

BackButton.propTypes = {
  albumId: PropTypes.string,
  toAlbum: PropTypes.bool.isRequired,
};

export default BackButton;
