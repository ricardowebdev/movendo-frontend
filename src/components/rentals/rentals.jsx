import React, { Component } from 'react';
import Pagination from '../commom/Pagination';
import { getRentals, deleteRental } from '../../services/vidly/rentalService';
import RentalsTable  from './rentalsTable';
import paginate from '../utils/paginate';
import Input from '../commom/input';
import Loader from '../commom/loader';
import _ from 'lodash';

class Rentals extends Component {
    state = {
        rentals: [],
        pageSize: 10,
        currentPage: 1,
        sortColumn: { path: 'title', order: 'asc' },
        search: '',
        loading: 'true'
    }

    async componentDidMount() {
        const rentals = await getRentals();
        this.setState({ rentals, loading: '' })
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    }

    handleSort = sortColumn => {       
        this.setState({ sortColumn })
    }

    handleNewRental = () => {
        this.props.history.push('/rentals/new');
    }

    handleSearch = ({ currentTarget: input }) => {
        let { search } = {...this.state.search };
        search = input.value;
        this.setState({ search, currentPage: 1 })
    }

    handleDelete = async(rental) =>  {
        const originalRentals = this.state.rentals;
        let rentals = this.state.rentals.filter(r => r.id !== rental.id);
        const result = await deleteRental(rental.id);

        if (!result) { rentals = originalRentals; }

        this.setState({ rentals });
    }

    getPageData = () => {
        const { pageSize, currentPage, rentals, sortColumn, search } = this.state;
        let filteredRentals = rentals;

        if (search) {
            filteredRentals = rentals.filter(rental => {
                const customer    = rentals.user.name.toUpperCase()
                const newCustomer = search.toUpperCase();
                const title = rentals.email.toUpperCase()
                const newTitle = search.toUpperCase();                

                return (customer.search(newCustomer) >= 0) || title.search(newTitle) >= 0;
            });
        }

        const sortedRentals = _.orderBy(filteredRentals, [sortColumn.path], [sortColumn.order])
        const renderRentals = paginate(sortedRentals, currentPage, pageSize);
        return { totalCount: renderRentals.length, data: renderRentals }
    }    

    render() {
        const { pageSize, currentPage, sortColumn } = this.state;      
        const { totalCount, data } = this.getPageData();
        const message = totalCount 
            ? `Showing ${totalCount} rentals in the database`
            : 'There are no rentals in the database.';
                                   
        return (
            <React.Fragment>
                <Loader isloading={this.state.loading}></Loader>
                <div className={this.state.loading ? 'hidden' : 'container-fluid no-padding justify-content-center'}>
                    <div className="row align-items-end m-2 p-1 mobile-content">
                        <div className="col-md-10 col-sm-12 col-lg-11">
                            {message}
                        </div>
                    </div>

                    <div className="row align-items-end m-2 p-1 mobile-content">
                        <div className="col-sm-8 col-md-8 col-lg-7">
                            <Input 
                                name='search'
                                label='Search'
                                type='text'
                                value={this.state.search}
                                autoFocus={true}
                                onChange={this.handleSearch}
                            />                                     
                        </div>
                        <div className="col-sm-3 col-md-3 col-lg-2">                                    
                            <button onClick={this.handleNewRental}
                                    className="btn btn-primary btn-sm mb-3">
                                <i className="fa fa-plus"></i> New rental
                            </button>
                        </div>
                    </div>

                    <div className="row align-items-center m-2 p-1 mobile-content">
                        <div className="col-md-11 col-sm-12 col-lg-11">
                            <RentalsTable 
                                renderRentals={data}
                                sortColumn={sortColumn}
                                onDelete={this.handleDelete}
                                onSort={this.handleSort}
                            />
                        </div>    
                    </div>

                    <div className="row align-items-end m-2 p-1">
                        <div className="col-md-10 col-sm-12 col-lg-11 p-2">
                            <Pagination
                                itemsCount={totalCount}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                onPageChange={this.handlePageChange}
                            />
                        </div>
                    </div>                    
                </div>
            </React.Fragment>
        );
    }
}
 
export default Rentals;
