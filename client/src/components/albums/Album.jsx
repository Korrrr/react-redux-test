import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { GridList, GridTile } from 'material-ui/GridList';

import albumWithSubscription from '../../hoc/albumWithSubscription';

import BackButton from '../BackButton.jsx';


class Album extends Component {
  renderPhotos() {
    return this.props.photos.map((photo) => {
      return (
        <GridTile
          key={photo.id}
          title={photo.name}
          containerElement={<Link to={`/albums/${this.props.routeParams.albumId}/photo/${photo.id}`} />}
        >
          <img src={photo.imageURL} />
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
          <ToolbarTitle text={`Album: "${this.props.albumName}"`} />
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
  photos: PropTypes.array,
};

export default albumWithSubscription(Album);
