import React from 'react';
import CellListItem from 'js/components/cell_list_item';

import classNames from 'classnames';
import 'scss/components/cell_list.scss';

export default class CellList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCell: null,
    };
  }

  updateSelectedCell(index) {
    if (index === this.state.selectedCell) this.setState({ selectedCell: null });
    else this.setState({ selectedCell: index });
  }

  renderItems() {
    return this.props.items.map((item, i) => {
      const onSelect = this.updateSelectedCell.bind(this, i);

      return (<CellListItem
        name={item.name}
        type={item.type}
        secondaryText={item.secondaryText}
        buttonText={this.props.buttonText}
        onSelect={onSelect}
        isSelected={this.state.selectedCell === i}
        onButtonClick={this.props.onButtonClick}
        itemData={item}
        key={i}
      />);
    });
  }
  render() {
    const classes = classNames('cell-list', this.props.className);
    return (
      <div className={classes}>
        {this.renderItems()}
      </div>
    );
  }
}

CellList.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.shape(CellListItem.propTypes)),
  onButtonClick: React.PropTypes.func,
  buttonText: React.PropTypes.string,
  className: React.PropTypes.string,
};

