import React from 'react';
import Dropbox from 'dropbox';

import FolderSelector from 'js/components/folder_selector';
import MusicPlayer from 'js/components/music_player';
import TitleBar from 'js/components/title_bar';
import { CellTypes } from 'js/components/cell_list_item';

export default class LoggedInPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPath: '/unwind',
      folders: [],
      files: [],
    };
    this.updateCurrentPath = this.updateCurrentPath.bind(this);
    this.updatePathFromCell = this.updatePathFromCell.bind(this);
    this.clearCurrentPath = this.clearCurrentPath.bind(this);
    this.dbx = new Dropbox({ accessToken: this.props.token });
  }

  componentDidMount() {
    this.getFileOrFolder();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPath !== this.state.currentPath) this.getFileOrFolder();
  }

  getFileOrFolder() {
    const { currentPath } = this.state;
    if (currentPath) this.getFileList(currentPath);
    else this.getFolderList();
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
    }).then((folders) => {
      this.setState({ folders });
    }).catch((err) => {
      console.error(err);
    });
  }

  getFileList(path) {
    return this.dbx.filesListFolder({ path })
    .then((res) => {
      const { entries } = res;
      return entries.filter((entry) => entry['.tag'].indexOf('file') !== -1);
    }).then((files) => {
      this.setState({ files });
    }).catch((err) => {
      console.error(err);
    });
  }

  isFolderSelected() {
    return !!this.state.currentPath;
  }

  updateCurrentPath(newPath) {
    this.setState({ currentPath: newPath });
    if (newPath) {
      this.getFileList(newPath);
    }
  }

  clearCurrentPath() {
    this.updateCurrentPath();
  }

  updatePathFromCell(cellData) {
    this.updateCurrentPath(cellData.data.path_lower);
  }

  renderTitleBar() {
    let folderSelectButton = null;
    if (this.isFolderSelected()) {
      folderSelectButton = (
        <button onClick={this.clearCurrentPath} className="btn">Select new folder</button>
      );
    }
    const logoutButton = <a className="btn" href="/logout">Log out</a>;
    return <TitleBar rightItems={logoutButton} leftItems={folderSelectButton} />;
  }

  render() {
    const body = this.isFolderSelected() ?
      <MusicPlayer files={this.state.files} dbx={this.dbx} /> :
      <FolderSelector folders={this.state.folders} onFolderSelect={this.updatePathFromCell} />;

    return (
      <div>
        {this.renderTitleBar()}
        <div className="title-body">
          {body}
        </div>
      </div>
    );
  }
}

LoggedInPage.propTypes = {
  token: React.PropTypes.string.isRequired,
};
