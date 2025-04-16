import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { getItem } from '../../utils';
import { UserOutlined, AppstoreOutlined, ShoppingCartOutlined, HomeOutlined, InboxOutlined } from '@ant-design/icons'
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import OrderAdmin from "../../components/OrderAdmin/OrderAdmin";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminDashboard from "../../components/AdminDashboard/AdminDashboard";

const AdminPage = () => {
    const user = useSelector((state) => state.user)
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const navigate = useNavigate()
    const items = [
        getItem('Trang chủ', 'homepage', <HomeOutlined />),
        getItem('Thống kê', 'dashboard', <AppstoreOutlined />),
        getItem('Người dùng', 'users', <UserOutlined />),
        getItem('Sản phẩm', 'products', <InboxOutlined />),
        getItem('Đơn hàng', 'orders', <ShoppingCartOutlined />)
    ];

    const [keySelected, setKeySelected] = useState('dashboard')

    const handleNavigateHomePage = () => {
        navigate('/')
    }

    const renderPage = (key) => {
        switch (key) {
            case 'homepage':
                return (
                    handleNavigateHomePage()
                )
            case 'dashboard':
                return (
                    <AdminDashboard />
                )
            case 'users':
                return (
                    <AdminUser />
                )
            case 'products':
                return (
                    <AdminProduct />
                )
            case 'orders':
                return (
                    <OrderAdmin />
                )
            default:
                return <></>
        }
    }

    const handleOnClick = ({ key }) => {
        setKeySelected(key)
    }

    useEffect(() => {
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
    }, [user?.name, user?.avatar])

    return (
        <>
            <div style={{ display: 'flex' }}>
                <div style={{ position: 'fixed' }}>
                    <div style={{
                        display: 'flex', paddingTop: '20px', flexDirection: 'column', alignItems: 'center',
                        justifyContent: 'center', textAlign: 'center', boxShadow: '1px 1px 2px #ccc', backgroundColor: '#001529'
                    }}>
                        <img src={userAvatar} alt="avatar" style={{
                            height: '80px',
                            width: '80px',
                            borderRadius: '50%',
                            objectFit: 'cover'
                        }} />
                        <span style={{ padding: '5px 0', color: '#fff' }}>{userName}</span>
                    </div>
                    <Menu
                        mode="inline"
                        style={{
                            width: 180,
                            boxShadow: '1px 1px 2px #ccc',
                            height: '100vh'
                        }}
                        items={items}
                        theme="dark"
                        selectedKeys={[keySelected]}
                        onClick={handleOnClick}
                    />
                </div>
                <div style={{ width: 180 }}></div>
                <div style={{ flex: 1, padding: '15px 0 15px 15px', backgroundColor: 'rgb(240, 240, 240)' }}>
                    {renderPage(keySelected)}
                </div>
            </div >
        </>
    );
};

export default AdminPage