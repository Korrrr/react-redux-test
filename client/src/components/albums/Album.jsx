import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { GridList, GridTile } from 'material-ui/GridList';

import graph from 'fb-react-sdk';

import { fetchPhotos } from '../../actions';

import BackButton from '../BackButton.jsx';
import makePhotoURL from '../../helpers/makePhotoURL';


class Album extends Component {
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
        res.data.map(photo => this.props.dispatch(fetchPhotos(photo)));
      }
    });
  }

  componentWillUnmount() {
    this.props.photos.length = 0;
  }

  renderPhotos() {
    return this.props.photos.map((photo) => {
      const src = makePhotoURL(photo.id, this.props.user.accessToken);
      return (
        <GridTile
          key={photo.id}
          title={photo.name}
          containerElement={<Link to={`/albums/${this.props.routeParams.albumId}/photo/${photo.id}`} />}
        >
          <img src={src} />
        </GridTile>
      );
    });
  }

  render() {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <BackButton
              toAlbum={false}
            />
          </ToolbarGroup>
          <ToolbarTitle text={`Album: "${this.state.albumName}"`} />
        </Toolbar>

        <GridList
          cellHeight={180}
          cols={4}
        >
          {this.renderPhotos()}
        </GridList>
      </div>
    );
  }
}

Album.propTypes = {
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

export default connect(mapStateToProps)(Album);
