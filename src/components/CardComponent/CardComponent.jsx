import React from "react";
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from "./style";
import { StarFilled } from '@ant-design/icons';
import logo from '../../assets/images/official.png';

const CardComponent = (props) => {
    const { countInStock, description, image, name, price, rating, type, discount, selled } = props
    return (
        <WrapperCardStyle
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={image} />}
        >
            <img
                src={logo}
                style={{
                    width: '68px', height: '14px', position: 'absolute', bottom: '92px', left: '7px',
                    borderTopLeftRadius: '3px'
                }}
                alt="official-logo"
            />
                <StyleNameProduct>{name}</StyleNameProduct>
                <WrapperReportText>
                    <span style={{ marginRight: '4px' }}>
                        <span>{rating}</span> <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54' }} />
                    </span>
                    <WrapperStyleTextSell> | Đã bán {selled || 999}</WrapperStyleTextSell>
                </WrapperReportText>
                <WrapperPriceText>
                    <span>{price.toLocaleString()}</span>
                    <WrapperDiscountText>
                        - {discount || 5} %
                    </WrapperDiscountText>
                </WrapperPriceText>
        </WrapperCardStyle>
    );
};

export default CardComponent