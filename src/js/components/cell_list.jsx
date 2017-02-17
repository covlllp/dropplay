import React from 'react';
import CellListItem from 'js/components/cell_list_item';

import 'scss/components/cell_list.scss';

export default class CellList extends React.PureComponent {
  renderItems() {
    return this.props.items.map((item, i) => (
      <CellListItem
        name={item.name}
        type={item.type}
        secondaryText={item.secondaryText}
        key={i}
      />
    ));
  }
  render() {
    return (
      <div className="cell-list">
        {this.renderItems()}
      </div>
    );
  }
}

CellList.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.shape(CellListItem.propTypes)),
};

