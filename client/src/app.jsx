import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab } from 'material-ui/Tabs';
import Collections from 'material-ui/svg-icons/image/collections';
import FileUpload from 'material-ui/svg-icons/file/file-upload';

import { logout } from './actions';
import Login from './components/login/Login.jsx';


injectTapEventPlugin();

class App extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.dispatch(logout());
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Tabs>
            <Tab
              icon={<Collections />}
              containerElement={<Link to="/" />}
            />
            <Tab
              icon={<FileUpload />}
              containerElement={<Link to="/fileUpload" />}
            />
          </Tabs>

          {this.props.user && this.props.user.isLogin ?
            <div>
              {this.props.children}
              <button onClick={this.handleLogout}>Logout</button>
            </div>
            :
            <Login />
          }
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  user: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return {
    user: store.user,
  };
}

export default connect(mapStateToProps)(App);
