import React from 'react';
import classNames from 'classnames';

export const CellTypes = {
  FOLDER: 'folder',
  FILE: 'file',
};

const srcMap = {};
srcMap[CellTypes.FOLDER] = 'images/folder_icon.png';

export default class CellListItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick(e) {
    e.stopPropagation();
    this.props.onButtonClick({
      name: this.props.name,
      secondaryText: this.props.secondaryText,
      data: this.props.itemData,
    });
  }

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
    return (
      <div className="item__name">
        {this.props.name}
      </div>
    );
  }

  renderSecondaryText() {
    return <div className="item__secondary-text">{this.props.secondaryText}</div>;
  }

  renderButton() {
    if (!this.props.isSelected) return null;
    return (
      <button
        className="btn primary item__btn"
        onClick={this.onButtonClick}
      >
        {this.props.buttonText}
      </button>
    );
  }

  render() {
    const classes = classNames({
      item: true,
      selected: this.props.isSelected,
    });


    return (
      <div className={classes} onClick={this.props.onSelect}>
        {this.renderIcon()}
        {this.renderName()}
        {this.renderSecondaryText()}
        {this.renderButton()}
      </div>
    );
  }
}

CellListItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  type: React.PropTypes.oneOf(Object.values(CellTypes)).isRequired,
  secondaryText: React.PropTypes.string,
  buttonText: React.PropTypes.string,
  isSelected: React.PropTypes.bool,
  onSelect: React.PropTypes.func,
  onButtonClick: React.PropTypes.func,
  itemData: React.PropTypes.object,
};
