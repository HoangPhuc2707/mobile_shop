import React from 'react';
import { ParamFooter, Social, } from './style';
import { Col, Row } from 'antd';
import paypal from '../../assets/images/paypal.png';
import ghtk from '../../assets/images/ghtk.png';
import gojek from '../../assets/images/gojek.webp';
import facebookicon from '../../assets/images/facebookicon.png';
import tiktokicon from '../../assets/images/tiktokicon.png';
import youtubeicon from '../../assets/images/youtubeicon.png';
import instagramicon from '../../assets/images/instagramicon.png';

const FooterComponent = () => {
    return (
        <Row style={{ justifyContent: 'center', display: 'flex', gap: '20px', backgroundColor: '#006555', width: '1200px', color: '#fff', borderRadius: '10px' }}>
            <Col span={6}>
                <h4>Hỗ trợ - dịch vụ</h4>
                <ParamFooter>Hướng dẫn mua hàng </ParamFooter>
                <ParamFooter>Chính sách bảo mật</ParamFooter>
                <ParamFooter>Chính sách đổi mới và bảo hành</ParamFooter>
            </Col>
            <Col span={5}>
                <h4>Thông tin liên hệ</h4>
                <ParamFooter>Chăm sóc khách hàng</ParamFooter>
                <ParamFooter>Tra cứu bảo hành</ParamFooter>
                <ParamFooter>Dịch vụ sửa chữa</ParamFooter>
            </Col>
            <Col span={5}>
                <h4>Thanh toán miễn phí</h4>
                <img src={paypal} style={{ width: '75px', height: '30px', borderRadius: '4px' }} alt='PaypalImage' />
                <h4>Hình thức vận chuyển</h4>
                <img src={ghtk} style={{ width: '75px', height: '30px', borderRadius: '4px', marginRight: '4px' }} alt='GhtkImage' />
                <img src={gojek} style={{ width: '75px', height: '30px', borderRadius: '4px' }} alt='gojekImage' />
            </Col>
            <Col span={6}>
                <h4 >Tổng đài</h4>
                <div style={{ width: '110px', height: '30px', borderRadius: '4px', textAlign: 'center', background: '#fff', color: '#006555', fontWeight: 'bold', fontSize: '18px', marginBottom: '3px' }}>1900.6868</div>
                <p>(Từ 8h30 - 21h30)</p>
                <h4>Kết nối với chúng tôi</h4>
                <Social>
                    <a href='/'>
                        <img src={facebookicon} alt='facebookicon' />
                    </a>
                    <a href='/'>
                        <img src={tiktokicon} alt='tiktokicon' />
                    </a>
                    <a href='/'>
                        <img src={youtubeicon} alt='youtubeicon' />
                    </a>
                    <a href='/'>
                        <img src={instagramicon} alt='instagramicon' />
                    </a>
                </Social>
            </Col>
            <div style={{ textAlign: 'center' }}>
                <p>Địa chỉ: 9/1/33, Phạm Ngọc Hưng, Phường An Thới, Quận Bình Thủy, thành phố Cần Thơ, Việt Nam. Điện thoại: 1900.6868. Chịu trách nhiệm nội dung: Trần Hoàng Phúc.</p>
                <p>&copy; {new Date().getFullYear()} Hoàng Phúc. </p>
            </div>

        </Row>

    );
};

export default FooterComponent;