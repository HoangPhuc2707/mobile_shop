import React, { useEffect, useState } from "react";
import * as OrderService from '../../services/OrderService';
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/LoadingComponent/Loading";
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { WrapperContainer, WrapperFooterItem, WrapperHeaderItem, WrapperItemOrder, WrapperListOrder, WrapperStatus } from "./style";
import { convertPrice } from "../../utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as message from '../../components/Message/Message';
import imgEmtyCart from '../../assets/images/icons8-clear-shopping-cart-96.png';

const MyOrderPage = () => {
    const location = useLocation()
    const { state } = location
    const [orderToCancel, setOrderToCancel] = useState(null);
    const navigate = useNavigate()
    const fetchMyOrder = async () => {
        const res = await OrderService.getOrderByUserId(state?.id, state?.access_token)
        return res.data
    }

    const queryOrder = useQuery({
        queryKey: ['orders'],
        queryFn: fetchMyOrder,
        enabled: !!state?.id && !!state?.token,
    })
    const { isPending, data } = queryOrder
    const handleDetailsOrder = (id) => {
        navigate(`/details-order/${id}`, {
            state: {
                token: state?.token
            }
        })
    }
    const mutation = useMutationHooks(
        (data) => {
            const { id, token, orderItems } = data
            const res = OrderService.cancelOrder(id, token, orderItems)
            return res
        }
    )

    // State for confirm dialog
    const handleCancelOrder = (order) => {
        setOrderToCancel(order);
    };

    const handleConfirmCancel = () => {
        if (orderToCancel) {
            mutation.mutate({ id: orderToCancel._id, token: state?.token, orderItems: orderToCancel?.orderItems }, {
                onSuccess: () => {
                    queryOrder.refetch();
                    setOrderToCancel(null);
                },
            });
        }
    };

    const handleCloseDialog = () => {
        setOrderToCancel(null);
    };
    const { isPending: isPendingCancel, isSuccess: isSuccessCancel, isError: isErrorCancel, data: dataCancel } = mutation

    useEffect(() => {
        if (isSuccessCancel && dataCancel?.status === 'OK') {
            message.success()
        } else if (isErrorCancel) {
            message.error()
        }
    }, [isErrorCancel, isSuccessCancel])

    const renderProduct = (data) => {
        return data?.map((order) => {
            return <WrapperHeaderItem key={order?._id}>
                <img src={order?.image}
                    style={{
                        width: '70px',
                        height: '70px',
                        objectFit: 'cover',
                        border: '1px solid rgb(238, 238, 238)',
                        padding: '2px'
                    }}
                />
                <div style={{
                    width: 260,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginLeft: '10px'
                }}>{order?.name}</div>
                <span style={{ fontSize: '13px', color: '#242424', marginLeft: 'auto' }}>{convertPrice(order?.price)}</span>
            </WrapperHeaderItem>
        })
    }

    const sortedData = Array.isArray(data) ? data.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];

    return (
        <Loading isPending={isPending || isPendingCancel}>
            <WrapperContainer>
                <div style={{ height: '100%', width: '1024px', margin: '0 auto' }}>
                    <h4 style={{ fontSize: '18px', margin: '0 10px 0 0', padding: '10px 0' }}>Đơn hàng của tôi</h4>
                    <WrapperListOrder>
                        {sortedData?.map((order) => {
                            return (
                                <WrapperItemOrder key={order?._id}>
                                    <WrapperStatus>
                                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Trạng thái</span>
                                        <div>
                                            <span style={{ color: 'rgb(255, 66, 78)' }}>Giao hàng: </span>
                                            <span style={{ color: 'rgb(90, 32, 193)', fontWeight: 'bold' }}>{`${order.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng'}`}</span>
                                        </div>
                                        <div>
                                            <span style={{ color: 'rgb(255, 66, 78)' }}>Thanh toán: </span>
                                            <span style={{ color: 'rgb(90, 32, 193)', fontWeight: 'bold' }}>{`${order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}`}</span>
                                        </div>
                                    </WrapperStatus>
                                    {renderProduct(order?.orderItems)}
                                    <WrapperFooterItem>
                                        <div>
                                            <span>Tổng tiền: </span>
                                            <span
                                                style={{ fontSize: '13px', color: 'rgb(56, 56, 61)', fontWeight: 700 }}
                                            >{convertPrice(order?.totalPrice)}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <ButtonComponent
                                                onClick={() => handleCancelOrder(order)}
                                                size={40}
                                                styleButton={{
                                                    height: '36px',
                                                    border: '1px solid #FF5A57',
                                                    borderRadius: '4px'
                                                }}
                                                textbutton={'Hủy đơn hàng'}
                                                styletextbutton={{ color: '#FF5A57', fontSize: '14px' }}
                                            >
                                            </ButtonComponent>
                                            <ButtonComponent
                                                onClick={() => handleDetailsOrder(order?._id)}
                                                size={40}
                                                styleButton={{
                                                    background: 'linear-gradient(138deg, #FF5A57, #E02F75)',
                                                    height: '36px',
                                                    border: 'none',
                                                    borderRadius: '4px'
                                                }}
                                                textbutton={'Xem chi tiết'}
                                                styletextbutton={{ color: 'white', fontSize: '14px' }}
                                            >
                                            </ButtonComponent>
                                        </div>
                                    </WrapperFooterItem>
                                </WrapperItemOrder>
                            )
                        })}
                    </WrapperListOrder>

                    {orderToCancel && (
                        <div style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            background: 'rgba(0,0,0,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 9999
                        }}>
                            <div style={{ background: '#fff', padding: 24, borderRadius: 8, minWidth: 320, boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                                <h3 style={{ margin: 0, marginBottom: 16 }}>Xác nhận hủy đơn hàng</h3>
                                <div style={{ marginBottom: 24 }}>Bạn có chắc chắn muốn hủy đơn hàng này không?</div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                                    <ButtonComponent
                                        onClick={handleCloseDialog}
                                        size={40}
                                        styleButton={{
                                            height: '36px',
                                            border: '1px solid #FF5A57',
                                            borderRadius: '4px'
                                        }}
                                        textbutton={'Không'}
                                        styletextbutton={{ color: '#FF5A57', fontSize: '14px' }}
                                    ></ButtonComponent>
                                    <ButtonComponent
                                        onClick={handleConfirmCancel}
                                        size={40}
                                        styleButton={{
                                            background: 'linear-gradient(138deg, #FF5A57, #E02F75)',
                                            height: '36px',
                                            border: 'none',
                                            borderRadius: '4px'
                                        }}
                                        textbutton={'Hủy đơn hàng'}
                                        styletextbutton={{ color: 'white', fontSize: '14px' }}
                                    ></ButtonComponent>
                                </div>
                            </div>
                        </div>
                    )}

                    <img style={{ display: data?.length === 0 ? 'block' : 'none', width: '200px', height: '200px', paddingBottom: '280px', marginLeft: '400px' }} src={imgEmtyCart} alt="imgEmtyCart" />

                </div>
            </WrapperContainer>
        </Loading>
    );
};

export default MyOrderPage