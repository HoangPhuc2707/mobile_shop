import { Button, Table } from "antd";
import React, { useState } from "react";
import Loading from "../../components/LoadingComponent/Loading";
import { Excel } from "antd-table-saveas-excel";
import { useMemo } from 'react';

const TableComponent = (props) => {
    const { selectionType = 'checkbox', data: dataSource = [], isPending = false, columns = [], handleDeleteMany } = props
    const [rowSelectedKeys, setRowSelectedKeys] = useState([])
    const newColumnExport = useMemo(() => {
        const arr = columns?.filter((col) => col.dataIndex !== 'action')
        return arr
    }, [columns])

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys)
        },
        // getCheckboxProps: (record) => ({
        //     disabled: record.name === 'Disabled User',
        //     name: record.name,
        // }),
    }

    const handleDeleteAll = () => {
        handleDeleteMany(rowSelectedKeys)
    }

    const exportExcel = () => {
        const excel = new Excel();
        excel
            .addSheet("test")
            .addColumns(newColumnExport)
            .addDataSource(dataSource, {
                str2Percent: true
            })
            .saveAs("Excel.xlsx");
    };

    return (
        <Loading isPending={isPending}>
            <div style={{ display: 'flex', marginRight: '20px', justifyContent: rowSelectedKeys.length > 0 ? 'space-between' : 'flex-end' }}>
                {rowSelectedKeys.length > 0 && (
                    <div style={{
                        width: '115px',
                        color: 'red',
                        border: '1px solid red',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        padding: '7px',
                        cursor: 'pointer',
                        marginBottom: '10px',
                        borderRadius: '4px',
                    }}
                        onClick={handleDeleteAll}
                    >
                        Xóa tất cả
                    </div>
                )}
                <Button style={{ marginBottom: '10px' }} onClick={exportExcel}>Xuất file Excel</Button>
            </div>
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={dataSource}
                {...props}
            />
        </Loading >
    );
};

export default TableComponent