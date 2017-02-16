import React from 'react';
import Dropbox from 'dropbox';

export default class LoggedInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPath: null,
      folders: [],
      files: [],
    };
    this.dbx = new Dropbox({ accessToken: this.props.token });
  }

  componentDidMount() {
    this.getFolderList()
      .then((folders) => {
        this.setState({ folders });
      }).catch((err) => { console.error(err); });
  }

  getFolderList(path = '') {
    return this.dbx.filesListFolder({ path })
      .then((res) => {
        const { entries } = res;
        return entries.filter((entry) => entry['.tag'].indexOf('folder') !== -1);
      });
  }

  render() {
    return <div>{JSON.stringify(this.state)}</div>;
  }
}

LoggedInPage.propTypes = {
  token: React.PropTypes.string.isRequired,
};
