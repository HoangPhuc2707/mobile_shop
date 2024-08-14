import React from "react";
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from "./style";
import { StarFilled } from '@ant-design/icons';
import logo from '../../assets/images/official.png';
const CardComponent = () => {
    return (
        <WrapperCardStyle
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
            <img
                src={logo}
                style={{
                    width: '68px', height: '14px', position: 'absolute', bottom: '92px', left: '7px',
                    borderTopLeftRadius: '3px'
                }}
                alt="official-logo"
            />
                <StyleNameProduct>Iphone</StyleNameProduct>
                <WrapperReportText>
                    <span style={{ marginRight: '4px' }}>
                        <span>4.96</span> <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54' }} />
                    </span>
                    <WrapperStyleTextSell> | Đã bán 999</WrapperStyleTextSell>
                </WrapperReportText>
                <WrapperPriceText>
                    1.000.000.đ
                    <WrapperDiscountText>
                        -5%
                    </WrapperDiscountText>
                </WrapperPriceText>
        </WrapperCardStyle>
    );
};

export default CardComponent