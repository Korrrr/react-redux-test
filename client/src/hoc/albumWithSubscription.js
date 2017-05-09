import React, { Component, PropTypes } from 'react';
import graph from 'fb-react-sdk';
import { connect } from 'react-redux';

import { fetchPhotos } from '../actions';

import makePhotoURL from '../helpers/makePhotoURL';


function albumWithSubscription(WrappedComponent) {
  class WithSubscription extends Component {
    constructor(props) {
      super(props);

      this.state = {
        albumName: '',
      };
    }

    componentWillMount() {
      graph.setAccessToken(this.props.user.accessToken);
      graph.get(`/${this.props.routeParams.albumId}/photos`, { fields: 'id,name,album' }, (err, res) => {
        if (err) {
          console.error(err);
        } else {
          this.setState({
            albumName: res.data[0].album.name,
          });
          res.data.map((photo) => {
            photo.imageURL = makePhotoURL(photo.id, this.props.user.accessToken);
            this.props.dispatch(fetchPhotos(photo));
          });
        }
      });
    }

    componentWillUnmount() {
      this.props.photos.length = 0;
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  }

  WithSubscription.propTypes = {
    routeParams: PropTypes.shape({
      albumId: PropTypes.string,
    }).isRequired,
    user: PropTypes.shape({
      accessToken: PropTypes.string,
    }).isRequired,
    photos: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
  };

  function mapStateToProps(store) {
    return {
      user: store.user,
      photos: store.photos,
    };
  }

  return connect(mapStateToProps)(WithSubscription);
}

export default albumWithSubscription;
