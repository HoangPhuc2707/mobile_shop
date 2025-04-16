import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Col, Row } from "antd";
import { DashboardCard, DashboardCardBg, DashboardCardData, DashboardCardTittle } from "./style";
import * as UserService from '../../services/UserService';
import * as ProductService from '../../services/ProductService';
import * as OrderService from '../../services/OrderService';
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import iconcard1 from '../../assets/images/icons8-users-60.png';
import iconcard2 from '../../assets/images/icons8-product-60.png';
import iconcard3 from '../../assets/images/icons8-cart-48.png';
import PieChartComponent from '../OrderAdmin/PieChart';
import { useInView } from 'react-intersection-observer';


const AdminDashboard = () => {
    const user = useSelector((state) => state?.user)
    const getAllUser = async () => {
        const res = await UserService.getAllUser(user?.access_token)
        return res
    }
    const getAllProducts = async () => {
        const res = await ProductService.getAllProduct()
        return res
    }
    const getAllOrder = async () => {
        const res = await OrderService.getAllOrder(user?.access_token)
        return res
    }

    const queryUser = useQuery({ queryKey: ['users'], queryFn: getAllUser })
    const queryProduct = useQuery({ queryKey: ['products'], queryFn: getAllProducts })
    const queryOrder = useQuery({ queryKey: ['orders'], queryFn: getAllOrder })

    const { isPending: isPendingUsers, data: users } = queryUser
    const { isPending: isPendingProducts, data: products } = queryProduct
    const { isPending: isPendingOrders, data: orders } = queryOrder

    const { ref: cardRef, inView: isCardVisible } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    })


    const datachart = Array.isArray(products?.data)
        ? products.data.reduce((acc, product) => {
            const existingProduct = acc.find(item => item.type === product.type);

            if (existingProduct) {
                existingProduct.countInStock += product.countInStock;
            } else {
                acc.push({
                    type: product.type,
                    countInStock: product.countInStock
                });
            }
            return acc;
        }, [])
        : [];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p>{payload[0].payload.type}</p>
                    <p>{`Số lượng: ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <>
            <Row >
                <Col span={8}
                    ref={cardRef}
                    style={{
                        opacity: isCardVisible ? 1 : 0,
                        transform: isCardVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.5s ease, transform 0.5s ease',
                    }}>
                    <DashboardCard style={{ backgroundColor: '#fff' }}>
                        <DashboardCardBg src={iconcard1} alt="iconcard1" />
                        <div style={{ marginLeft: '100px', marginTop: '10px', textAlign: 'center' }}>
                            <DashboardCardTittle>Tài Khoản</DashboardCardTittle>
                            <DashboardCardData isPending={isPendingUsers}>{users?.data?.length}</DashboardCardData>
                        </div>
                    </DashboardCard>
                </Col>
                <Col span={8}
                    ref={cardRef}
                    style={{
                        opacity: isCardVisible ? 1 : 0,
                        transform: isCardVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.5s ease, transform 0.5s ease',
                    }}>
                    <DashboardCard style={{ backgroundColor: '#fff' }}>
                        <DashboardCardBg src={iconcard2} alt="iconcard2" />
                        <div style={{ marginLeft: '100px', marginTop: '10px', textAlign: 'center' }}>
                            <DashboardCardTittle>Sản Phẩm</DashboardCardTittle>
                            <DashboardCardData isPending={isPendingProducts}>{products?.data?.length}</DashboardCardData>
                        </div>
                    </DashboardCard>
                </Col>
                <Col span={8}
                    ref={cardRef}
                    style={{
                        opacity: isCardVisible ? 1 : 0,
                        transform: isCardVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.5s ease, transform 0.5s ease',
                    }}>
                    <DashboardCard style={{ backgroundColor: '#fff' }}>
                        <DashboardCardBg src={iconcard3} alt="iconcard3" />
                        <div style={{ marginLeft: '100px', marginTop: '10px', textAlign: 'center' }}>
                            <DashboardCardTittle>Đơn Hàng</DashboardCardTittle>
                            <DashboardCardData isPending={isPendingOrders}>{orders?.data?.length}</DashboardCardData>
                        </div>
                    </DashboardCard>
                </Col>
            </Row>
            <div style={{ display: 'flex', gap: '20px', marginTop: '40px', marginRight: '30px' }}>
                <div style={{ width: '66%', paddingRight: '10px', backgroundColor: '#fff' }}>
                    <h2 style={{ marginLeft: '20px', color: 'rgb(99, 99, 99)', fontSize: '16px' }}>Số Lượng Sản Phẩm</h2>
                    <div style={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <AreaChart
                                data={datachart}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="type" />
                                <YAxis />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="countInStock" stroke="#8884d8" fill="rgb(110, 186, 252)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div style={{ width: '32%', backgroundColor: '#fff' }}>
                    <h2 style={{ marginLeft: '20px', color: 'rgb(99, 99, 99)', fontSize: '16px' }}>Phương thức thanh toán</h2>
                    <div style={{ paddingLeft: '30px', height: 250, width: 250 }}>
                        <PieChartComponent data={orders?.data} />
                    </div>
                </div>
            </div>


        </>
    );
};

export default AdminDashboard