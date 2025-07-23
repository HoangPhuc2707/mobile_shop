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
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

const TypeProductPage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const navigate = useNavigate()
    const searchDebounce = useDebounce(searchProduct, 500)
    const { state } = useLocation()
    const [products, setProducts] = useState([])
    const [selectedPrice, setSelectedPrice] = useState('')
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

    const priceRanges = [
        { label: '0 - 2 triệu', value: '0-2000000', min: 0, max: 2000000 },
        { label: '2 - 4 triệu', value: '2000000-4000000', min: 2000000, max: 4000000 },
        { label: '4 - 6 triệu', value: '4000000-6000000', min: 4000000, max: 6000000 },
        { label: '6 - 8 triệu', value: '6000000-8000000', min: 6000000, max: 8000000 },
        { label: '8 triệu trở lên', value: '8000000-', min: 8000000, max: Infinity },
    ];

    // Xử lý chọn filter giá
    const handlePriceFilter = (value) => {
        setSelectedPrice(value);
    }

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
                    <div style={{ width: '1024px', margin: '0 auto', height: '100%', display: 'flex' }}>
                        {/* Filter bên trái */}
                        <div style={{ width: 220, background: '#fff', borderRadius: 8, margin: '20px 24px 20px 0', padding: '16px', height: 'fit-content' }}>
                            <h3 style={{ fontWeight: 600, fontSize: 16, marginBottom: '12px' }}>Lọc theo giá</h3>
                            {priceRanges.map((range) => (
                                <div key={range.value} style={{ marginBottom: '8px' }}>
                                    <label style={{ cursor: 'pointer' }}>
                                        <input
                                            type="radio"
                                            name="price"
                                            value={range.value}
                                            checked={selectedPrice === range.value}
                                            onChange={() => handlePriceFilter(range.value)}
                                            style={{ marginRight: '8px' }}
                                        />
                                        {range.label}
                                    </label>
                                </div>
                            ))}
                            {selectedPrice && (
                                <div style={{ marginTop: '20px' }}>
                                    <ButtonComponent
                                        size={40}
                                        styleButton={{
                                            height: '36px',
                                            border: '1px solid #FF5A57',
                                            borderRadius: '4px'
                                        }}
                                        onClick={() => setSelectedPrice('')}
                                        textbutton={'Bỏ lọc'}
                                        styletextbutton={{ color: '#FF5A57', fontSize: '14px' }}
                                    ></ButtonComponent>
                                </div>
                            )}
                        </div>
                        {/* Danh sách sản phẩm */}
                        <div style={{ flex: 1 }}>
                            <WrapperProducts>
                                {(() => {
                                    const filtered = products?.filter((pro) => {
                                        // Lọc theo tên
                                        if (searchDebounce && !pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())) {
                                            return false;
                                        }
                                        // Lọc theo giá
                                        if (selectedPrice) {
                                            const range = priceRanges.find(r => r.value === selectedPrice);
                                            if (!range) return true; // nếu không tìm thấy khoảng, vẫn giữ sản phẩm
                                            if (pro.price < range.min) return false;
                                            if (range.max !== Infinity && pro.price >= range.max) return false;
                                        }
                                        return true;
                                    }) || [];
                                    if (filtered.length === 0) {
                                        return <div style={{ width: '100%', textAlign: 'center', color: '#888', fontSize: '16px', padding: '40px 0' }}>
                                            Không tìm thấy sản phẩm phù hợp.
                                        </div>;
                                    }
                                    return filtered.map((product) => (
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
                                    ));
                                })()}
                            </WrapperProducts>
                            {/* Ẩn Pagination nếu không có sản phẩm sau filter */}
                            {products?.filter((pro) => {
                                if (searchDebounce && !pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())) {
                                    return false;
                                }
                                if (selectedPrice) {
                                    const range = priceRanges.find(r => r.value === selectedPrice);
                                    if (!range) return true; // nếu không tìm thấy khoảng, vẫn giữ sản phẩm
                                    if (pro.price < range.min) return false;
                                    if (range.max !== Infinity && pro.price >= range.max) return false;
                                }
                                return true;
                            }).length > 0 && (
                                    <Pagination
                                        defaultCurrent={panigate.page + 1}
                                        total={panigate?.total}
                                        onChange={onChange}
                                        style={{ textAlign: 'center', marginTop: '10px', justifyContent: 'center' }}
                                    />
                                )}
                        </div>
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