import React, { useEffect, useState } from "react";

import CardComponent from "../../components/CardComponent/CardComponent";
import { Pagination } from "antd";
import { WrapperProducts, WrapperTypeProduct } from "./style";
import { useLocation } from "react-router-dom";
import * as ProductService from '../../services/ProductService'
import Loading from "../../components/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import FooterComponent from "../../components/FooterComponent/FooterComponent";

const TypeProductPage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 500)
    const { state } = useLocation()
    const [products, setProducts] = useState([])
    const [pending, setPending] = useState(false)
    const [typeProducts, setTypeProducts] = useState([])
    const [panigate, setPanigate] = useState({
        page: 0,
        limit: 10,
        total: 1,
    })
    const fetchProductType = async (type, page, limit) => {
        setPending(true)
        const res = await ProductService.getProductType(type, page, limit)
        if (res?.status === 'OK') {
            setPending(false)
            setProducts(res?.data)
            setPanigate({ ...panigate, total: res?.totalPage })
        } else {
            setPending(false)
        }
    }

    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        if (res?.status === 'OK') {
            setTypeProducts(res?.data)
        }
    }

    useEffect(() => {
        if (state) {
            fetchProductType(state, panigate.page, panigate.limit)
        }
    }, [state, panigate.page, panigate.limit])
    const onChange = (current, pageSize) => {
        setPanigate({ ...panigate, page: current - 1, limit: pageSize })
    }

    useEffect(() => {
        fetchAllTypeProduct()
    }, [])

    return (
        <Loading isPending={pending}>
            <div style={{ width: '100%' }}>
                <div style={{ width: '1024px', margin: '0 auto' }}>
                    <WrapperTypeProduct>
                        {typeProducts.map((item) => {
                            return (
                                <TypeProduct name={item} key={item} />
                            )
                        })}
                    </WrapperTypeProduct>
                </div>
                <div style={{ width: '100%', background: '#efefef', height: 'calc(100% - 60px)', margin: '0 auto' }}>
                    <div style={{ width: '1024px', margin: '0 auto', height: '100%' }}>
                        <WrapperProducts>
                            {products?.filter((pro) => {
                                if (searchDebounce === '') {
                                    return pro
                                } else if (pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())) {
                                    return pro
                                }
                            })?.map((product) => {
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
                                        id={product._id}
                                    />
                                )
                            })}
                        </WrapperProducts>
                        <Pagination
                            defaultCurrent={panigate.page + 1}
                            total={panigate?.total}
                            onChange={onChange}
                            style={{ textAlign: 'center', marginTop: '10px', justifyContent: 'center' }} />
                    </div>
                </div>
                <div style={{ width: '100%', backgroundColor: '#efefef', display: 'flex', justifyContent: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
                    <FooterComponent />
                </div>
            </div>
        </Loading>
    );
};

export default TypeProductPage