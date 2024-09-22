import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailsPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    return (
        <div style={{ padding: '0 120px', background: '#efefef', height: '1000px' }}>
            <h5 style={{ fontWeight: '400', fontSize: '16px', margin: '0', padding: '10px 0'}}>
                <span 
                style={{ cursor: 'pointer', fontWeight: 'bold', paddingRight: '5px'}}
                onClick={() => {navigate('/')}}
                >
                    Trang chủ
                </span>- Chi tiết sản phẩm
            </h5>
            <ProductDetailsComponent idProduct={id} />
        </div>
    );
};

export default ProductDetailsPage