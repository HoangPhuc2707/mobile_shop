import { Col, Image, Rate, Row } from "antd";
import React, { useEffect, useState } from "react";
import imageProductSmall1 from "../../assets/images/iphone-16-pro-max-2.webp";
import imageProductSmall2 from "../../assets/images/iphone-16-pro-max-3.webp";
import imageProductSmall3 from "../../assets/images/iphone-16-pro-max-4.webp";
import imageProductSmall4 from "../../assets/images/iphone-16-pro-max-5.webp";
import imageProductSmall5 from "../../assets/images/iphone-16-pro-max-6.webp";
import imageProductSmall6 from "../../assets/images/iphone-16-pro-max-7.webp";
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleColImage, WrapperStyleDescription, WrapperStyleImageSmall, WrapperStyleNameProduct, WrapperStyleTextSell } from "./style";
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as ProductService from '../../services/ProductService';
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct, resetOrder } from "../../redux/slides/orderSlide";
import { convertPrice, initFacebookSDK } from "../../utils";
import * as message from '../Message/Message'
import LikeButtonComponent from "../LikeButtonComponent/LikeButtonComponent";
import CommentComponent from "../CommentComponent/CommentComponent";

const ProductDetailsComponent = ({ idProduct }) => {
    const [numProduct, setNumProduct] = useState(1)
    const user = useSelector((state) => state.user)
    const order = useSelector((state) => state.order)
    const [errorLimitOrder, setErrorLimitOrder] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const onChange = (value) => {
        const numericValue = Number(value);
        if (numericValue >= 1 && numericValue <= 50) {
            setNumProduct(numericValue);
        }
    }

    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1]
        if (id) {
            const res = await ProductService.getDetailsProduct(id)
            return res.data
        }
    }

    useEffect(() => {
        initFacebookSDK()
    }, [])

    useEffect(() => {
        const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
        if ((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
            setErrorLimitOrder(false)
        } else if (productDetails?.countInStock === 0) {
            setErrorLimitOrder(true)
        }
    }, [numProduct])

    useEffect(() => {
        if (order.isSucessOrder) {
            message.success('Đã thêm vào giỏ hàng')
        }
        return () => {
            dispatch(resetOrder())
        }
    }, [order.isSucessOrder])

    const handleChangeCount = (type) => {
        if (type === 'increase') {
            if (numProduct < 50) {
                setNumProduct(numProduct + 1);
            }
        } else {
            if (numProduct > 1) {
                setNumProduct(numProduct - 1);
            }
        }
    }

    const { isPending, data: productDetails } = useQuery({
        queryKey: ['product-details', idProduct],
        queryFn: fetchGetDetailsProduct,
        enabled: !!idProduct
    });

    const handleAddOrderProduct = () => {
        if (!user.id) {
            navigate('/sign-in', { state: location?.pathname })
        } else {
            const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id)
            if ((orderRedux?.amount + numProduct) <= orderRedux?.countInstock || (!orderRedux && productDetails?.countInStock > 0)) {
                dispatch(addOrderProduct({
                    orderItem: {
                        name: productDetails?.name,
                        amount: numProduct,
                        image: productDetails?.image,
                        price: productDetails?.price,
                        product: productDetails?._id,
                        discount: productDetails?.discount,
                        countInstock: productDetails?.countInStock
                    }
                }))
            } else {
                setErrorLimitOrder(true)
            }
        }
    }

    return (
        <Loading isPending={isPending}>
            <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
                <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
                    <Image style={{ paddingLeft: '20px' }} src={productDetails?.image} alt="image product" preview={false} />
                    <Row style={{ justifyContent: 'space-between', paddingTop: '10px', paddingLeft: '5px', paddingRight: '5px' }}>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall1} alt="image product small" preview={false} />
                        </WrapperStyleColImage>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall2} alt="image product small" preview={false} />
                        </WrapperStyleColImage>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall3} alt="image product small" preview={false} />
                        </WrapperStyleColImage>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall4} alt="image product small" preview={false} />
                        </WrapperStyleColImage>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall5} alt="image product small" preview={false} />
                        </WrapperStyleColImage>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageProductSmall6} alt="image product small" preview={false} />
                        </WrapperStyleColImage>
                    </Row>
                </Col>
                <Col span={14} style={{ paddingLeft: '10px' }}>
                    <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
                    <div>
                        <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating} />
                        <WrapperStyleTextSell> | Đã bán {productDetails?.selled || 0}</WrapperStyleTextSell>
                    </div>
                    <WrapperPriceProduct>
                        <WrapperPriceTextProduct>{convertPrice(productDetails?.price)}</WrapperPriceTextProduct>
                    </WrapperPriceProduct>
                    <WrapperStyleDescription>
                        {productDetails?.description}
                    </WrapperStyleDescription>
                    {/* <WrapperAddressProduct>
                        <span>Giao đến</span>
                        <span className='address'>{user?.address}</span>
                        <span className='change-address'>- Đổi địa chỉ</span>
                    </WrapperAddressProduct> */}
                    <LikeButtonComponent dataHref={"https://developers.facebook.com/docs/plugins/"} />
                    <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                        <div style={{ marginBottom: '10px' }}>Số lượng</div>
                        <WrapperQualityProduct>
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease')}>
                                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                            <WrapperInputNumber onChange={onChange} defaultValue={1} min={1} max={productDetails?.countInStock} value={numProduct} size="small" />
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase')}>
                                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                        </WrapperQualityProduct>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div>
                            <ButtonComponent
                                size={40}
                                styleButton={{
                                    background: '-webkit-linear-gradient(top, #f59000, #fd6e1d)',
                                    height: '48px',
                                    width: '220px',
                                    border: 'none',
                                    borderRadius: '4px',
                                }}
                                onClick={handleAddOrderProduct}
                                textbutton={'Chọn mua'}
                                styletextbutton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                            ></ButtonComponent>
                            {errorLimitOrder && <div style={{ color: 'red' }}>Sản phẩm đã hết hàng</div>}
                        </div>

                    </div>
                </Col>
                <CommentComponent dataHref={"https://developers.facebook.com/docs/plugins/comments#configurator"} width="1000" />
            </Row>
        </Loading>
    );
};

export default ProductDetailsComponent