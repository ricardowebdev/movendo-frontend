import React, { Component } from 'react';
import Pagination from '../commom/Pagination';
import CustomersTable  from './customersTable';
import { getCustomers, deleteCustomer } from '../../services/vidly/userService';
import paginate from '../utils/paginate';
import Input from '../commom/input';
import Loader from '../commom/loader';
import _ from 'lodash';


class Customers extends Component {
    state = {
        customers: [],
        pageSize: 5,
        currentPage: 1,
        sortColumn: { path: 'title', order: 'asc' },
        search: '',
        loading: 'true'
    }

    async componentDidMount() {
        this.setState({
            customers: await getCustomers(),
            loading: ''
        })
    }
    
    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    }

    handleSort = sortColumn => {       
        this.setState({ sortColumn })
    }

    handleNewCustomer = () => {
        this.props.history.push('/customers/new');
    }
    
    handleSearch = ({ currentTarget: input }) => {
        let { search } = {...this.state.search };
        search = input.value;
        this.setState({ search, currentPage: 1 })
    }

    handleDelete = async(customer) =>  {
        const originalCustomers = this.state.customers;
        let customers = this.state.customers.filter(c => c.id !== customer.id);
        const result = await deleteCustomer(customer.id);

        if (!result) { customers = originalCustomers; }

        this.setState({ customers });
    }

    getPageData = () => {
        const { pageSize, currentPage, customers, sortColumn, search } = this.state;
        let filteredCustomers = customers;


        if (search) {
            filteredCustomers = customers.filter(customer => {
                const name = customer.name.toUpperCase()
                const newName = search.toUpperCase();
                const email = customer.email.toUpperCase()
                const newEmail = search.toUpperCase();                

                return (name.search(newName) >= 0) || email.search(newEmail) >= 0;
            });
        }

        const sortedCustomers = _.orderBy(filteredCustomers, [sortColumn.path], [sortColumn.order])
        const renderCustomers = paginate(sortedCustomers, currentPage, pageSize);
        
        return { totalCount: renderCustomers.length, data: renderCustomers }
    }


    render() { 
        const { pageSize, currentPage, sortColumn } = this.state;      
        const { totalCount, data } = this.getPageData();
        const message = totalCount 
            ? `Showing ${totalCount} customers in the database`
            : 'There are no customers in the database.';
                    
        return (
            <React.Fragment>
                <Loader isloading={this.state.loading}></Loader>
                <div className={this.state.loading ? 'hidden' : 'container-fluid no-padding'}>
                    <div className="row align-items-end m-2 p-1">
                        <div className="col-md-10 col-sm-10 col-lg-11">
                            {message}
                        </div>
                    </div>

                    <div className="row align-items-end m-2 p-1">
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
                            <button onClick={this.handleNewCustomer}
                                    className="btn btn-primary btn-sm mb-3">
                                <i className="fa fa-plus"></i> New customer
                            </button>
                        </div>
                    </div>

                    <div className="row align-items-end m-2 p-1">
                        <div className="col-md-11 col-sm-12 col-lg-11">
                            <CustomersTable 
                                renderCustomers={data}
                                sortColumn={sortColumn}
                                onLike={this.handleLike}
                                onDelete={this.handleDelete}
                                onSort={this.handleSort}
                            />
                        </div>    
                    </div>

                    <div className="row align-items-end m-2 p-1">
                        <div className="col-md-10 col-sm-12 col-lg-10 p-2">
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
 
export default Customers;
