import React from 'react';

import CellList from 'js/components/cell_list';

import 'scss/components/folder_selector.scss';

export default class FolderSelector extends React.PureComponent {
  render() {
    return (
      <div className="container folder-selector">
        <div className="folder-header">
          <h2 className="sub-title">
            Select a folder with music!
          </h2>
        </div>
        <CellList
          items={this.props.folders}
          onButtonClick={this.props.onFolderSelect}
          buttonText="Select"
          className="folder-body"
        />
      </div>
    );
  }
}

FolderSelector.propTypes = {
  folders: React.PropTypes.array.isRequired,
  onFolderSelect: React.PropTypes.func,
};
