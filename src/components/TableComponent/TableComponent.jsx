import { Table } from "antd";
import React from "react";

const TableComponent = (props) => {
    const { selectionType = 'checkbox' } = props

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
    ];
    const data = [
        {
            key: '1',
            name: 'John',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim',
            age: 42,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '4',
            name: 'Jack',
            age: 99,
            address: 'New York No. 1 Lake Park',
        },
    ];
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            name: record.name,
        }),
    }
    return (
        <Table
            rowSelection={{
                type: selectionType,
                ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
        />
    );
};

export default TableComponent