import { Badge, Col, Popover } from "antd";
import React, { useEffect, useState } from "react";
import { WrapperHeader, WrapperLogoHeader, WrapperHeaderAccount, WrapperTextHeaderSmall, WrapperContentPopover } from "./style";
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import logo from '../../assets/images/logo.jpg';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../services/UserService';
import { resetUser } from "../../redux/slides/userSlide";
import Loading from "../LoadingComponent/Loading";
import { searchProduct } from "../../redux/slides/productSlide";

const HeaderComponent = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const [search, setSearch] = useState('')
    const [isOpenPopup, setIsOpenPopup] = useState('')
    const order = useSelector((state) => state.order)
    const [pending, setPending] = useState(false)
    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }
    const handleLogout = async () => {
        setPending(true)
        await UserService.logoutUser()
        dispatch(resetUser())
        setPending(false)
        navigate('/')
    }

    useEffect(() => {
        setPending(true)
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
        setPending(false)
    }, [user?.name, user?.avatar])

    const content = (
        <div>
            <WrapperContentPopover onClick={() => handleClickNavigate('profile-user')}>Thông tin người dùng</WrapperContentPopover>
            {user?.isAdmin && (
                <WrapperContentPopover onClick={() => handleClickNavigate('admin')}>Quản lí hệ thống</WrapperContentPopover>
            )}
            <WrapperContentPopover onClick={() => handleClickNavigate('my-order')}>Đơn hàng của tôi</WrapperContentPopover>
            <WrapperContentPopover onClick={() => handleClickNavigate()}>Đăng xuất</WrapperContentPopover>
        </div>
    );
    const handleClickNavigate = (type) => {
        if (type === 'profile-user') {
            navigate('/profile-user')
        } else if (type === 'admin') {
            navigate('/system/admin')
        } else if (type === 'my-order') {
            navigate('/my-order', {
                state: {
                    id: user?.id,
                    token: user?.access_token
                }
            })
        } else {
            handleLogout()
        }
        setIsOpenPopup(false)
    }

    const onSearch = (e) => {
        setSearch(e.target.value)
        dispatch(searchProduct(e.target.value))
    }

    return (
        <div style={{ width: '100%', background: '#fff', display: 'flex', justifyContent: 'center' }}>
            <WrapperHeader>
                <Col span={5}>
                    <WrapperLogoHeader onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                        <img style={{ width: '200px' }} src={logo} alt="logo-image" />
                    </WrapperLogoHeader>
                </Col>
                <Col span={13}>
                    <ButtonInputSearch
                        size="large"
                        placeholder="Bạn đang tìm gì?"
                        onChange={onSearch}
                    />
                </Col>
                <Col span={6} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <Loading isPending={pending}>
                        <WrapperHeaderAccount>
                            {userAvatar ? (
                                <img src={userAvatar} alt="avatar" style={{
                                    height: '30px',
                                    width: '30px',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                }} />
                            ) : (
                                <UserOutlined style={{ fontSize: '30px' }} />
                            )}
                            {user?.access_token ? (
                                <>
                                    <Popover content={content} trigger="click" open={isOpenPopup}>
                                        <div
                                            style={{
                                                width: '70px',
                                                cursor: 'pointer',
                                                paddingTop: '5px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                            onClick={() => setIsOpenPopup((prev) => !prev)}>
                                            {userName?.length ? userName : user?.email}
                                        </div>
                                    </Popover>
                                </>
                            ) : (
                                <WrapperTextHeaderSmall onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                                    Đăng nhập
                                </WrapperTextHeaderSmall>
                            )}

                        </WrapperHeaderAccount>
                    </Loading>
                    <div onClick={() => navigate('/order')} style={{ display: 'flex', cursor: 'pointer' }}>
                        <Badge count={order?.orderItems?.length} size="small">
                            <ShoppingCartOutlined style={{ fontSize: '30px', color: '#000', paddingRight: '5px' }} />
                        </Badge>
                        <WrapperTextHeaderSmall>
                            Giỏ hàng
                        </WrapperTextHeaderSmall>
                    </div>
                </Col>
            </WrapperHeader>
        </div>
    );
};

export default HeaderComponent