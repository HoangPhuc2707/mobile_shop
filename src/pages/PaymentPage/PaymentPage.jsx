import { Form, Radio } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { Lable, WrapperInfo, WrapperLeft, WrapperRadio, WrapperRight, WrapperTotal } from './style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useDispatch, useSelector } from "react-redux";
import { convertPrice } from "../../utils";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from '../../services/UserService';
import * as OrderService from '../../services/OrderService';
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";
import { useNavigate } from "react-router-dom";
import { removeAllOrderProduct } from "../../redux/slides/orderSlide";
import { PayPalButton } from "react-paypal-button-v2";
import * as PaymentService from '../../services/PaymentService';

const PaymentPage = () => {
    const order = useSelector((state) => state.order)
    const user = useSelector((state) => state.user)
    const [delivery, setDelivery] = useState('fast')
    const [payment, setPayment] = useState('later_money')
    const navigate = useNavigate()
    const [sdkReady, setSdkReady] = useState(false)
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
    })
    const [form] = Form.useForm();
    const dispatch = useDispatch()

    useEffect(() => {
        form.setFieldsValue(stateUserDetails)
    }, [form, stateUserDetails])

    useEffect(() => {
        if (isOpenModalUpdateInfo) {
            setStateUserDetails({
                city: user?.city,
                name: user?.name,
                address: user?.address,
                phone: user?.phone,
            })
        }
    }, [isOpenModalUpdateInfo])

    const handleChangeAddress = () => {
        setIsOpenModalUpdateInfo(true)
    }

    const priceMemo = useMemo(() => {
        const result = order?.orderItemsSelected?.reduce((total, cur) => {
            return total + ((cur.price * cur.amount))
        }, 0)
        return result
    }, [order])

    const discountMemo = useMemo(() => {
        const result = order?.orderItemsSelected?.reduce((total, cur) => {
            const totalDiscount = cur.discount ? cur.discount : 0
            const discountAmount = (cur.price * cur.amount * totalDiscount) / 100
            return total + discountAmount
        }, 0)
        if (Number(result)) {
            return result
        }
        return 0
    }, [order])

    const deliveryPriceMemo = useMemo(() => {
        if (priceMemo >= 200000 && priceMemo < 500000) {
            return 15000
        } else if (priceMemo >= 500000) {
            return 0
        } else {
            return 30000
        }
    }, [priceMemo])

    const totalPriceMemo = useMemo(() => {
        return Number(priceMemo) - Number(discountMemo) + Number(deliveryPriceMemo)
    }, [priceMemo, discountMemo, deliveryPriceMemo])


    const handleAddOrder = () => {
        if (user?.access_token && order?.orderItemsSelected && user?.name
            && user?.address && user?.phone && user?.city && priceMemo && user?.id) {
            mutationAddOrder.mutate({
                token: user?.access_token,
                orderItems: order?.orderItemsSelected,
                fullName: user?.name,
                address: user?.address,
                phone: user?.phone,
                city: user?.city,
                paymentMethod: payment,
                itemsPrice: priceMemo,
                shippingPrice: deliveryPriceMemo,
                totalPrice: totalPriceMemo,
                user: user?.id,
                email: user?.email,
            },
            )
        }
    }

    const mutationUpdate = useMutationHooks(
        (data) => {
            const {
                id,
                token,
                ...rests } = data
            const res = UserService.updateUser(
                id,
                { ...rests },
                token)
            return res
        }
    )

    const mutationAddOrder = useMutationHooks(
        (data) => {
            const {
                token,
                ...rests } = data
            const res = OrderService.createOrder(
                { ...rests },
                token)
            return res
        }
    )

    const { isPending, data } = mutationUpdate
    const { data: dataAdd, isPending: isPendingAddOrder, isSuccess, isError } = mutationAddOrder

    useEffect(() => {
        if (isSuccess && dataAdd?.status === 'OK') {
            const arrayOrdered = []
            order?.orderItemsSelected?.forEach(element => {
                arrayOrdered.push(element.product)
            })
            dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }))
            message.success('Đặt hàng thành công')
            navigate('/orderSuccess', {
                state: {
                    delivery,
                    payment,
                    orders: order?.orderItemsSelected,
                    totalPriceMemo: totalPriceMemo,
                    deliveryPriceMemo: deliveryPriceMemo,
                    discountMemo: discountMemo,
                }
            })
        } else if (isError) {
            message.error()
        }
    }, [isSuccess, isError])

    const handleCancelUpdate = () => {
        setStateUserDetails({
            name: '',
            email: '',
            phone: '',
            isAdmin: false,
            createdAt: '',
        })
        form.resetFields()
        setIsOpenModalUpdateInfo(false)
    }

    const onSuccessPaypal = (details, data) => {
        mutationAddOrder.mutate({
            token: user?.access_token,
            orderItems: order?.orderItemsSelected,
            fullName: user?.name,
            address: user?.address,
            phone: user?.phone,
            city: user?.city,
            paymentMethod: payment,
            itemsPrice: priceMemo,
            shippingPrice: deliveryPriceMemo,
            totalPrice: totalPriceMemo,
            user: user?.id,
            isPaid: true,
            paidAt: details.update_time
        },
        )
    }

    const handleUpdateInfoUser = () => {
        const { name, address, phone, city } = stateUserDetails
        if (name && address && phone && city) {
            mutationUpdate.mutate({ id: user?.id, token: user?.access_token, ...stateUserDetails }, {
                onSuccess: () => {
                    dispatch(updateUser({ name, address, phone, city }))
                    setIsOpenModalUpdateInfo(false)
                }
            })
        }
    }

    const handleOnChangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value
        })
    }

    const handleDelivery = (e) => {
        setDelivery(e.target.value)
    }

    const handlePayment = (e) => {
        setPayment(e.target.value)
    }

    const addPaypalScript = async () => {
        const { data } = await PaymentService.getConfig()
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://sandbox.paypal.com/sdk/js?client-id=${data}`
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }
    useEffect(() => {
        if (!window.paypal) {
            addPaypalScript()
        } else {
            setSdkReady(true)
        }
    }, [])
    return (
        <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>
            <Loading isPending={isPendingAddOrder}>
                <div style={{ height: '100%', width: '1024px', margin: '0 auto' }}>
                    <h3 style={{ fontWeight: 'bold', margin: '0', padding: '10px 0' }}>Thanh toán</h3>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <WrapperLeft style={{ marginRight: '40px' }}>
                            <WrapperInfo>
                                <div>
                                    <Lable>Chọn phương thức giao hàng</Lable>
                                    <WrapperRadio onChange={handleDelivery} value={delivery}>
                                        <Radio value="fast"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>FAST</span> Giao hàng tiết kiệm</Radio>
                                        <Radio value="gojek"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>GO_JEK</span> Giao hàng tiết kiệm</Radio>
                                    </WrapperRadio>
                                </div>
                            </WrapperInfo>
                            <WrapperInfo>
                                <div>
                                    <Lable>Chọn phương thức thanh toán</Lable>
                                    <WrapperRadio onChange={handlePayment} value={payment}>
                                        <Radio value="later_money"> Thanh toán tiền mặt khi nhận hàng</Radio>
                                        <Radio value="paypal"> Thanh toán tiền bằng paypal</Radio>
                                    </WrapperRadio>
                                </div>
                            </WrapperInfo>
                        </WrapperLeft>
                        <WrapperRight>
                            <div style={{ width: '100%' }}>
                                <WrapperInfo>
                                    <div>
                                        <span>Địa chỉ: </span>
                                        <span style={{ fontWeight: 'bold' }}>{`${user?.address} - ${user?.city} - `}</span>
                                        <span onClick={handleChangeAddress} style={{ color: '#9255FD', cursor: 'pointer' }}>Thay đổi</span>
                                    </div>
                                </WrapperInfo>
                                <WrapperInfo>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span>Tạm tính</span>
                                        <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceMemo)}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span>Giảm giá</span>
                                        <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(discountMemo)}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span>Phí giao hàng</span>
                                        <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(deliveryPriceMemo)}</span>
                                    </div>
                                </WrapperInfo>
                                <WrapperTotal>
                                    <span>Tổng tiền</span>
                                    <span style={{ display: 'flex', flexDirection: 'column' }}>
                                        <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>{convertPrice(totalPriceMemo)}</span>
                                        <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</span>
                                    </span>
                                </WrapperTotal>
                            </div>
                            {payment === 'paypal' && sdkReady ? (
                                <div style={{ width: '360px', marginLeft: '40px' }}>
                                    <PayPalButton
                                        amount={totalPriceMemo / 30000}
                                        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                        onSuccess={onSuccessPaypal}
                                        onError={() => {
                                            alert('Error')
                                        }}
                                    />
                                </div>
                            ) : (
                                <ButtonComponent
                                    onClick={() => handleAddOrder()}
                                    size={40}
                                    styleButton={{
                                        background: 'rgb(255, 57, 69)',
                                        height: '48px',
                                        width: '360px',
                                        border: 'none',
                                        borderRadius: '4px',
                                        marginLeft: '40px'
                                    }}
                                    textButton={'Đặt hàng'}
                                    styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                                ></ButtonComponent>
                            )}

                        </WrapperRight>
                    </div>
                </div>
                <ModalComponent forceRender title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfo} onCancel={handleCancelUpdate} onOk={handleUpdateInfoUser}>
                    <Loading isPending={isPending}>
                        <Form
                            name="basic"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 20 }}
                            // onFinish={onUpdateUser}
                            autoComplete="on"
                            form={form}
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <InputComponent value={stateUserDetails['name']} onChange={handleOnChangeDetails} name="name" />
                            </Form.Item>
                            <Form.Item
                                label="City"
                                name="city"
                                rules={[{ required: true, message: 'Please input your city!' }]}
                            >
                                <InputComponent value={stateUserDetails['city']} onChange={handleOnChangeDetails} name="city" />
                            </Form.Item>
                            <Form.Item
                                label="Phone"
                                name="phone"
                                rules={[{ required: true, message: 'Please input your phone!' }]}
                            >
                                <InputComponent value={stateUserDetails.phone} onChange={handleOnChangeDetails} name="phone" />
                            </Form.Item>
                            <Form.Item
                                label="Address"
                                name="address"
                                rules={[{ required: true, message: 'Please input your address!' }]}
                            >
                                <InputComponent value={stateUserDetails.address} onChange={handleOnChangeDetails} name="address" />
                            </Form.Item>
                        </Form>
                    </Loading>
                </ModalComponent>
            </Loading>
        </div>
    );
};

export default PaymentPage