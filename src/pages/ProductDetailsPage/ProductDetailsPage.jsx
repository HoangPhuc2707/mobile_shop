import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailsPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    return (
        <div style={{ width: '100%', background: '#efefef' }}>
            <div style={{ width: '1024px', height: '100%', margin: '0 auto' }}>
                <h5 style={{ fontWeight: '400', fontSize: '16px', margin: '0', padding: '10px 0' }}>
                    <span
                        style={{ cursor: 'pointer', fontWeight: 'bold', paddingRight: '5px' }}
                        onClick={() => { navigate('/') }}
                    >
                        Trang chủ
                    </span>- Chi tiết sản phẩm
                </h5>
                <ProductDetailsComponent idProduct={id} />
            </div>
        </div>

    );
};

export default ProductDetailsPage