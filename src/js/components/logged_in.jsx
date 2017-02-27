import React from 'react';
import Dropbox from 'dropbox';

import FolderSelector from 'js/components/folder_selector';
import TitleBar from 'js/components/title_bar';
import { CellTypes } from 'js/components/cell_list_item';

export default class LoggedInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPath: '',
      folders: [],
      files: [],
    };
    this.updateCurrentPath = this.updateCurrentPath.bind(this);
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

  isFolderSelected() {
    return !!this.state.currentPath;
  }

  updateCurrentPath(cellData) {
    this.setState({ currentPath: `/${cellData.name}` });
  }

  render() {
    // const body = this.isFolderSelected() ?
    //   <div /> :
    //   <FolderSelector folders={this.state.folders} onFolderSelect={this.updateCurrentPath} />;

    return (
      <div>
        <TitleBar />
        <div className="title-body">
          {this.state.currentPath}
          <FolderSelector folders={this.state.folders} onFolderSelect={this.updateCurrentPath} />
        </div>
      </div>
    );
  }
}

LoggedInPage.propTypes = {
  token: React.PropTypes.string.isRequired,
};
