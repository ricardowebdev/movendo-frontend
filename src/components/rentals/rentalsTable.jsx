import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from  '../commom/Table';
import auth from '../../services/vidly/authService';

const admin = auth.isAdmin();

class RentalsTable extends Component {
    columns = [
        { 
            path: 'movie.title',
            label: 'Movie',
            content: rental => {
                return admin 
                ? <Link to={`/rentals/${rental.id}`} ><span className="fc-primary link"><i className="fa fa-pencil"></i> { rental.movie.title }</span></Link>
                : rental.movie.title;
            }
        },
        { path: 'user.name', label: 'Customer' },        
        { path: 'rentalDays', label: 'Days' },
        { 
            path: 'returned',
            label: 'Return',
            content: rental => <span>{ rental.returned ? 'Yes' : 'No'  }</span>
        },
        { path: 'created_at', label: 'Date' },
        {
            key: 'delete',
            content: rental => {
                return admin 
                    ? <button onClick={() => this.props.onDelete(rental)} className="btn btn-danger btn-sm"><i className="fa fa-trash"></i></button>
                    : '';
            }
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