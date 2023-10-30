import { useState } from 'react';
import { Card, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import Buttons from 'components/Button';
import {
    Profilepage
} from 'styles/views/Deshboard/Profile/index'
import { ComapnyRegistration } from 'constants/api';
import usePost from 'hooks/usePost';
import { log } from 'console';
import StateData from 'state.json'
import { MainContainer, NavSubContainer, UserSubContainer } from 'styles/component/Navbar';
import { TextFieldTag, TextFieldTagHeading } from 'styles/views/Deshboard';
import { Link } from 'react-router-dom';

const CompanyForm = () => {
    const [companyName, setCompanyName] = useState("");
    const [supportEmail, setSupportEmail] = useState("");
    const [email, setEmail] = useState("");
    const [domain, setDomain] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [countryId, setCountryId] = useState("");
    const [stateId, setStateId] = useState<any>(StateData)
    // const [stateId, setStateId] = useState("");
    const [isActive, setIsActive] = useState(true);
    const { mutateAsync: Company } = usePost();
    const [cabId, setCabId] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleChangeCountary = (value: string) => {

        setCountryId(` ${value}`)
    };
    const handleChangeState = (value: string) => {
        setStateId(` ${value}`)
    };
    const Country = [
        { value: '22', text: 'India ' },
    ]
    // *********** company Create api*************
    const CreateCompany = () => {
        const payloads = {
            companyInformation: {
                name: companyName,
                supportEmail,
                email,
                domain,
                password,
                role: 4
            },
            companyAddress: [{
                countryId,
                stateId,
                address,
                isActive
            }]
        }
        Company({
            url: ComapnyRegistration,
            type: 'details',
            token: true,
            payload: payloads
        }).then((res) => {
            if (res) {
                setIsModalOpen(true);
            }
            messageApi.open({
                type: 'success',
                content: 'successfully Register',
            });
            form.resetFields();
        })
            .catch((err: any) => {
                messageApi.open({
                    type: 'error',
                    content: 'something went wrong',
                });
                // setShowError(true)
            })
    };
    return (
        <>
            {contextHolder}
            <Profilepage>
                <Card>
                    <MainContainer>
                        <NavSubContainer>
                            <TextFieldTagHeading>Create Company</TextFieldTagHeading>
                        </NavSubContainer>
                        <UserSubContainer>
                            <TextFieldTag><Link to="/dashboard">Home</Link></TextFieldTag>
                        </UserSubContainer>
                    </MainContainer>
                </Card>
                {/* */}
                <Card>
                    <Form form={form} name="form_item_path" layout="vertical" onFinish={CreateCompany}  >
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="full"
                                    label="Company Name "
                                    rules={[{ required: true, message: 'Please input your full Name ' }]}
                                >
                                    <Input style={{ width: '100%' }} value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    name="Email"
                                    label="Company  Email Address"
                                    rules={[{ required: true, message: 'Please input your Email Address' }]}
                                >
                                    <Input style={{ width: '100%' }} value={email} onChange={(e) => setEmail(e.target.value)} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="password"
                                    label="Enter Company Password"
                                    rules={[{ required: true, message: 'Please input your Password' }]}
                                >
                                    <Input style={{ width: '100%' }} type='Password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="domain"
                                    label=" Company domain"
                                    rules={[{ required: true, message: 'Please input your  domain' }]}
                                >
                                    <Input value={domain} onChange={(e) => setDomain(e.target.value)} style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="Support Email"
                                    label="Company support Email Address"
                                    rules={[{ required: true, message: 'Please input your Email Address' }]}
                                >
                                    <Input style={{ width: '100%' }} value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="City"
                                    label=" City"
                                    rules={[{ required: true, message: 'City' }]}
                                >
                                    <Input style={{ width: '100%' }} value={address} onChange={(e) => setAddress(e.target.value)} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="Country"
                                    label=" Country"
                                >
                                    <Select
                                        defaultValue="Country"
                                        style={{ width: "100%" }}
                                        onChange={handleChangeCountary}
                                    > {Country.map((option, index) => (

                                        <option key={index} value={option.value} onChange={(e) => setCountryId(option.value)}>
                                            {option.text}
                                        </option>
                                    ))}</Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="State"
                                    label=" State"
                                    rules={[{ required: true, message: 'Slect your State' }]}
                                >
                                    <Select
                                        defaultValue="State"
                                        style={{ width: "100%" }}
                                        onChange={handleChangeState}
                                    >  {StateData.map((option, index) => (
                                        <option key={index} value={option.value} onChange={(e) => setStateId(option.value)}>
                                            {option.text}
                                        </option>
                                    ))}</Select>
                                </Form.Item>
                            </Col>
                            {/* <Col span={12}>
                                <Form.Item
                                    name="Zip Code"
                                    label=" Zip Code"
                                >
                                    <Input style={{ width: '100%' }} />
                                </Form.Item>
                            </Col> */}

                            {/* <div style={{ width: "100%", padding: "0 10px" }}>

                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="City"
                                            label=" City"
                                            rules={[{ required: true, message: 'City' }]}
                                        >
                                            <Input style={{ width: '100%' }} value={address} onChange={(e) => setAddress(e.target.value)} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="Country"
                                            label=" Country"
                                        >
                                            <Select
                                                defaultValue="Country"
                                                style={{ width: "100%" }}
                                                onChange={handleChangeCountary}
                                            > {Country.map((option, index) => (

                                                <option key={index} value={option.value} onChange={(e) => setCountryId(option.value)}>
                                                    {option.text}
                                                </option>
                                            ))}</Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="State"
                                            label=" State"
                                            rules={[{ required: true, message: 'Slect your State' }]}
                                        >
                                            <Select
                                                defaultValue="State"
                                                style={{ width: "100%" }}
                                                onChange={handleChangeState}
                                            >  {StateData.map((option, index) => (
                                                <option key={index} value={option.value} onChange={(e) => setStateId(option.value)}>
                                                    {option.text}
                                                </option>
                                            ))}</Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div> */}
                            <Col span={24}>
                                <Buttons label="Submit" type='submit' data-autoid="" />
                            </Col>
                        </Row>
                    </Form>
                </Card>
                {/* <Modal className='OtpVerification' title='Verify Account' open={isModalOpen} onCancel={handleCancel}>
                    <p>An OTP has been sent to your entered email <b>{supportEmail}</b></p>
                    <h5>Enter your Code here</h5>
                    <Input type='number' placeholder='OTP' />
                    <p> Didn't receive the code? </p>
                    <h5>Resend OTP</h5>
                    <Button>Verify</Button>
                </Modal> */}
            </Profilepage>
        </>
    );
}
export default CompanyForm
