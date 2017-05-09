import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import Routes from './routes';

import store from './store';


ReactDom.render(
  <Provider store={store}>
    <Routes history={browserHistory} />
  </Provider>
  , document.getElementById('react-app'));
