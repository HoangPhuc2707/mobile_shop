import React, { useMemo } from "react";
import { Lable, WrapperInfo, WrapperContainer, WrapperValue, WrapperItemOrderInfo, WrapperItemOrder } from './style';
import { useSelector } from "react-redux";
import { convertPrice } from "../../utils";
import Loading from "../../components/LoadingComponent/Loading";
import { useLocation } from "react-router-dom";
import { orderContant } from "../../contant";

const OrderSuccess = () => {
    const order = useSelector((state) => state.order)
    const location = useLocation()
    const { state } = location
    return (
        <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>
            <Loading isPending={false}>
                <div style={{ height: '100%', width: '1024px', margin: '0 auto' }}>
                    <h3 style={{ fontWeight: 'bold', margin: '0', padding: '10px 0' }}>Đơn hàng đặt thành công</h3>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <WrapperContainer style={{ marginRight: '40px' }}>
                            <WrapperInfo>
                                <div>
                                    <Lable>Phương thức giao hàng</Lable>
                                    <WrapperValue>
                                        <span style={{ color: '#ea8500', fontWeight: 'bold' }}>{orderContant.delivery[state?.delivery]}</span> Giao hàng tiết kiệm
                                    </WrapperValue>
                                </div>
                            </WrapperInfo>
                            <WrapperInfo>
                                <div>
                                    <Lable>Phương thức thanh toán</Lable>
                                    <WrapperValue>{orderContant.payment[state?.payment]}</WrapperValue>
                                </div>
                            </WrapperInfo>
                            <WrapperItemOrderInfo>
                                {state.orders?.map((order) => {
                                    return (
                                        <WrapperItemOrder key={order?.name}>
                                            <div style={{ width: '400px', display: 'flex', alignItems: 'center', gap: 4 }}>
                                                <img src={order.image} alt="item-order" style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                                                <div style={{ width: '260px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {order?.name}
                                                </div>
                                            </div>
                                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '20px' }}>
                                                <span>
                                                    <span style={{ fontSize: '13px', color: '#242424' }}>Giá tiền: {convertPrice(order?.price)}</span>
                                                </span>
                                                <span>
                                                    <span style={{ fontSize: '13px', color: '#242424' }}>Số lượng: {order?.amount}</span>
                                                </span>
                                                <span>
                                                    <span style={{ fontSize: '13px', color: '#242424' }}>Giảm giá: {convertPrice(state?.discountMemo)}</span>
                                                </span>
                                                <span>
                                                    <span style={{ fontSize: '13px', color: '#242424' }}>Phí giao hàng: {convertPrice(state?.deliveryPriceMemo)}</span>
                                                </span>
                                            </div>
                                        </WrapperItemOrder>
                                    )
                                })}
                                <div>
                                    <span style={{ marginTop: '4px', fontSize: '13px', color: '#242424', float: 'right', marginRight: '40px', color: 'red' }}>Tổng tiền: {convertPrice(state?.totalPriceMemo)}</span>
                                </div>
                            </WrapperItemOrderInfo>
                        </WrapperContainer>
                    </div>
                </div>
            </Loading>
        </div>
    );
};

export default OrderSuccess