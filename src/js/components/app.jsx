import React from 'react';

import LoggedOutPage from 'js/components/logged_out';
import LoggedInPage from 'js/components/logged_in';

import { ajax } from 'jquery';

import 'scss/style.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    ajax('/fetch_user').then((user) => {
      this.setState({ dbxAccessToken: user.accessToken });
    });
  }

  isLoggedIn() {
    return !!this.state.dbxAccessToken;
  }

  render() {
    if (!this.isLoggedIn()) {
      return <LoggedOutPage />;
    }
    return <LoggedInPage token={this.state.dbxAccessToken} />;
  }
}
