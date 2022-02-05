import React, { Component } from 'react';
import Table from  '../commom/Table';
import { Link } from 'react-router-dom';

class CustomersTable extends Component {
    columns = [
        { 
            path: 'name',
            label: 'Name',
            content: customer => <Link to={`/customer/${customer.id}`} ><i className="fa fa-pencil"></i> { customer.name }</Link>
        },
        { path: 'email', label: 'E-mail' },
        { 
            path: 'admin',
            label: 'Admin',
            content: customer => <span>{ customer.admin ? 'Yes' : 'No' }</span>
        },
        {
            key: 'delete',
            content: customer => <button onClick={() => this.props.onDelete(customer)} className="btn btn-danger btn-sm"><i className="fa fa-trash"></i> Remove</button>
        },
    ]
    
    render() {
        const { renderCustomers, onSort, sortColumn } = this.props; 
        return (
            <div className="table-responsive">                    
                <Table
                    columns={this.columns}
                    data={renderCustomers}
                    sortColumn={sortColumn}
                    onSort={onSort}
                />
            </div>            
        );
    }
}
 
export default CustomersTable;