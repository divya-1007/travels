import { CopyOutlined, LoadingOutlined, MessageOutlined, PhoneOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Form, Input, Row, Select, Tabs, List, message, Upload, UploadProps } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload';
import Buttons from 'components/Button';
import { EmployeeRegistration } from 'constants/api';
import useGet from 'hooks/useGet';
import usePatch from 'hooks/usePatch';
import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProfileIetms, AddCandidate, UserProfiles, Profilepage, SubHeading, } from 'styles/views/Deshboard/Profile/index'
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
interface CompanyDetails {
    id: number
    name: string
    domain: string
    supportEmail: string
}
interface EmployeeDetails {
    fullName: string
    email: string
    mobileNumber: string
    company?: CompanyDetails
    companyId: number
    isVerify: boolean
    role: number
    id: ''
    address: string
    fileUrl?: any
}
const Employeedata = (): ReactElement => {

    const [messageApi, contextHolder] = message.useMessage();
    const [employeeData, setEmployeeData] = useState<EmployeeDetails>({
        fullName: '',
        email: '',
        mobileNumber: '',
        companyId: 0,
        isVerify: false,
        role: 0,
        address: '',
        id: '',
        fileUrl: {}
    });
    const [employeeId, setEmployeeId] = useState()
    const { mutateAsync: EmployeeDatils } = useGet()
    const { mutateAsync: EmployeeUpdate } = usePatch()
    const [form] = Form.useForm();
    const params = useParams();

    const [loading, setLoading] = useState(false);
    const [filePreview, setFilePreview] = useState<any>();
    // const [file, setFile] = useState<any>();
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    // ********************
    const fileUpload: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {

        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        // Get this url from response in real world.
        if (info.file.originFileObj) {
            setLoading(false);
            setEmployeeData({ ...employeeData, fileUrl: info.file.originFileObj })


            getBase64(info.file.originFileObj as RcFile, (url) => {
                setFilePreview(url);
            });
        }
    };
    const fetchData = () => {
        EmployeeDatils({
            url: EmployeeRegistration + params.id,
            type: 'details',
            token: true
        }).then((result) => {
            setEmployeeData(result)
            setEmployeeId(result?.id)
            form.setFieldsValue({
                id: result?.id,
                fullName: result?.fullName,
                email: result?.email,
                mobileNumber: result?.mobileNumber,
                address: result?.address,
                fileUrl: result?.fileUrl
                // mobileNumber: result?.mobileNumber,
            });
            // const imageObjectURL = URL.createObjectURL(result?.fileUrl);
            // setImg(imageObjectURL);

        })
    }
    useEffect(() => {
        fetchData()
    }, [])



    // api  for update employee

    const UpdateForm = (e: any) => {
        // const payload = {
        //     fullName: employeeData.fullName,
        //     email: employeeData.email,
        //     mobileNumber: employeeData.mobileNumber,
        //     address: employeeData.address,
        //     id: employeeId,
        //     // file: employeeData.file,
        //     fileUrl: employeeData?.fileUrl,
        // }
        const payloads = employeeData
        EmployeeUpdate({
            url: EmployeeRegistration,
            type: 'details',
            payload: payloads,
            file: true,
            token: true,

        }).then(res => {
            setEmployeeData(res);
            messageApi.open({
                type: 'success',
                content: 'successfully Edit',
            });
            fetchData()
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
            title: employeeData ? employeeData?.email : "",
            avatar: <><MessageOutlined /> <b>Email</b></>
        },
        {
            title: employeeData ? employeeData?.mobileNumber : '',
            avatar: <> <PhoneOutlined /> <b>Mobile No.</b></>
        },
        {
            title: employeeData ? employeeData?.company?.name : "",
            avatar: <><CopyOutlined /> <b>Company Name</b></>
        },
        {
            title: employeeData?.isVerify == true ? <div className="" style={{ color: "green" }}> Verify</div> : employeeData?.isVerify == false ? <div className="" style={{ color: "red" }}>Not Verify</div> : "",
            avatar: <CopyOutlined />
        },
    ];

    return (
        <>
            {contextHolder}
            <Profilepage>
                <UserProfiles>
                    <AddCandidate>
                        <SubHeading>Employee Profile</SubHeading>
                    </AddCandidate>
                    <Row gutter={16}>
                        <Col span={8} className="user-profiles">
                            <Card bordered={true}>
                                <div className='profile-bg-img'></div>

                                <ProfileIetms>
                                    <div className='profile-user-details'>
                                        <div className='profile-user'>
                                            {/* <Avatar size={64} icon={<UserOutlined />} /> */}
                                            <img style={{ width: "100%", height: "auto" }} src={`http://${employeeData?.fileUrl}`} alt="" />
                                        </div>
                                        <h3>{employeeData ? employeeData?.fullName : ""}</h3>
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
                                                name="fullName"
                                                label="full Name "
                                                rules={[{ required: true, message: 'Please input your full Name' }]}
                                            >
                                                <Input style={{ width: '100%' }} defaultValue={employeeData?.fullName} value={employeeData?.fullName} onChange={(e) => setEmployeeData({ ...employeeData, fullName: e.target.value })} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="email"
                                                label="Email Address"
                                                rules={[{ required: true, message: 'Please input your Email Address' }]}
                                            >
                                                <Input style={{ width: '100%' }} value={employeeData?.email} onChange={(e) => setEmployeeData({ ...employeeData, email: e.target.value })} disabled />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="mobileNumber"
                                                label="mobile Number"
                                                rules={[{ required: true, message: 'Please input your mobile Number' }]}>
                                                <Input style={{ width: '100%' }} value={employeeData?.mobileNumber} onChange={(e) => setEmployeeData({ ...employeeData, mobileNumber: e.target.value })} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Form.Item
                                                name="address"
                                                label=" Address"
                                                rules={[{ required: false, message: 'Please input your  Address' }]}
                                            >
                                                <Input value={employeeData?.address} onChange={(e) => setEmployeeData({ ...employeeData, address: e.target.value })} style={{ width: '100%' }} />
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
                                                    disabled >
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        {/* <Col span={12}>
                                            <Form.Item
                                                name="Zip Code"
                                                label=" Zip Code"
                                            >
                                                <Input style={{ width: '100%' }} disabled />
                                            </Form.Item>
                                        </Col> */}
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
                                        <Col span={24}>
                                            <Upload
                                                name="avatar"
                                                listType="picture-card"
                                                className="avatar-uploader"
                                                showUploadList={false}
                                                beforeUpload={beforeUpload}
                                                onChange={(e) => fileUpload(e)}
                                                style={{ overflow: "hidden" }}
                                            >
                                                {filePreview ? <img src={filePreview} alt="avatar" style={{ width: '100%', height: "auto" }} /> : uploadButton}
                                            </Upload>
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
export default Employeedata
