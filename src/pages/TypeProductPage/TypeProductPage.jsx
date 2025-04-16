import React, { useEffect, useState } from "react";
import iconMenu1 from '../../assets/images/icons8-home-24.png';
import iconMenu2 from '../../assets/images/icons8-phone-case-50.png';
import iconMenu3 from '../../assets/images/icons8-sort-down-24.png';
import iconMenu4 from '../../assets/images/icons8-news-30.png';
import CardComponent from "../../components/CardComponent/CardComponent";
import { Pagination } from "antd";
import { SubMenuType, WrapperProducts, WrapperSubMenuType, WrapperType, WrapperTypeProduct } from "./style";
import { useLocation, useNavigate } from "react-router-dom";
import * as ProductService from '../../services/ProductService'
import Loading from "../../components/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import FooterComponent from "../../components/FooterComponent/FooterComponent";

const TypeProductPage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const navigate = useNavigate()
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
    const handleNavigateNews = () => {
        navigate('/news')
        window.scrollTo(0, 0)
    }
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
                <div style={{ width: '100%', margin: '0 auto', background: '#183544' }}>
                    <WrapperTypeProduct>
                        <WrapperType onClick={() => navigate('/')}>
                            <img style={{ width: '18px', height: '18px', position: 'absolute', left: '3px', top: '13px' }} src={iconMenu1} alt="iconMenu1" />
                            <span style={{ paddingLeft: '5px' }}>Trang Chủ</span>
                        </WrapperType>
                        <WrapperSubMenuType>
                            <img style={{ width: '16px', height: '16px', position: 'absolute', left: '3px', top: '13px' }} src={iconMenu2} alt="iconMenu2" />
                            <span style={{ paddingLeft: '5px' }}>Điện Thoại</span>
                            <img style={{ width: '22px', height: '22px', position: 'absolute', right: '0', top: '10px' }} src={iconMenu3} alt="iconMenu3" />
                            <SubMenuType className="subMenuType">
                                {typeProducts.map((item) => {
                                    return (
                                        <TypeProduct name={item} key={item} />
                                    )
                                })}
                            </SubMenuType>
                        </WrapperSubMenuType>
                        <WrapperType onClick={handleNavigateNews}>
                            <img style={{ width: '16px', height: '16px', position: 'absolute', left: '3px', top: '13px' }} src={iconMenu4} alt="iconMenu4" />
                            <span style={{ paddingLeft: '5px' }}>Tin Tức</span>
                        </WrapperType>
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