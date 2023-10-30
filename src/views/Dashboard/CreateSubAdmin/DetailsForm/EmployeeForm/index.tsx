import { Button, Col, Form, Input, message, Upload, Modal, Row, Select, Card } from 'antd';
import Buttons from 'components/Button';
import { ReactElement, useState } from 'react';
import { Profilepage } from 'styles/views/Deshboard/Profile/index'
import { EmployeeRegistration, OtpEmailVerify } from 'constants/api';
import usePost from 'hooks/usePost';
import StateData from 'state.json'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { MainContainer, NavSubContainer, UserSubContainer } from 'styles/component/Navbar';
import { TextFieldTag, TextFieldTagHeading } from 'styles/views/Deshboard';
import { Link } from 'react-router-dom';
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};
const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};
const EmployeeForm = (): ReactElement => {
    const Role = localStorage.getItem("_role")

    const [messageApi, contextHolder] = message.useMessage();
    const [formData, setformData] = useState({
        fullName: '',
        email: '',
        password: '',
        address: '',
        stateId: '',
        countryId: '',
        deviceToken: 1,
        // companyId: 1,
        deviceType: 2,
        deviceId: 100,
        mobileNumber: '',
        fileUrl: {}
    })
    const [employeeVerification, setEmployeeVerification] = useState<any>()
    const [otp, setOtp] = useState("")
    const { mutateAsync: CompanyDAta } = usePost();
    const { mutateAsync: OtpVarifiy } = usePost();
    // ************img file uplode*******
    const [loading, setLoading] = useState(false);
    const [filePreview, setFilePreview] = useState<any>();
    const fileUpload: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {

        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        // Get this url from response in real world.
        if (info.file.originFileObj) {
            setLoading(false);
            setformData({ ...formData, fileUrl: info.file.originFileObj });
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setFilePreview(url);
            });
        }
    };
    const handleFormUpdate = (e: any, option?: any) => {
        if (e.target) {
            setformData({ ...formData, [e.target.name]: e.target.value })
        } else {
            setformData({ ...formData, [option]: e })
        }
    }
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    const Country = [
        { value: 'India', text: 'India ' },
    ]
    const [form] = Form.useForm();
    // *********** Employee Create api*************
    const CreateEmployee = (e: any) => {
        // form.resetFields();
        const payloads = formData
        CompanyDAta({
            url: EmployeeRegistration,
            payload: payloads,
            type: 'details',
            file: true,
            // body: data,
            token: true,
        })
            .then((res) => {
                if (res) {
                    setEmployeeVerification(true);
                    messageApi.open({
                        type: 'success',
                        content: ' Congratulations, your account has been successfully created.',
                    });
                }
                form.resetFields();
                // form.reset();
            }).catch((err) => {
                if (err.data.error == "EMPLOYEE.ERRORS.COMPANY_DOMAIN_DOES_NOT_MATCH") {
                    messageApi.open({
                        type: 'error',
                        content: 'Domain Does Not Match',
                    });
                } else if (err.data.error == "EMPLOYEE.ERRORS.EMAIL_ALREADY_EXIST") {
                    messageApi.open({
                        type: 'error',
                        content: 'Employee Email Already Exist',
                    });
                }
                else {
                    messageApi.open({
                        type: 'error',
                        content: 'something went wrong',
                    });
                }
            })
    };
    // ******************* Otp Verify api**************
    const handleCancel = () => {
        setEmployeeVerification(false)
    }
    const otpEmailVerification = () => {
        const payloads = {
            otp
        }
        OtpVarifiy({
            url: OtpEmailVerify,
            type: 'details',
            payload: payloads,
            token: true,
        }).then((otpRes) => {
            if (otpRes) setEmployeeVerification(false);
        })
    }
    return (
        <>
            {contextHolder}
            <Profilepage>
                <Card>
                    <MainContainer>
                        <NavSubContainer>
                            <TextFieldTagHeading>Create Employee</TextFieldTagHeading>
                        </NavSubContainer>
                        <UserSubContainer>
                            <TextFieldTag>
                                {Role == "ADMIN" ? <><Link to="/dashboard">Home</Link></> : <><Link to="/company/dashboard">Home</Link></>}

                            </TextFieldTag>
                        </UserSubContainer>
                    </MainContainer>
                </Card>
                <Card>
                    <Form form={form} name="form_item_path" layout="vertical" onFinish={CreateEmployee}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="fullName"
                                    label="Full Name "
                                    rules={[{ required: true, message: 'Please input your full Name ' }]}
                                >
                                    <Input style={{ width: '100%' }} name='fullName' value={formData.fullName} onChange={(e) => handleFormUpdate(e)} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="email"
                                    label=" Email Address"
                                    rules={[{ required: true, message: 'Please input your Email Address' }]}

                                >
                                    <Input type="email"
                                        style={{ width: '100%' }} pattern="[a-z0-9]+@[a-z]+\.[a-z]{9,8}" name='email' value={formData.email} onChange={(e) => handleFormUpdate(e)} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="mobileNumber"
                                    label=" Mobile Number"
                                    rules={[{ required: true, message: 'Please input your  Mobile Number' }]}
                                >
                                    <Input style={{ width: '100%' }} title="Please enter your valid Mobile Number or enter 10dig." pattern="(0|91)?[6-9][0-9]{9}" type="tel" name='mobileNumber' value={formData.mobileNumber} onChange={(e) => {
                                        handleFormUpdate(e);
                                        if (e.target.value.length >= 11) {
                                            // setMobileNumber("valid no")
                                        }
                                    }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="password"
                                    label="Create Password"
                                    rules={[{ required: true, message: 'Please input your Password' }]}>
                                    <Input type='Password' id="Password" name="password" style={{ width: '100%' }} value={formData.password} onChange={(e) => handleFormUpdate(e)} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="address"
                                    label=" City"
                                    rules={[{ required: true, message: 'Please input your  City' }]}>
                                    <Input name='address' value={formData.address} onChange={(e) => handleFormUpdate(e)} style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="State"
                                    label=" State"
                                    rules={[{ required: true, message: 'slect your State' }]}>
                                    <Select
                                        defaultValue="State"
                                        style={{ width: "100%" }}
                                        onChange={(e) => handleFormUpdate(e, 'stateId')}
                                    >
                                        {StateData.map((option, index) => (
                                            <option key={index} value={option.value}>
                                                {option.text}
                                            </option>
                                        ))}
                                    </Select>
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
                                        onChange={(e) => handleFormUpdate(e, 'countryId')}
                                    >  {Country.map((option, index) => (
                                        <option key={index} value={option.value}>
                                            {option.text}
                                        </option>
                                    ))}</Select>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}
                                    onChange={(e) => fileUpload(e)}
                                >
                                    {filePreview ? <img src={filePreview} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </Col>
                            <Col span={24}>
                                <Buttons label="Create" type="submit" />
                            </Col>
                        </Row>
                    </Form>
                </Card>
                <Modal className='OtpVerification' title='Verify Account' open={employeeVerification} onCancel={handleCancel}>
                    <p>An OTP has been sent to your entered email <b>{formData.email}</b></p>
                    <h5>Enter your Code here</h5>
                    <Input type='number' placeholder='OTP' value={otp} onChange={(e) => setOtp(e.target.value)} />
                    <p> Didn't receive the code? </p>
                    <h5>Resend OTP</h5>
                    <Button onClick={otpEmailVerification}>Verify</Button>
                </Modal>
            </Profilepage>
        </>
    );
}
export default EmployeeForm