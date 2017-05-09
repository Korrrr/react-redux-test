import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import FacebookLogin from 'react-facebook-login';

import { fetchUser } from '../../actions';


class Login extends Component {
  constructor(props) {
    super(props);

    this.responseFacebook = this.responseFacebook.bind(this);
  }

  responseFacebook(response) {
    this.props.dispatch(fetchUser(response));
  }

  render() {
    return (
      <div>
        <FacebookLogin
          appId="1398291906918287"
          autoLoad={true}
          fields="name,email,picture"
          scope="public_profile,user_photos"
          callback={this.responseFacebook}
        />
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return {
    user: store.user,
  };
}

export default connect(mapStateToProps)(Login);
