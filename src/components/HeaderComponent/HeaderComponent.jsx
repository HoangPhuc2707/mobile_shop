import { Badge, Col, Popover } from "antd";
import React, { useState } from "react";
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccout, WrapperTextHeaderSmall, WrapperContentPopover } from "./style";
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from '../../services/UserService';
import { resetUser } from "../../redux/slides/userSlide";
import Loading from "../LoadingComponent/Loading";

const HeaderComponent = () => {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [pending, setPending] = useState(false)
    const handleNavigateLogin = () => {
        navigate('sign-in')
    }
    const handleLogout = async () => {
        setPending(true)
        await UserService.logoutUser()
        dispatch(resetUser())
        setPending(false)
    }
    const content = (
        <div>
            <WrapperContentPopover onClick={handleLogout}>Đăng xuất</WrapperContentPopover>
            <WrapperContentPopover>Thông tin người dùng</WrapperContentPopover>
        </div>
    );
    return (
        <div style={{ width: '100%', background: 'rgb(26, 148, 255)', display: 'flex', justifyContent: 'center' }}>
            <WrapperHeader>
                <Col span={5}>
                    <WrapperTextHeader>TiKi</WrapperTextHeader>
                </Col>
                <Col span={13}>
                    <ButtonInputSearch
                        size="large"
                        textButton="Tìm kiếm"
                        placeholder="Bạn đang tìm gì?"
                    />
                </Col>
                <Col span={6} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <Loading isPending={pending}>
                        <WrapperHeaderAccout>
                            <UserOutlined style={{ fontSize: '30px' }} />
                            {user?.name ? (
                                <>
                                    <Popover content={content} trigger="click">
                                        <div style={{ cursor: 'pointer' }}>{user.name}</div>
                                    </Popover>
                                </>
                            ) : (
                                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                                    <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                                    <div>
                                        <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                                        <CaretDownOutlined />
                                    </div>
                                </div>
                            )}

                        </WrapperHeaderAccout>
                    </Loading>
                    <div style={{ display: 'flex' }}>
                        <Badge count={4} size="small">
                            <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                        </Badge>
                        <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
                    </div>
                </Col>
            </WrapperHeader>
        </div>
    );
};

export default HeaderComponent