import { ReactElement, useState } from 'react';
// import TextInput from 'components/FormElements/index';
import { Form, Input, Select, Space } from 'antd';
import Button from 'components/Button'
import Banner from 'assets/images/bann_img1.png'
import Logo from 'assets/images/ABP-New-Logo.jpg'
import { CompanyDashboardRoute, DashboardRoute, ForgetPasswordRoute, ProfileRoute } from 'constants/routes';
import usePost from 'hooks/usePost';
import { CompanyLogin, LOGIN } from 'constants/api';
import {
    Maincontainer,
    LeftWrapper,
    SubWrapper,
    RightWrapper,
    LoginDetails,
    HeadingText,
    InputWrapper,
    BannerImage,
    MainLogo,

} from 'styles/views/LandingPage/Login/index'
import { useNavigate } from 'react-router-dom';
interface IFormData {
    username: string
    password: string
}

const LogIn = (): ReactElement => {

    const navigate = useNavigate()
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loginRole, setLoginRole] = useState("");
    const [showError, setShowError] = useState(false);
    const { mutateAsync: login } = usePost();
    const LoginPage = () => {
        const payload = {
            username,
            password
        }
        login({
            url: loginRole == "admin" ? LOGIN : CompanyLogin,
            type: 'auth',
            payload: payload
        }).then((response: any) => {
            const { token, refreshToken, role, id } = response
            localStorage.setItem('_id', id)
            localStorage.setItem('_accessToken', token);
            localStorage.setItem('_refreshToken', refreshToken);
            localStorage.setItem('_role', role)
            { role == "ADMIN" ? navigate(DashboardRoute.path) : navigate(CompanyDashboardRoute.path) }

        }).catch((err: any) => {
            setShowError(true)
        })
    };
    const forgatePassword = () => {
        navigate(ForgetPasswordRoute.path)
    }
    const handleChange = (value: string) => {
        setLoginRole(value)
    };
    return (
        <>
            <Maincontainer>
                <LeftWrapper>
                    <SubWrapper>
                        <MainLogo src={Logo} width={110} height={70} />
                        <LoginDetails>
                            <HeadingText>Log in</HeadingText>
                            <Form>
                                <Space wrap>
                                    <Select
                                        defaultValue="admin"
                                        style={{ width: "100%", minWidth: "287px", marginBottom: "20px" }}
                                        onChange={handleChange}
                                        options={[
                                            { label: 'admin', value: 'admin' },
                                            { label: 'company', value: 'company' },
                                            // { label: 'manager', value: 'manager' },
                                        ]}
                                    />
                                </Space>
                                <InputWrapper>
                                    <Form.Item
                                        label="Username"
                                        name="username"
                                        rules={[{ required: false, message: 'Please input your username!' }]} >
                                        <Input value={username} onChange={(e) => setUserName(e.target.value)} />
                                    </Form.Item>
                                </InputWrapper>
                                <InputWrapper>
                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[{ required: false, message: 'Please input your password!' }]}
                                    >
                                        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </Form.Item>

                                </InputWrapper>
                                {showError ? (<p style={{ color: "red" }}>please check password or username</p>) : null}
                                {/* <ForgotText onClick={forgatePassword} >
                                    Forgot password?
                                </ForgotText> */}
                                <Button label="Login" type="submit" onClick={LoginPage} data-autoid="loginBtn" />
                            </Form>
                        </LoginDetails>
                    </SubWrapper>
                </LeftWrapper>
                <RightWrapper>
                    <BannerImage src={Banner} />
                </RightWrapper>
            </Maincontainer>
        </>
    );
}
export default LogIn
