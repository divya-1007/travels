import { CopyOutlined, MessageOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Form, Input, Row, Select, Tabs, List, message } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import Buttons from 'components/Button';
import { DriverDetails, EmployeeRegistration } from 'constants/api';
import useGet from 'hooks/useGet';
import usePatch from 'hooks/usePatch';
import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProfileIetms, AddCandidate, UserProfiles, Profilepage, SubHeading, } from 'styles/views/Deshboard/Profile/index'

interface CompanyDetails {
    id: number
    name: string
    domain: string
    supportEmail: string
}
interface EmployeeDetails {
    licenseNumber: any;
    name: string
    email: string
    mobileNumber: string
    // company?: CompanyDetails
    companyId: number
    isVerify: boolean
    role: number
    id: ''
    address: string
}

const DriverData = (): ReactElement => {
    const State = [
        { value: "MP", text: "Madhya Pradesh" },
        { value: "AP", text: "Andhra Pradesh" },
        { value: "AR", text: "Arunachal Pradesh" },
    ]
    const company = [
        { value: '1', text: '--Choose an option--' },
        { value: '2', text: 'elicit Digital ' },
        { value: '3', text: 'elicit Digital ' },
        { value: '4', text: 'elicit Digitals ' },
    ];
    const Country = [
        { value: '', text: '--Choose an option--' },
        { value: 1, text: 'India ' },
        { value: 2, text: 'Nepal' },
        { value: 3, text: 'Bangladesh ' },
    ];
    const [messageApi, contextHolder] = message.useMessage();
    const [driverData, setDriverData] = useState<EmployeeDetails>({
        name: '',
        licenseNumber: "",
        email: '',
        mobileNumber: '',
        companyId: 0,
        isVerify: false,
        role: 0,
        address: '',
        id: '',
    });
    const [employeeId, setEmployeeId] = useState()
    const { mutateAsync: EmployeeDatils } = useGet()
    const { mutateAsync: EmployeeUpdate } = usePatch()
    const [form] = Form.useForm();
    const params = useParams();
    useEffect(() => {
        EmployeeDatils({
            url: DriverDetails + params.id,
            type: 'details',
            token: true
        }).then((result) => {
            setDriverData(result)
            form.setFieldsValue({
                name: result?.name,
                licenseNumber: result?.licenseNumber,
                mobileNumber: result?.mobileNumber,
                address: result?.address,
            });
            setEmployeeId(result?.id)
        })
    }, [])

    // useEffect(() => {
    // }, [driverData])


    // api  for update employee

    const UpdateForm = (e: any) => {
        const payload = {
            name: driverData.name,
            licenseNumber: driverData.licenseNumber,
            mobileNumber: driverData.mobileNumber,
            address: driverData.address,
            id: employeeId
        }
        EmployeeUpdate({
            url: DriverDetails,
            type: 'details',
            payload: payload,
            token: true
        }).then(res => {
            setDriverData(res);
            messageApi.open({
                type: 'success',
                content: 'successfully Edit',
            });
        }).catch(error => {
            messageApi.open({
                type: 'error',
                content: 'something went wrong',
            });
        })
    }

    const handleChange = (value: string) => {
    };
    const data = [
        {
            title: driverData ? driverData?.name : "",
            avatar: <b> Name</b>
        },
        {
            title: driverData ? driverData?.licenseNumber : '',
            // avatar: <PhoneOutlined />
            avatar: <b>License No</b>
        },
        {
            title: driverData ? driverData?.address : "",
            avatar: <CopyOutlined />
        },
        {
            title: driverData ? driverData?.mobileNumber : "",
            avatar: <CopyOutlined />
        },
    ];

    return (
        <>
            {contextHolder}
            <Profilepage>
                <UserProfiles>
                    <AddCandidate>
                        <SubHeading>Driver Profile</SubHeading>
                    </AddCandidate>
                    <Row gutter={16}>
                        <Col span={8} className="user-profiles">
                            <Card bordered={true}>
                                <div className='profile-bg-img'></div>

                                <ProfileIetms>
                                    <div className='profile-user-details'>
                                        <div className='profile-user'>
                                            <Avatar size={64} icon={<UserOutlined />} />
                                        </div>
                                        <h3>{driverData ? driverData.name : ""}</h3>
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={data}
                                            renderItem={(item) => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        avatar={item.avatar}
                                                        title={<a href="#">{item.title}</a>}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                        {/* <Buttons label="Show More" type="submit" data-autoid="" /> */}
                                    </div>
                                </ProfileIetms>
                            </Card>
                        </Col>
                        <Col span={16}>
                            <Card bordered={true}>
                                <h3>Change Information</h3>
                                <Form form={form} name="form_item_path" layout="vertical" onFinish={UpdateForm}>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                name="name"
                                                label="full Name "
                                                rules={[{ required: true, message: 'Please input your full Name ' }]}
                                            >
                                                <Input style={{ width: '100%' }} defaultValue={driverData.name} value={driverData.name} onChange={(e) => setDriverData({ ...driverData, name: e.target.value })} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="licenseNumber"
                                                label="license Number "
                                                rules={[{ required: true, message: 'Please input your license Number ' }]}
                                            >
                                                <Input style={{ width: '100%' }} value={driverData?.licenseNumber} onChange={(e) => setDriverData({ ...driverData, licenseNumber: e.target.value })} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="mobileNumber"
                                                label="mobile Number"
                                                rules={[{ required: true, message: 'Please input your mobile Number' }]}>
                                                <Input style={{ width: '100%' }} value={driverData.mobileNumber} onChange={(e) => setDriverData({ ...driverData, mobileNumber: e.target.value })} />
                                            </Form.Item>
                                        </Col>
                                        {/* <Col span={12}>
                                                    <Form.Item
                                                        name="password"
                                                        label="Password"
                                                        rules={[{ required: true, message: 'Please input your password' }]}
                                                    >
                                                        <Input style={{ width: '100%' }} />
                                                    </Form.Item>
                                                </Col> */}
                                        <Col span={24}>
                                            <Form.Item
                                                name="address"
                                                label=" Address"
                                                rules={[{ required: true, message: 'Please input your  Address' }]}
                                            >
                                                <Input value={driverData.address} onChange={(e) => setDriverData({ ...driverData, address: e.target.value })} style={{ width: '100%' }} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="City"
                                                label=" City"
                                                rules={[{ required: false, message: 'Please input your  Address' }]}
                                            >
                                                <Input style={{ width: '100%' }} disabled />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="State"
                                                label=" State"
                                                rules={[{ required: false, message: 'Please input your  Address' }]}
                                            >
                                                <Select
                                                    defaultValue="State"
                                                    style={{ width: "100%" }}
                                                    onChange={handleChange}
                                                    // options={[
                                                    //     { value: 'jack', label: 'Jack' },
                                                    //     { value: 'lucy', label: 'Lucy' },
                                                    //     { value: 'Yiminghe', label: 'yiminghe' },
                                                    //     { value: 'disabled', label: 'Disabled', disabled: true },
                                                    // ]}
                                                    disabled >
                                                    {/* {State.map((option, index) => (
                                                                <option key={index} value={option.value}>
                                                                    {option.text}
                                                                </option>
                                                            ))} */}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="Zip Code"
                                                label=" Zip Code"
                                            >
                                                <Input style={{ width: '100%' }} disabled />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="Country"
                                                label=" Country"
                                            >
                                                <Select
                                                    defaultValue="State"
                                                    style={{ width: "100%" }}
                                                    onChange={handleChange}
                                                    // options={[
                                                    //     { value: 'jack', label: 'Jack' },
                                                    //     { value: 'lucy', label: 'Lucy' },
                                                    //     { value: 'Yiminghe', label: 'yiminghe' },
                                                    //     { value: 'disabled', label: 'Disabled', disabled: true },
                                                    // ]}
                                                    disabled >
                                                    {/* {Country.map((option, index) => (
                                        <option key={index} value={option.value}>
                                            {option.text}
                                        </option>
                                    ))} */}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Buttons label="Submit" type="submit" data-autoid="" />
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </UserProfiles>
            </Profilepage>
        </>
    );
}
export default DriverData
