import React from 'react';
import Dropbox from 'dropbox';

import CellList from 'js/components/cell_list';
import { CellTypes } from 'js/components/cell_list_item';

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
    });
  }

  getFolderList(path = '') {
    return this.dbx.filesListFolder({ path })
    .then((res) => {
      const { entries } = res;
      return entries.filter((entry) => entry['.tag'].indexOf('folder') !== -1)
      .map((entry) => {
        const modEntry = entry;
        modEntry.type = CellTypes.FOLDER;
        return modEntry;
      });
    });
  }

  render() {
    return (
      <div>
        <CellList items={this.state.folders} />
      </div>
    );
  }
}

LoggedInPage.propTypes = {
  token: React.PropTypes.string.isRequired,
};
