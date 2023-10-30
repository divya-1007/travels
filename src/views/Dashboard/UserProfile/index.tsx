import { CopyOutlined, MessageOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Form, Input, Row, Select, List, message } from 'antd';
import Buttons from 'components/Button';
import { ComapnyRegistration, CompanyChangePassword } from 'constants/api';
import useGet from 'hooks/useGet';
import usePost from 'hooks/usePost';
import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    ProfileIetms,
    AddCandidate,
    UserProfiles,
    Profilepage,
} from 'styles/views/Deshboard/Profile/index'
const UserProfileDtails = (): ReactElement => {

    const [companyDetailsById, setCompanyDetailsById] = useState<any>([]);
    const { mutateAsync: CompanyDetails } = useGet()
    const [messageApi, contextHolder] = message.useMessage();
    const [companyPassword, setCompanyPassword] = useState("")
    const [companyNewPassword, setCompanyNewPassword] = useState("")
    const { mutateAsync: companyInfoChange, data: updatedData } = usePost();

    const params = useParams();
    // *************************
    const [form] = Form.useForm();


    const UpdateForm = () => {
        // ChangePassword
        const payload = {
            id: companyDetailsById.id,
            oldPassword: companyPassword,
            password: companyNewPassword,
        }
        companyInfoChange({
            url: CompanyChangePassword,
            token: true,
            type: 'auth',
            payload
        }).then((res) => {
            messageApi.open({
                type: 'success',
                content: 'successfully Change Password.',
            });
        }).catch((error) => {
            messageApi.open({
                type: 'error',
                content: 'Something went wrong',
            });
        })
    }

    // ************** company Details by id***********
    useEffect(() => {
        CompanyDetails({
            url: ComapnyRegistration + params.id,
            type: 'details',
            token: true
        }).then(res => {
            setCompanyDetailsById(res);

        }).catch(error => {
        })
    }, [])
    // ********************
    const handleChange = (value: string) => {
    };
    const data = [
        {
            title: companyDetailsById ? companyDetailsById?.name : "",
            avatar: <><b>Company Name:</b></>
        },
        {
            title: companyDetailsById ? companyDetailsById?.supportEmail : "",
            avatar: <><b>SupportEmail:</b></>
        },
        {
            title: companyDetailsById ? companyDetailsById?.domain : "",
            avatar: <><b>Domain:</b></>
        },
    ];

    return (
        <>
            {contextHolder}
            <Profilepage>
                <UserProfiles>
                    <AddCandidate>
                        <h3>Company Profile</h3>
                    </AddCandidate>

                    <Row gutter={16}>
                        <Col span={8}>
                            <Card bordered={true}>
                                <ProfileIetms>
                                    <Avatar size={64} icon={<UserOutlined />} />
                                    <h3>{companyDetailsById ? companyDetailsById?.name : ""}</h3>
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
                                                name="supportEmail"
                                                label="Support Email  "
                                                rules={[{ required: false, message: 'Please input your license Number ' }]}
                                            >
                                                <Input style={{ width: '100%' }} placeholder={companyDetailsById?.supportEmail} value={companyDetailsById?.supportEmail} disabled />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="domain"
                                                label="Domain  "
                                                rules={[{ required: false, message: 'Please input your license Number ' }]}
                                            >
                                                <Input style={{ width: '100%' }} placeholder={companyDetailsById?.domain} value={companyDetailsById?.name} disabled />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="password"
                                                label="old Password"
                                                rules={[{ required: true, message: 'Please input your password ' }]}>
                                                <Input style={{ width: '100%' }} name="password" value={companyPassword} onChange={(e) => setCompanyPassword(e.target.value)} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="companyNewPassword"
                                                label="new Password"
                                                rules={[{ required: true, message: 'Please input your password ' }]}>
                                                <Input style={{ width: '100%' }} name="companyNewPassword" value={companyNewPassword} onChange={(e) => setCompanyNewPassword(e.target.value)} />
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
export default UserProfileDtails
