import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListGroup extends Component {    
    render() { 
        const { items, currentItem, onItemSelect, valueProperty, textProperty } = this.props;
        return (
            <ul className="list-group">
                { 
                    items.map(item => (
                        <li className={ currentItem === item[valueProperty] ? "list-group-item active" : "list-group-item" }
                            key={item[valueProperty]}
                            onClick={() => onItemSelect(item)}>
                            {item[textProperty]}
                        </li>
                    ))
                }
            </ul>            
        );
    }
}

ListGroup.defaultProps = {
    valueProperty: 'id',
    textProperty: 'name'
}

ListGroup.propTypes = {
    items : PropTypes.array.isRequired,
    onItemSelect : PropTypes.func.isRequired,
    currentItem: PropTypes.string.isRequired,
}
 
export default ListGroup;