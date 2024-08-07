import { Col } from "antd";
import React from "react";
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccout, WrapperTextHeaderSmall } from "./style";
import Search from "antd/es/transfer/search";
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const HeaderComponent = () => {
    return (
        <div>
            <WrapperHeader>
                <Col span={6}>
                    <WrapperTextHeader>TiKi</WrapperTextHeader>
                </Col>
                <Col span={12}>
                    <Search
                        placeholder="input search text"
                        enterButton />
                </Col>
                <Col span={6} style={{ display: 'flex', gap: '20px', paddingLeft: '20px' }}>
                    <WrapperHeaderAccout>
                        <UserOutlined style={{ fontSize: '30px' }} />
                        <div>
                            <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                            <div>
                                <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                                <CaretDownOutlined />
                            </div>
                        </div>
                    </WrapperHeaderAccout>
                    <div>
                        <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                        <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
                    </div>
                </Col>
            </WrapperHeader>
        </div>
    );
};

export default HeaderComponent;