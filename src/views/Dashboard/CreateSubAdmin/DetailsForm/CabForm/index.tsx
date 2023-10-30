import { Card, Col, Form, Input, message, Row, Select, Upload } from 'antd';
import Buttons from 'components/Button';
import { ReactElement, useEffect, useState } from 'react';
import { Profilepage } from 'styles/views/Deshboard/Profile/index'
import usePost from 'hooks/usePost';
import { CabCategory, CabRegistration } from 'constants/api';
import StateData from 'state.json'
import useGet from 'hooks/useGet';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { UploadChangeParam } from 'antd/es/upload';
import { MainContainer, NavSubContainer, UserSubContainer } from 'styles/component/Navbar';
import { TextFieldTag, TextFieldTagHeading } from 'styles/views/Deshboard';
import { Link } from 'react-router-dom';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
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
const CabForm = (): ReactElement => {
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
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
            setCabFormData({ ...cabFormData, fileUrl: info.file.originFileObj });
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setFilePreview(url);
            });
        }
    };
    const handleFormUpdate = (e: any, option?: any) => {
        if (e.target) {
            setCabFormData({ ...cabFormData, [e.target.name]: e.target.value })
        } else {
            setCabFormData({ ...cabFormData, [option]: e })
        }
    }
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    const [cabCategory, setCabCategory] = useState([]);
    const { mutateAsync: Cab } = usePost();
    const { mutateAsync: Category } = useGet();
    const [categoryId, setCategoryId] = useState<any>()
    const [cabFormData, setCabFormData] = useState({
        pucNumber: "",
        insuranceNumber: "",
        companyId: "1",
        regNumber: "",
        // driverId: "",
        stateId: "",
        addedBy: "1",
        countryId: "",
        categoryId: "",
        fileUrl: {}
    })
    // const handleChangeCountary = (value: string) => {
    //     setCountryId(`${value}`)
    // };
    // const handleChangeState = (value: string) => {
    //     setStateId(`${value}`)
    // };
    const SelectCabCategory = (id: any) => {
        setCategoryId(id)
    }
    const Country = [
        { value: 1, text: 'India ' },
    ]
    // ***********cabCatagory *************
    useEffect(() => {
        Category({
            url: CabCategory,
            type: 'details',
            token: true,
        }).then((res) => {
            setCabCategory(res)
        })
    }, [])
    // ************************

    // *********** cab Create api*************
    const CreateEmployee = () => {
        // const payloads = {
        //     // name,
        //     pucNumber,
        //     insuranceNumber,
        //     companyId: 5,
        //     regNumber,
        //     driverId,
        //     stateId,
        //     addedBy, countryId,
        //     categoryId
        // }
        const payloads = cabFormData
        Cab({
            url: CabRegistration,
            type: 'details',
            token: true,
            payload: payloads,
        }).then((res) => {
            messageApi.open({
                type: 'success',
                content: 'Successfully Register',
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
                            <TextFieldTagHeading>Create Cab</TextFieldTagHeading>
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
                                <label>Cab Category</label>
                                <br />
                                <Select
                                    defaultValue="Cab"
                                    style={{ width: 200, marginTop: "5px" }}
                                    // onChange={(e) => SelectCabCategory(e)}
                                    onChange={(e) => handleFormUpdate(e, 'categoryId')}
                                >
                                    {cabCategory.map((res: any) => {
                                        return (
                                            <option value={res?.id} >{res?.cabCategoryName}</option>)
                                    })}
                                </Select>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="regNumber"
                                    label=" Reg. Number"
                                    rules={[{ required: true, message: 'Please input your reg. Number' }]}
                                >
                                    {/* pattern="^[A-Z]{2}\s[0-9]{1,2}\s[A-Z]{1,2}\s[0-9]{1,4}$" */}
                                    <Input name="regNumber" title='enter valid reg. no. "Ex= AA 99 AA 9999"' style={{ width: '100%' }} value={cabFormData.regNumber} onChange={(e) => handleFormUpdate(e)} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="insuranceNumber"
                                    label="Insurance Number"
                                    rules={[{ required: false, message: 'Please input your Insurance Number' }]}
                                >
                                    <Input name="insuranceNumber" style={{ width: '100%' }} value={cabFormData.insuranceNumber} onChange={(e) => handleFormUpdate(e)} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="pucNumber"
                                    label="puc Number"
                                    rules={[{ required: false, message: 'Please input your puc Number' }]}
                                >
                                    <Input style={{ width: '100%' }} name="pucNumber" value={cabFormData.pucNumber} onChange={(e) => handleFormUpdate(e)} />
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
                                        // onChange={handleChangeCountary}
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
                                    onChange={(e) => fileUpload(e)}>
                                    {filePreview ? <img src={filePreview} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
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
export default CabForm