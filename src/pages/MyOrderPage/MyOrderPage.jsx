import React, { useEffect } from "react";
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

    const handleCanceOrder = (order) => {
        mutation.mutate({ id: order._id, token: state?.token, orderItems: order?.orderItems }, {
            onSuccess: () => {
                queryOrder.refetch()
            },
        })
    }
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

    return (
        <Loading isPending={isPending || isPendingCancel}>
            <WrapperContainer>
                <div style={{ height: '100%', width: '1024px', margin: '0 auto' }}>
                    <h4 style={{ fontSize: '18px', margin: '0 10px 0 0', padding: '10px 0' }}>Đơn hàng của tôi</h4>
                    <WrapperListOrder>
                        {data?.map((order) => {
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
                                            <span style={{ color: 'rgb(255, 66, 78)' }}>Tổng tiền: </span>
                                            <span
                                                style={{ fontSize: '13px', color: 'rgb(56, 56, 61)', fontWeight: 700 }}
                                            >{convertPrice(order?.totalPrice)}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <ButtonComponent
                                                onClick={() => handleCanceOrder(order)}
                                                size={40}
                                                styleButton={{
                                                    height: '36px',
                                                    border: '1px solid #9255FD',
                                                    borderRadius: '4px'
                                                }}
                                                textbutton={'Hủy đơn hàng'}
                                                styletextbutton={{ color: '#9255FD', fontSize: '14px' }}
                                            >
                                            </ButtonComponent>
                                            <ButtonComponent
                                                onClick={() => handleDetailsOrder(order?._id)}
                                                size={40}
                                                styleButton={{
                                                    height: '36px',
                                                    border: '1px solid #9255FD',
                                                    borderRadius: '4px'
                                                }}
                                                textbutton={'Xem chi tiết'}
                                                styletextbutton={{ color: '#9255FD', fontSize: '14px' }}
                                            >
                                            </ButtonComponent>
                                        </div>
                                    </WrapperFooterItem>
                                </WrapperItemOrder>
                            )
                        })}
                    </WrapperListOrder>

                    <img style={{ display: data?.length === 0 ? 'block' : 'none', width: '200px', height: '200px', paddingBottom: '280px', marginLeft: '400px' }} src={imgEmtyCart} alt="imgEmtyCart" />

                </div>
            </WrapperContainer>
        </Loading>
    );
};

export default MyOrderPage