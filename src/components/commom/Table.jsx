import React, { Component } from 'react';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

class Table extends Component {
    render() {
        const { columns, sortColumn, onSort, data } = this.props;

        return (
            <table className="table table-striped table-sm">
                <TableHeader
                    columns={columns}
                    sortColumn={sortColumn}
                    onSort={onSort}
                />
                <TableBody
                    data={data}
                    columns={columns}
                />
            </table>
        );
    }
}

export default Table;
