import { ReactElement } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Button from 'components/Button'

// import { Button, Checkbox, Form, Input } from 'antd';
import Banner from 'assets/images/bann_img1.png'

import Logo from 'assets/images/ABP-New-Logo.jpg'


import {
    Maincontainer,
    LeftWrapper,
    SubWrapper,
    RightWrapper,
    LoginDetails,
    HeadingText,
    // Form,
    ForgotText,
    InputWrapper,
    MainLogo,
    BannerImage,

} from 'styles/views/LandingPage/Login/index'

import React, { useState } from 'react';
import type { CascaderProps } from 'antd';
import {
    Checkbox,
    Col,
    Form,
    Input,
    Row,
    Select,
} from 'antd';


const { Option } = Select;

interface DataNodeType {
    value: string;
    label: string;
    children?: DataNodeType[];
}

const residences: CascaderProps<DataNodeType>['options'] = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const RegistrationPage = (): ReactElement => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">+91</Option>
            </Select>
        </Form.Item>
    );

    // const suffixSelector = (
    //     <Form.Item name="suffix" noStyle>
    //         <Select style={{ width: 70 }}>
    //             <Option value="USD">$</Option>
    //             <Option value="CNY">¥</Option>
    //         </Select>
    //     </Form.Item>
    // );

    const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

    const onWebsiteChange = (value: string) => {
        if (!value) {
            setAutoCompleteResult([]);
        } else {
            setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
        }
    };

    const websiteOptions = autoCompleteResult.map((website) => ({
        label: website,
        value: website,
    }));
    return (
        <>
            <Maincontainer>
                <LeftWrapper>
                    <SubWrapper>
                        <MainLogo src={Logo} width={110} height={70} />
                        <LoginDetails>
                            <Form
                                {...formItemLayout}
                                form={form}
                                name="register"
                                onFinish={onFinish}
                                initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
                                style={{ maxWidth: 600 }}
                                scrollToFirstError
                            >
                                <Form.Item
                                    name="email"
                                    label="E-mail"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    label="Password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    name="confirm"
                                    label="Confirm Password"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item
                                    name="phone"
                                    label="Phone Number"
                                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                                >
                                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                                </Form.Item>
                                <Form.Item
                                    name="gender"
                                    label="Gender"
                                    rules={[{ required: true, message: 'Please select gender!' }]}
                                    className="Selectgender"
                                >
                                    <Select placeholder="select your gender">
                                        <Option value="male">Male</Option>
                                        <Option value="female">Female</Option>
                                        <Option value="other">Other</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item {...tailFormItemLayout}>
                                    {/* <Button type="primary" htmlType="submit">
                                        Register
                                    </Button> */}
                                    <Button label="Register" type="submit" data-autoid="loginBtn" />
                                </Form.Item>
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
export default RegistrationPage
