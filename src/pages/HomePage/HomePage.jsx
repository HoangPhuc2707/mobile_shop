import React, { useEffect, useState } from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct, WrapperBanner, WrapperBannerText, WrapperBannerImg, WrapperNews, HeaderNews, NewsItem, NewsImage, NewsContent, NewsTitle, NewsDate, WrapperHeaderProduct, HeaderProduct, ButtonMore, WrapperPromotionImg, WrapperFeature, FeatureIcon, WrapperRowFeature, WrapperSubMenuType, SubMenuType, WrapperType } from "./style";
import iconMenu1 from '../../assets/images/icons8-home-24.png';
import iconMenu2 from '../../assets/images/icons8-phone-case-50.png';
import iconMenu3 from '../../assets/images/icons8-sort-down-24.png';
import iconMenu4 from '../../assets/images/icons8-news-30.png';
import imagebanner from '../../assets/images/banner-image.png';
import imageNews1 from '../../assets/images/samsung-galaxy-z-flip6-didongmy.jpg';
import imageNews2 from '../../assets/images/thumuasac.jpg';
import slider1 from '../../assets/images/slider1.png';
import slider2 from '../../assets/images/slider2.png';
import slider3 from '../../assets/images/slider3.png';
import slider4 from '../../assets/images/slider4.png';
import iconPlash from '../../assets/images/icons8-flash-48.png';
import imagePromotion from '../../assets/images/promotion.jpg';
import imgfeature1 from '../../assets/images/truck.svg';
import imgfeature2 from '../../assets/images/bag.svg';
import imgfeature3 from '../../assets/images/support.svg';
import imgfeature4 from '../../assets/images/return.svg';
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";
import { Col, Row } from "antd";
import { useInView } from 'react-intersection-observer';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const searchProduct = useSelector((state) => state?.product?.search)
    const navigate = useNavigate()
    const searchDebounce = useDebounce(searchProduct, 500)
    const [loading, setLoading] = useState(false)
    const [limit, setLimit] = useState(10)
    const [typeProducts, setTypeProducts] = useState([])

    const { ref: textRef, inView: isTextVisible } = useInView({
        threshold: 0.1, // Kích hoạt khi phần tử xuất hiện 10% trên màn hình
        triggerOnce: true,
    })

    const { ref: imgRef, inView: isImgVisible } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    })
    const { ref: promotionRef, inView: isPromotionVisible } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    })
    const { ref: featureRef, inView: isFeatureVisible } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    })

    const handleNavigateNews = () => {
        navigate('/news')
        window.scrollTo(0, 0)
    }

    const fetchProductAll = async (context) => {
        const limit = context?.queryKey && context?.queryKey[1]
        const search = context?.queryKey && context?.queryKey[2]
        const res = await ProductService.getAllProduct(search, limit)
        return res
    }

    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        if (res?.status === 'OK') {
            setTypeProducts(res?.data)
        }
    }

    const { isPending, data: products, isPreviousData } = useQuery({
        queryKey: ['product', limit, searchDebounce],
        queryFn: fetchProductAll,
        retry: 3,
        retryDelay: 1000,
        keepPreviousData: true
    });

    useEffect(() => {
        fetchAllTypeProduct()
    }, [])
    return (
        <Loading isPending={isPending || loading}>
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
                </WrapperTypeProduct >
            </div>
            <WrapperBanner>
                <WrapperBannerText ref={textRef}
                    style={{
                        opacity: isTextVisible ? 1 : 0,
                        transform: isTextVisible ? 'translateX(0)' : 'translateX(20px)',
                        transition: 'opacity 0.5s ease, transform 0.5s ease',
                    }}>
                    <h2 style={{ marginTop: '75px', fontSize: '48px' }}>
                        <span>Chất Lượng Đỉnh Cao,</span>
                        <br />
                        <span style={{ color: 'rgb(241, 134, 52)' }}>Giá Cả Hợp Lý!</span>
                    </h2>
                    <p style={{ color: 'gray' }}>
                        Tại Phone Plaza, chúng tôi mang đến cho bạn những sản phẩm điện thoại tốt nhất với
                        mức giá cạnh tranh. Khám phá ngay bộ sưu tập đa dạng và tìm kiếm chiếc điện thoại
                        hoàn hảo cho bạn!
                    </p>
                </WrapperBannerText>
                <WrapperBannerImg ref={imgRef}
                    style={{
                        opacity: isImgVisible ? 1 : 0,
                        transform: isImgVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.5s ease, transform 0.5s ease',
                    }}>
                    <img src={imagebanner} style={{ width: '500px', height: '300px' }} alt="banner-image" />
                </WrapperBannerImg>
            </WrapperBanner>
            <div className='body' style={{ width: '100%', background: '#efefef', paddingTop: '20px' }}>
                <div id="container" style={{ width: '100%', height: '100%', margin: '0 auto' }}>
                    <Row style={{ padding: '0 30px' }}>
                        <Col span={16}>
                            <SliderComponent arrImages={[slider1, slider2, slider3, slider4]} />
                        </Col>
                        <WrapperNews span={8}>
                            <HeaderNews>
                                <span>TIN CÔNG NGHỆ</span>
                            </HeaderNews>
                            <NewsItem>
                                <NewsImage onClick={handleNavigateNews} src={imageNews1} alt="News 1" />
                                <NewsContent>
                                    <NewsTitle onClick={handleNavigateNews}>Mua Samsung Galaxy Z Fold6 và Z Flip6 ở đâu?</NewsTitle>
                                    <NewsDate>10/04/2024</NewsDate>
                                </NewsContent>
                            </NewsItem>
                            <NewsItem>
                                <NewsImage onClick={handleNavigateNews} src={imageNews2} alt="News 2" />
                                <NewsContent>
                                    <NewsTitle onClick={handleNavigateNews}>Thu sạc cũ đổi sạc mới, tiết kiệm tới 500.000đ</NewsTitle>
                                    <NewsDate>09/19/2024</NewsDate>
                                </NewsContent>
                            </NewsItem>
                        </WrapperNews>
                    </Row>
                    {/* <WrapperHeaderProduct>
                        <HeaderProduct>
                            <img style={{ width: '21px', height: '21px', position: 'absolute' }} src={iconPlash} alt="iconPlash" />
                            <span>SẢN PHẨM BÁN CHẠY</span>
                        </HeaderProduct>
                        <WrapperProducts>
                            {products?.data?.filter(product => product.selled >= 1)?.map((product) => {
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
                        <WrapperButtonMore>
                            <ButtonMore
                                textbutton={isPreviousData ? 'Load More' : 'Xem Thêm'}
                                type="outline"
                                styleButton={{
                                    border: '1px solid #cd1818',
                                    background: '#cd1818',
                                    color: `${products?.total === products?.data?.length ? '#ccc' : '#fff'}`,
                                    width: '140px', height: '38px', borderRadius: '4px'
                                }}
                                isDisabled={products?.total === products?.data?.length || products?.totalPage === 1}
                                styletextbutton={{ fontWeight: '500', color: products?.total === products?.data?.length && '#fff' }}
                                onClick={() => setLimit((prev) => prev + 5)} />
                        </WrapperButtonMore>
                    </WrapperHeaderProduct> */}
                    <WrapperPromotionImg ref={promotionRef}
                        style={{
                            opacity: isPromotionVisible ? 1 : 0,
                            transform: isPromotionVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'opacity 0.5s ease, transform 0.5s ease',
                        }}>
                        <img onClick={handleNavigateNews} style={{ width: '100%', height: '100px', objectFit: 'cover', cursor: 'pointer' }} src={imagePromotion} alt="image-promotion" />
                    </WrapperPromotionImg>
                    <WrapperHeaderProduct>
                        <HeaderProduct>
                            <img style={{ width: '21px', height: '21px', position: 'absolute' }} src={iconPlash} alt="iconPlash" />
                            <span>SẢN PHẨM</span>
                        </HeaderProduct>
                        <WrapperProducts>
                            {products?.data?.map((product) => {
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
                        <WrapperButtonMore>
                            <ButtonMore
                                textbutton={isPreviousData ? 'Load More' : 'Xem Thêm'}
                                type="outline"
                                styleButton={{
                                    border: '1px solid #cd1818',
                                    background: '#cd1818',
                                    color: `${products?.total === products?.data?.length ? '#ccc' : '#fff'}`,
                                    width: '140px', height: '38px', borderRadius: '4px'
                                }}
                                isDisabled={products?.total === products?.data?.length || products?.totalPage === 1}
                                styletextbutton={{ fontWeight: '500', color: products?.total === products?.data?.length && '#fff' }}
                                onClick={() => setLimit((prev) => prev + 5)} />
                        </WrapperButtonMore>
                    </WrapperHeaderProduct>
                </div>
            </div>
            <WrapperRowFeature>
                <Col span={6}>
                    <WrapperFeature ref={featureRef}
                        style={{
                            opacity: isFeatureVisible ? 1 : 0,
                            transform: isFeatureVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'opacity 0.5s ease, transform 0.5s ease',
                        }}>
                        <FeatureIcon>
                            <img src={imgfeature1} alt="Image" />
                        </FeatureIcon>
                        <h3>Giao hàng nhanh và miễn phí</h3>
                        <p>Chúng tôi cam kết giao hàng nhanh chóng và hoàn toàn miễn phí đến tay bạn.</p>
                    </WrapperFeature>
                </Col>
                <Col span={6}>
                    <WrapperFeature ref={featureRef}
                        style={{
                            opacity: isFeatureVisible ? 1 : 0,
                            transform: isFeatureVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'opacity 0.5s ease, transform 0.5s ease',
                        }}>
                        <FeatureIcon>
                            <img src={imgfeature2} alt="Image" />
                        </FeatureIcon>
                        <h3>Dễ dàng mua sắm</h3>
                        <p>Mua sắm trở nên dễ dàng hơn bao giờ hết với giao diện thân thiện và quy trình thanh toán đơn giản.</p>
                    </WrapperFeature>
                </Col>
                <Col span={6}>
                    <WrapperFeature ref={featureRef}
                        style={{
                            opacity: isFeatureVisible ? 1 : 0,
                            transform: isFeatureVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'opacity 0.5s ease, transform 0.5s ease',
                        }}>
                        <FeatureIcon>
                            <img src={imgfeature3} alt="Image" />
                        </FeatureIcon>
                        <h3>Hỗ trợ 24/7</h3>
                        <p>Chúng tôi cung cấp dịch vụ hỗ trợ khách hàng 24/7, sẵn sàng giúp đỡ bạn bất cứ lúc nào.</p>
                    </WrapperFeature>
                </Col>
                <Col span={6}>
                    <WrapperFeature ref={featureRef}
                        style={{
                            opacity: isFeatureVisible ? 1 : 0,
                            transform: isFeatureVisible ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'opacity 0.5s ease, transform 0.5s ease',
                        }}>
                        <FeatureIcon>
                            <img src={imgfeature4} alt="Image" />
                        </FeatureIcon>
                        <h3>Trả hàng không rắc rối</h3>
                        <p>Chúng tôi cam kết quy trình trả hàng đơn giản và không rắc rối. </p>
                    </WrapperFeature>
                </Col>
            </WrapperRowFeature>
            <div style={{ width: '100%', backgroundColor: '#efefef', display: 'flex', justifyContent: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
                <FooterComponent />
            </div>
        </Loading>
    );
};

export default HomePage