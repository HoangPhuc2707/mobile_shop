// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Col, Row, Spin } from "antd";
import { DashboardCard, DashboardCardBg, DashboardCardData, DashboardCardTittle, DashboardHeader, StatItem } from "./style";
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
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { formatDate } from "../../utils";


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

    const formatDate = () => {
        const date = new Date();
        return date.toLocaleDateString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const { ref: cardRef, inView: isCardVisible } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    })

    // Tạo data cho BarChart: số lượng sản phẩm và số lượng đã bán theo từng loại
    const data = Array.isArray(products?.data)
        ? products.data.reduce((acc, product) => {
            const type = product.type || 'Khác';
            const found = acc.find(item => item.type === type);
            if (found) {
                found.countInStock += product.countInStock;
                found.selled += product.selled || 0;
            } else {
                acc.push({ type, countInStock: product.countInStock, selled: product.selled || 0 });
            }
            return acc;
        }, [])
        : [];

    const totalRevenue = Array.isArray(orders?.data)
        ? orders.data.reduce((sum, order) => sum + (order.totalPrice || 0), 0)
        : 0;
    return (
        <div style={{
            minHeight: '100vh',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <DashboardHeader>
                <div>
                    <h1 style={{ fontSize: '24px', color: '#1a1a1a', margin: 0 }}>
                        Chào mừng, {user?.name || 'Admin'}!
                    </h1>
                    <p style={{ color: '#637381', margin: '4px 0 0' }}>
                        {formatDate()}
                    </p>
                </div>
            </DashboardHeader>
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
                            <DashboardCardData isPending={isPendingUsers}>
                                {isPendingUsers ? <Spin size="large" /> : users?.data?.length}
                            </DashboardCardData>
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
                            <DashboardCardData isPending={isPendingProducts}>
                                {isPendingProducts ? <Spin size="large" /> : products?.data?.length}
                            </DashboardCardData>
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
                            <DashboardCardData isPending={isPendingOrders}>
                                {isPendingOrders ? <Spin size="large" /> : orders?.data?.length}
                            </DashboardCardData>
                        </div>
                    </DashboardCard>
                </Col>
            </Row>
            <div style={{ display: 'flex', gap: '20px', marginTop: '40px', marginRight: '30px' }}>
                <div style={{ width: '66%', paddingRight: '10px', backgroundColor: '#fff' }}>
                    <h2 style={{ marginLeft: '16px', color: '#1a1a1a', fontSize: '18px', fontWeight: 600 }}>Số Lượng Sản Phẩm</h2>
                    <BarChart width={680} height={250} data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="type" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="countInStock" fill="#1677ff" name="Tồn kho" />
                        <Bar dataKey="selled" fill="#6EBAFC" name="Đã bán" />
                    </BarChart>
                </div>
                <div style={{ width: '32%', backgroundColor: '#fff' }}>
                    <h2 style={{ marginLeft: '16px', color: '#1a1a1a', fontSize: '18px', fontWeight: 600 }}>Phương thức thanh toán</h2>
                    <div style={{ paddingLeft: '30px', height: 250, width: 250 }}>
                        <PieChartComponent data={orders?.data} />
                    </div>
                </div>
            </div>
            <Row style={{ margin: '30px 30px 0 0' }}>
                <Col span={24}>
                    <div style={{
                        background: '#fff',
                        borderRadius: '12px',
                        padding: '24px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap'
                    }}>
                        <StatItem>
                            <div>Tổng Doanh Thu</div>
                            <div style={{ fontSize: '24px', color: '#1677ff', fontWeight: 700 }}>
                                {isPendingOrders ? <Spin /> : `${(totalRevenue / 1000000).toFixed(2)}M VND`}
                            </div>
                        </StatItem>
                        <StatItem>
                            <div>Sản Phẩm Bán Chạy</div>
                            <div style={{ fontSize: '24px', color: '#00C49F', fontWeight: 700 }}>
                                {isPendingProducts ? <Spin /> : products?.data?.reduce((prev, curr) =>
                                    prev.selled > curr.selled ? prev : curr, {}).name || 'N/A'}
                            </div>
                        </StatItem>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default AdminDashboard