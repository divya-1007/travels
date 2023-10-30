import { Card, Col, Form, Input, message, Row, Select } from 'antd';
import Buttons from 'components/Button';
import { ReactElement, useState } from 'react';
import { Profilepage } from 'styles/views/Deshboard/Profile/index'
import { CreateDriver } from 'constants/api';
import usePost from 'hooks/usePost';
import StateData from 'state.json'
import { MainContainer, NavSubContainer, UserSubContainer } from 'styles/component/Navbar';
import { TextFieldTag, TextFieldTagHeading } from 'styles/views/Deshboard';
import { Link } from 'react-router-dom';
const DriverCreate = (): ReactElement => {
    const [messageApi, contextHolder] = message.useMessage();
    const Country = [
        { value: 1, text: 'India ' },

    ];
    const [addedBy, setAddedBy] = useState(1);
    const { mutateAsync: CreateDrivers } = usePost();
    const [form] = Form.useForm();
    const [driverFormData, setDriverFormData] = useState({
        name: "",
        licenseNumber: "",
        addedBy: "",
        password: "",
        address: "",
        countryId: "",
        stateId: "",
        mobileNumber: "",

    })
    const handleFormUpdate = (e: any, option?: any) => {
        if (e.target) {
            setDriverFormData({ ...driverFormData, [e.target.name]: e.target.value })
        } else {
            setDriverFormData({ ...driverFormData, [option]: e })
        }
    }
    // *********** driver Create api*************
    const CreateEmployee = async () => {
        const payloads = driverFormData
        CreateDrivers({
            url: CreateDriver,
            payload: payloads,
            type: 'details',
            token: true,
        }).then((res) => {
            messageApi.open({
                type: 'success',
                content: ' Congratulations, your Successfully register.',
            });
            form.resetFields();
        })
            .catch((err: any) => {
                messageApi.open({
                    type: 'error',
                    content: 'error',
                });
            })
    };
    return (
        <>
            {contextHolder}
            <Profilepage>
                <Card>
                    <MainContainer>
                        <NavSubContainer>
                            <TextFieldTagHeading>Create Driver</TextFieldTagHeading>
                        </NavSubContainer>
                        <UserSubContainer>
                            <TextFieldTag><Link to="/dashboard">Home</Link></TextFieldTag>


                        </UserSubContainer>
                    </MainContainer>
                </Card>
                <Card>
                    <Form form={form} name="form_item_path" layout="vertical" onFinish={CreateEmployee}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="Full Name "
                                    rules={[{ required: true, message: 'Please input your full Name ' }]}
                                >
                                    <Input style={{ width: '100%' }} name="name" value={driverFormData.name} onChange={(e) => handleFormUpdate(e)} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="licenseNumber"
                                    label="License Number "
                                    rules={[{ required: true, message: 'Please input your License Number ' }]}
                                >
                                    <Input style={{ width: '100%' }} name="licenseNumber" value={driverFormData.licenseNumber} onChange={(e) => handleFormUpdate(e)} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="mobileNumber"
                                    label=" Mobile Number"
                                    rules={[{ required: true, message: 'Please input your  Mobile Number' }]}
                                >
                                    <Input style={{ width: '100%' }} type="tel" name="mobileNumber" value={driverFormData.mobileNumber} onChange={(e) => {
                                        handleFormUpdate(e);

                                        if (e.target.value.length > 10) {

                                        }
                                    }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="address"
                                    label=" City"
                                    rules={[{ required: true, message: 'Please input your  City' }]}
                                >
                                    <Input name="address" value={driverFormData.address} onChange={(e) => handleFormUpdate(e)} style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="State"
                                    label=" State"
                                    rules={[{ required: false, message: 'slect your State' }]}
                                >
                                    <Select
                                        defaultValue="State"
                                        style={{ width: "100%" }}
                                        onChange={(e) => handleFormUpdate(e, 'stateId')}
                                    >
                                        {StateData.map((option, index) => (
                                            <option key={index} value={option.value} >
                                                {option.text}
                                            </option>
                                        ))}

                                    </Select>
                                </Form.Item>
                            </Col>
                            {/* <Col span={12}>
                                <Form.Item
                                    name="Zip Code"
                                    label=" Zip Code"
                                    rules={[{ required: false, message: 'Please input your  Zip Code' }]}
                                >
                                    <Input style={{ width: '100%' }} />
                                </Form.Item>
                            </Col> */}
                            <Col span={12}>
                                <Form.Item
                                    name="Country"
                                    label=" Country"
                                >
                                    <Select
                                        defaultValue="Country"
                                        style={{ width: "100%" }}
                                        onChange={(e) => handleFormUpdate(e, 'countryId')}
                                    >  {Country.map((option, index) => (
                                        <option key={index} value={option.value} >
                                            {option.text}
                                        </option>
                                    ))}</Select>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Buttons label="Create" type="submit" data-autoid="" />
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </Profilepage>
        </>
    );
}
export default DriverCreate
