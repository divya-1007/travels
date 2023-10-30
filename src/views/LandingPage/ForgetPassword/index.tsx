import { useState } from 'react'
import { useForm } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'

import TextInput from 'components/FormElements'
import Button from 'components/Button'
import Banner from 'assets/images/bann_img1.png'

// import Alert from 'components/Alerts'
// import { emailSchema } from 'utils/Schema'
import {
    Maincontainer,
} from 'styles/views/LandingPage/ForgetPassword'
import Logo from 'assets/images/ABP-New-Logo.jpg'

import { AddressText, BannerImage, HeadingText, InputWrapper, LeftWrapper, LoginButton, LoginDetails, RightWrapper, SubWrapper } from 'styles/views/LandingPage/Login'
import { Form } from 'antd'
import { MainLogo } from 'styles/views/Deshboard'

interface IFormData {
    email?: string
}

const ForgetPassword = () => {
    const [isSuccessVisible, setIsSuccessVisible] = useState(false)
    const [isErrorVisible] = useState(false)

    const navigate = useNavigate()
    const {
        control,
        formState,
        handleSubmit,
    } = useForm<IFormData>({
        // resolver: yupResolver(emailSchema),
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
        shouldFocusError: true,
    })

    const formData = () => {
        setIsSuccessVisible(true)
    }

    return (
        <Maincontainer>
            <LeftWrapper>
                <SubWrapper>
                    <MainLogo src={Logo} width={110} height={70} />

                    <LoginDetails>
                        <HeadingText>Forgot password?</HeadingText>
                        <AddressText>Please enter your email address below</AddressText>
                        <Form >
                            <InputWrapper>
                                <TextInput name="email" placeholder="Email" control={control} />

                            </InputWrapper>
                            <Button label="Submit" type="submit" />
                        </Form>
                        {/* <Button label="Login" type="submit" onClick={() => navigate('/')} /> */}
                        {/* <LoginButton label="Login" type="submit" onClick={() => navigate('/')} /> */}
                    </LoginDetails>
                </SubWrapper>
            </LeftWrapper>
            <RightWrapper>
                <BannerImage src={Banner} />
            </RightWrapper>

            {isSuccessVisible && (
                <></>
                // <Alert type="success" description={`Reset link successfully sent to ri*****y@gmail.com`} />
            )}
            {isErrorVisible && (
                <></>
                // <Alert
                //     type="error"
                //     description="Email id entered was not found. Please enter correct email address"
                // />
            )}
        </Maincontainer>
    )
}

export default ForgetPassword
