import React from 'react';

export const CellTypes = {
  FOLDER: 'folder',
  FILE: 'file',
};

const srcMap = {};
srcMap[CellTypes.FOLDER] = 'images/folder_icon.png';

export default class CellListItem extends React.PureComponent {
  getImageSrc() {
    return srcMap[this.props.type];
  }

  renderIcon() {
    return (
      <div className="item__image">
        <img src={this.getImageSrc()} alt="icon" />
      </div>
    );
  }

  renderName() {
    return <div className="item__name">{this.props.name}</div>;
  }

  renderSecondaryText() {
    return <div className="item__secondary-text">{this.props.secondaryText}</div>;
  }

  render() {
    return (
      <div className="item">
        {this.renderIcon()}
        {this.renderName()}
        {this.renderSecondaryText()}
      </div>
    );
  }
}

CellListItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  type: React.PropTypes.oneOf(Object.keys(CellTypes)).isRequired,
  secondaryText: React.PropTypes.string,
};
