import React, { useState } from "react";
import { WrapperHeader, } from "./style";
import { SearchOutlined } from '@ant-design/icons'
import { Button, Space } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { useSelector } from "react-redux";
import * as OrderService from '../../services/OrderService';
import { useQuery } from "@tanstack/react-query";
import { convertPrice } from "../../utils";
import { orderContant } from '../../contant'
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const OrderAdmin = () => {
    const user = useSelector((state) => state?.user)

    const getAllOrder = async () => {
        const res = await OrderService.getAllOrder(user?.access_token)
        return res
    }

    const queryOrder = useQuery({ queryKey: ['orders'], queryFn: getAllOrder })
    const { isPending: isPendingOrders, data: orders } = queryOrder

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputComponent
                    // ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        // onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        // onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                // setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isPaid, setIsPaid] = useState(false);
    const [isDelivered, setIsDelivered] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    const handleApproveClick = (order) => {
        setSelectedOrder(order);
        setIsPaid(order.isPaid === 'Đã thanh toán');
        setIsDelivered(order.isDelivered === 'Đã giao hàng');
        setShowDialog(true);
    };

    const handleSaveStatus = async () => {
        if (!selectedOrder) return;
        // Call API update order status
        await OrderService.updateOrderStatus(selectedOrder.key, {
            isPaid,
            isDelivered
        }, user?.access_token);
        setShowDialog(false);
        setSelectedOrder(null);
        // Optionally: refetch orders
        queryOrder.refetch();
    };

    const handleCancelDialog = () => {
        setShowDialog(false);
        setSelectedOrder(null);
    };

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'userName',
            sorter: (a, b) => a.userName.length - b.userName.length,
            ...getColumnSearchProps('userName')
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            sorter: (a, b) => a.phone.length - b.phone.length,
            ...getColumnSearchProps('phone')
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            sorter: (a, b) => a.address.length - b.address.length,
            ...getColumnSearchProps('address')
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            sorter: (a, b) => a.createdAt - b.createdAt,
            ...getColumnSearchProps('createdAt')
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'paymentMethod',
            sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
            ...getColumnSearchProps('paymentMethod')
        },
        {
            title: 'Thanh toán',
            dataIndex: 'isPaid',
            sorter: (a, b) => a.isPaid.length - b.isPaid.length,
            ...getColumnSearchProps('isPaid')
        },
        {
            title: 'Giao hàng',
            dataIndex: 'isDelivered',
            sorter: (a, b) => a.isDelivered.length - b.isDelivered.length,
            ...getColumnSearchProps('isDelivered')
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
            ...getColumnSearchProps('totalPrice')
        },
        {
            title: 'Thao tác',
            dataIndex: 'action',
            render: (_, record) => (
                <span
                    style={{ color: '#3498db', cursor: 'pointer', fontWeight: 500 }}
                    onClick={() => handleApproveClick(record)}
                >Duyệt</span>
            )
        }
    ];
    const dataTable = orders?.data?.length && orders?.data?.map((order) => {
        return {
            ...order, key: order._id, userName: order?.shippingAddress?.fullName,
            phone: order?.shippingAddress?.phone, address: order?.shippingAddress?.address,
            paymentMethod: orderContant.payment[order?.paymentMethod],
            isPaid: order?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán', isDelivered: order?.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng',
            totalPrice: convertPrice(order?.totalPrice)
        }
    })

    return (
        <div>
            <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
            <div style={{ marginTop: '20px' }}>
                <TableComponent columns={columns} isPending={isPendingOrders} data={dataTable} />
            </div>
            {/* Dialog duyệt đơn hàng */}
            {showDialog && selectedOrder && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999
                }}>
                    <div style={{ background: '#fff', padding: 24, borderRadius: 8, minWidth: 320, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                        <h3 style={{ margin: 0, marginBottom: 16 }}>Duyệt đơn hàng</h3>
                        <div style={{ marginBottom: 16 }}>
                            <label style={{ marginRight: 8 }}>
                                <input type="checkbox" checked={isPaid} onChange={e => setIsPaid(e.target.checked)} /> Đã thanh toán
                            </label>
                            <label>
                                <input type="checkbox" checked={isDelivered} onChange={e => setIsDelivered(e.target.checked)} /> Đã giao hàng
                            </label>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                            <ButtonComponent
                                onClick={handleCancelDialog}
                                size={40}
                                styleButton={{
                                    height: '36px',
                                    border: '1px solid #3498db',
                                    borderRadius: '4px'
                                }}
                                textbutton={'Hủy'}
                                styletextbutton={{ color: '#3498db', fontSize: '14px' }}
                            ></ButtonComponent>
                            <ButtonComponent
                                onClick={handleSaveStatus}
                                size={40}
                                styleButton={{
                                    background: '#3498db',
                                    width: '70px',
                                    height: '36px',
                                    border: 'none',
                                    borderRadius: '4px'
                                }}
                                textbutton={'Lưu'}
                                styletextbutton={{ color: 'white', fontSize: '14px' }}
                            ></ButtonComponent>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderAdmin