import React, { useEffect, useState } from "react";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";
import { useLocation } from "react-router-dom";
import * as ProductService from '../../services/ProductService'
import Loading from "../../components/LoadingComponent/Loading";

const TypeProductPage = () => {
    const { state } = useLocation()
    const [products, setProducts] = useState([])
    const [pending, setPending] = useState(false)
    const fetchProductType = async (type) => {
        setPending(true)
        const res = await ProductService.getProductType(type)
        if (res?.status === 'OK') {
            setPending(false)
            setProducts(res?.data)
        } else {
            setPending(false)
        }
    }

    useEffect(() => {
        if (state) {
            fetchProductType(state)
        }
    }, [state])
    const onChange = () => { }
    return (
        <Loading isPending={pending}>
        <div style={{ width: '100%', background: '#efefef', height: 'calc(100vh - 60px)' }}>
            <div style={{ width: '1024px', margin: '0 auto', height: '100%' }}>
                <Row style={{ flexWrap: 'nowrap', paddingTop: '10px', height: 'calc(100% - 20px)' }}>
                    <WrapperNavbar span={4} >
                        <NavBarComponent />
                    </WrapperNavbar>
                    <Col span={20} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                        <WrapperProducts>
                            {products?.map((product) => {
                                return (
                                    <CardComponent
                                        key={product._id}
                                        countInStock={product.countInStock}
                                        description={product.description}
                                        image={product.image}
                                        name={product.name}
                                        price={product.price}
                                        rating={product.rating}
                                        type={product.type}
                                        selled={product.selled}
                                        discount={product.discount}
                                        id={product._id} />
                                )
                            })}
                        </WrapperProducts>
                        <Pagination
                            defaultCurrent={2}
                            total={100}
                            onChange={onChange}
                            style={{ textAlign: 'center', marginTop: '10px', justifyContent: 'center', marginBottom: '20px' }} />
                    </Col>
                </Row>
            </div>
        </div>
        </Loading>
    );
};

export default TypeProductPage