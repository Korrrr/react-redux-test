import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { Card, CardMedia, CardTitle } from 'material-ui/Card';

import graph from 'fb-react-sdk';

import BackButton from '../BackButton.jsx';
import makePhotoURL from '../../helpers/makePhotoURL';


class Photo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
      albumId: '',
      albumName: '',
    };
  }

  componentWillMount() {
    graph.setAccessToken(this.props.user.accessToken);
    graph.get(`/${this.props.routeParams.photoId}`, { fields: 'id,name,album' }, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        this.setState({
          id: res.id,
          name: res.name,
          albumId: res.album.id,
          albumName: res.album.name,
        });
      }
    });
  }

  renderPhoto() {
    return (
      <img src={makePhotoURL(this.props.routeParams.photoId, this.props.user.accessToken)}/>
    );
  }

  render() {
    const { name, albumName } = this.state;
    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <BackButton
              toAlbum
              albumId={this.props.routeParams.albumId}
            />
          </ToolbarGroup>
          <ToolbarTitle text={name || 'No name'} />
        </Toolbar>

        <Card>
          <CardMedia style={{ width: '60%', margin: 'auto' }}>
            {this.renderPhoto()}
          </CardMedia>
          <CardTitle title={name} subtitle={`From album: ${albumName}`} />
        </Card>
      </div>
    );
  }
}

Photo.propTypes = {
  routeParams: PropTypes.shape({
    albumId: PropTypes.string,
    photoId: PropTypes.string.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    accessToken: PropTypes.string.isRequired,
    name: PropTypes.string,
  }).isRequired,
};

function mapStateToProps(store) {
  return {
    user: store.user,
  };
}

export default connect(mapStateToProps)(Photo);
