import React from 'react';

import CellList from 'js/components/cell_list';

export default class FolderSelector extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <h2 className="sub-title">
          Select a folder with music!
        </h2>
        <CellList
          items={this.props.folders}
          onButtonClick={this.props.onFolderSelect}
          buttonText="Select"
        />
      </div>
    );
  }
}

FolderSelector.propTypes = {
  folders: React.PropTypes.array.isRequired,
  onFolderSelect: React.PropTypes.func,
};
