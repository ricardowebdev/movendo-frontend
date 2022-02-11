import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Like from '../commom/Like';
import Table from  '../commom/Table';
import auth from '../../services/vidly/authService';

const admin = auth.isAdmin();

class MoviesTable extends Component {
    
    columns = [
        { 
            path: 'title',
            label: 'Title',
            content: movie => {
                return admin 
                    ? <Link to={`/movies/${movie.id}`} ><span className="fc-primary link"><i className="fa fa-pencil"></i>{ movie.title }</span></Link>
                    : movie.title;
            }

        },
        { path: 'genre.name', label: 'Genre' },
        { path: 'numberInStock', label: 'Stock' },
        { path: 'dailyRentalRate', label: 'Rate' },
        { 
            key: 'like', 
            content: movie => <Like liked={movie.liked} onLike={() => this.props.onLike(movie)}/>
        },
        {
            key: 'delete',
            content: movie => {
                return admin 
                    ? <button onClick={() => this.props.onDelete(movie)} className="btn btn-danger btn-sm"><i className="fa fa-trash"></i></button>
                    : '';
            }
        },
    ]
    render() {
        const { renderMovies, onSort, sortColumn } = this.props; 
        return (
            <div className="table-responsive">                    
                <Table
                    columns={this.columns}
                    data={renderMovies}
                    sortColumn={sortColumn}
                    onSort={onSort}
                />
            </div>            
        );
    }
}
 
export default MoviesTable;