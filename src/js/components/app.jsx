import React from 'react';
import LoggedOutPage from 'js/components/logged_out';

import { ajax } from 'jquery';

import 'scss/style.scss';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    ajax('/fetch_user').then((user) => {
      this.setState({ DbxAccessToken: user.accessToken });
    });
  }

  isLoggedIn() {
    return !!this.state.DbxAccessToken;
  }

  render() {
    if (!this.isLoggedIn()) {
      return <LoggedOutPage />;
    }

    return (
      <div>
        {JSON.stringify(this.state)}
        <a href="/logout" className="btn">
          log out
        </a>
      </div>
    );
  }
}
