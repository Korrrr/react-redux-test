import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import graph from 'fb-react-sdk';

import { fetchAlbums } from '../actions';
import makePhotoURL from '../helpers/makePhotoURL';

import Albums from '../components/albums/Albums.jsx';


class AlbumsContainer extends Component {
  componentWillMount() {
    graph.setAccessToken(this.props.user.accessToken);
    graph.get('/me/albums', { fields: 'id,name,cover_photo,count' }, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        res.data.map(album => {
          album.imageURL = makePhotoURL(album.cover_photo.id, this.props.user.accessToken);
          this.props.dispatch(fetchAlbums(album));
        });
      }
    });
  }

  componentWillUnmount() {
    this.props.albums.length = 0;
  }

  render() {
    return (
      <Albums
        name={this.props.user.name}
        albums={this.props.albums}
      />
    );
  }
}

AlbumsContainer.propTypes = {
  user: PropTypes.shape({
    accessToken: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  albums: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return {
    user: store.user,
    albums: store.albums,
  };
}

export default connect(mapStateToProps)(AlbumsContainer);
