import React, { useEffect, useState } from "react";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import imageLogin from "../../assets/images/logo-login.png";
import { Image } from "antd";
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { useLocation, useNavigate } from "react-router-dom";
import * as UserService from '../../services/UserService';
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";

const SignInPage = () => {
    const navigate = useNavigate()
    const [isShowPassword, setIsShowPassword] = useState(false)
    const location = useLocation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();

    const mutation = useMutationHooks(
        data => UserService.loginUser(data)
    )
    const { data, isPending, isSuccess } = mutation

    useEffect(() => {
        if (isSuccess) {
            if (location?.state) {
                navigate(location?.state)
            } else {
                navigate('/')
            }
            localStorage.setItem('access_token', JSON.stringify(data?.access_token))
            if (data?.access_token) {
                const decoded = jwtDecode(data?.access_token)
                if (decoded?.id) {
                    handleGetDetailsUser(decoded?.id, data?.access_token)
                }
            }
        }
    }, [isSuccess])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }

    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }

    const handleOnchangePassword = (value) => {
        setPassword(value)
    }

    const handleNavigateSignUp = () => {
        navigate('/sign-up')
    }

    const handleSignIn = () => {
        mutation.mutate({
            email,
            password
        })
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgb(0, 0, 0, 0.53)', height: '100vh' }}>
            <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
                <WrapperContainerLeft>
                    <h1>Xin chào</h1>
                    <p>Đăng nhập vào tài khoản</p>
                    <InputForm style={{ marginBottom: '10px' }} placeholder="Abc@gmail.com" value={email} onChange={handleOnchangeEmail} />
                    <div style={{ position: 'relative' }}>
                        <span
                            onClick={() => setIsShowPassword(!isShowPassword)}
                            style={{
                                zIndex: 10,
                                position: 'absolute',
                                top: '4px',
                                right: '8px'
                            }}
                        >{
                                isShowPassword ? (
                                    <EyeFilled />
                                ) : (
                                    <EyeInvisibleFilled />
                                )
                            }
                        </span>
                        <InputForm
                            placeholder="Mật khẩu"
                            type={isShowPassword ? "text" : "password"}
                            value={password}
                            onChange={handleOnchangePassword}
                        />
                    </div>
                    {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                    <Loading isPending={isPending}>
                        <ButtonComponent
                            isDisabled={!email.length || !password.length}
                            onClick={handleSignIn}
                            size={40}
                            styleButton={{
                                background: '-webkit-linear-gradient(top, #f59000, #fd6e1d)',
                                height: '48px',
                                width: '100%',
                                border: 'none',
                                borderRadius: '4px',
                                margin: '26px 0 10px'
                            }}
                            textbutton={'Đăng nhập'}
                            styletextbutton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </Loading>
                    <p><WrapperTextLight>Quên mật khẩu?</WrapperTextLight></p>
                    <p>Chưa có tài khoản? <WrapperTextLight onClick={handleNavigateSignUp}>Tạo tài khoản</WrapperTextLight></p>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image src={imageLogin} preview={false} alt="image-login" height="203px" width="203px" />
                    <h4>Mua sắm tại Phone Plaza</h4>
                </WrapperContainerRight>
            </div>
        </div>
    );
};

export default SignInPage