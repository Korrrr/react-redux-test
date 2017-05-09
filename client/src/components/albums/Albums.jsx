import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import { List, ListItem } from 'material-ui/List';
import NavigateNext from 'material-ui/svg-icons/image/navigate-next';

import makePhotoURL from '../../helpers/makePhotoURL';


class Albums extends Component {
  renderAlbums() {
    // fake DB
    const fakeDB = [];
    this.props.albums.map(album => fakeDB.push(album.name));
    sessionStorage.setItem('fakeDB', [fakeDB]);

    return this.props.albums.map((album) => {
      return (
        <ListItem
          key={album.id}
          leftAvatar={<img src={album.imageURL} width="40" height="40" />}
          primaryText={album.name}
          secondaryText={`${album.count} Photo(s)`}
          rightIcon={<NavigateNext />}
          containerElement={<Link to={`/albums/${album.id}`} />}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <Toolbar>
          <ToolbarTitle text={`Welcome, ${this.props.name}`} />
        </Toolbar>
        <List>
          {this.renderAlbums()}
        </List>
      </div>
    );
  }
}

Albums.propTypes = {
  name: PropTypes.string.isRequired,
  albums: PropTypes.array.isRequired,
};

export default Albums;
