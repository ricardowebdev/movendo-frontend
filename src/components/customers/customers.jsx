import React, { Component } from 'react';
import Pagination from '../commom/Pagination';
import CustomersTable  from './customersTable';
import { getCustomers, deleteCustomer } from '../../services/vidly/userService';
import paginate from '../utils/paginate';
import Input from '../commom/input';
import _ from 'lodash';


class Customers extends Component {
    state = {
        customers: [],
        pageSize: 5,
        currentPage: 1,
        sortColumn: { path: 'title', order: 'asc' },
        search: ''
    }

    async componentDidMount() {
        this.setState({
            customers: await getCustomers(),
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
                <div className="container-fluid">
                    <div className="row align-items-end m-2">
                        <div className="col-auto">
                            {message}
                        </div>
                    </div>

                    <div className="row align-items-end m-2">
                        <div className="col">
                            <Input 
                                name='search'
                                label='Search'
                                type='text'
                                value={this.state.search}
                                autoFocus={true}
                                onChange={this.handleSearch}
                            />                                     
                        </div>
                        <div className="col-3">                                    
                            <button onClick={this.handleNewCustomer}
                                    className="btn btn-primary btn-sm mb-3">
                                <i className="fa fa-plus"></i> New customer
                            </button>
                        </div>
                    </div>

                    <div className="row align-items-end m-2">
                        <div className="col">
                            <CustomersTable 
                                renderCustomers={data}
                                sortColumn={sortColumn}
                                onLike={this.handleLike}
                                onDelete={this.handleDelete}
                                onSort={this.handleSort}
                            />
                        </div>    
                    </div>

                    <div className="row align-items-end m-2">
                        <Pagination
                            itemsCount={totalCount}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}
                        />                        
                    </div>
                </div>                  
            </React.Fragment>
            
        );
    }
}
 
export default Customers;
