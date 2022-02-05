import React, { Component } from 'react';
import Table from  '../commom/Table';
import { Link } from 'react-router-dom';

class RentalsTable extends Component {
    columns = [
        { 
            path: 'movie.title',
            label: 'Movie',
            content: rental => <Link to={`/rentals/${rental.id}`} ><i className="fa fa-pencil"></i> { rental.movie.title }</Link>
        },
        { path: 'user.name', label: 'Customer' },        
        { path: 'rentalDays', label: 'Rental Days' },
        { 
            path: 'returned',
            label: 'Returned',
            content: rental => <span>{ rental.returned ? 'Yes' : 'No'  }</span>
        },
        { path: 'created_at', label: 'Rental Date' },
        {
            key: 'delete',
            content: rental => <button onClick={() => this.props.onDelete(rental)} className="btn btn-danger btn-sm"><i className="fa fa-trash"></i> Remove</button>
        },
    ]
    render() {
        const { renderRentals, onSort, sortColumn } = this.props; 
        return (
            <div className="table-responsive">                    
                <Table
                    columns={this.columns}
                    data={renderRentals}
                    sortColumn={sortColumn}
                    onSort={onSort}
                />
            </div>            
        );

    }
}
 
export default RentalsTable;