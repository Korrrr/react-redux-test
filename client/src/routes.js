import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './app.jsx';
import Album from './components/albums/Album.jsx';
import Photo from './components/albums/Photo.jsx';
import FileUpload from './components/fileUpload/FileUpload.jsx';
import NotFound from './components/NotFound.jsx';

import AlbumsContainer from './containers/AlbumsContainer.jsx';


const Routes = props => (
  <Router {...props}>
    <Route path="/" component={App}>
      <IndexRoute component={AlbumsContainer} />
      <Route path="/albums/:albumId" component={Album} />
      <Route path="/albums/:albumId/photo/:photoId" component={Photo} />
      <Route path="/fileUpload" component={FileUpload} />
    </Route>
    <Route path="*" component={NotFound} />
  </Router>
);

export default Routes;
