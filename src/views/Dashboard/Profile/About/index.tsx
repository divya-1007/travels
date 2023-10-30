import { Col, Form, Input, Row, message } from 'antd';
import { ReactElement, useEffect, useState } from 'react';
import { MainBoxContainer } from 'styles/views/Deshboard/Profile/About';
import Buttons from 'components/Button';
import usePatch from 'hooks/usePatch';
import { AdminAllDetails, ChangePassword, ComapnyRegistration } from 'constants/api';
import usePost from 'hooks/usePost';
import useGet from 'hooks/useGet';
const AboutPage = (): ReactElement => {
    const [adminPassword, setAdminPassword] = useState("")
    const [adminNewPassword, setAdminNewPassword] = useState("")
    const [adminEmail, setAdminEmail] = useState("")
    const [messageApi, contextHolder] = message.useMessage();
    const { mutateAsync: updateStatus, data: updatedData } = usePost();
    const [adminData, setAdminData] = useState<any>()

    const { mutateAsync: getAdminData } = useGet();
    const id = localStorage.getItem("_id")

    useEffect(() => {
        getAdminData({
            // url: { Role== "ADMIN" ? AdminAllDetails } ComapnyRegistration,
            url: Role == "ADMIN" ? AdminAllDetails : Role == "COMPANY" ? ComapnyRegistration + id : "",
            token: true,
            type: 'auth',
        }).then((adminResult) => {
            setAdminData(adminResult)

        })
    }, [])

    const changePassword = () => {
        // ChangePassword
        const payload = {
            id: adminData?.id,
            oldPassword: adminPassword,
            password: adminNewPassword,
        }
        updateStatus({
            url: ChangePassword,
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
    const Role = localStorage.getItem("_role")

    return (
        <>
            {contextHolder}
            <MainBoxContainer>
                {Role == "ADMIN" ?
                    <Form name="form_item_path" layout="vertical" onFinish={changePassword}>
                        <h3 style={{ margin: "0px 0px 5px" }}>Change Your password</h3>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="Email"
                                    label="Admin Email "
                                    rules={[{ required: false, message: 'Please input your full Name ' }]}
                                >
                                    <Input placeholder={adminData?.email} style={{ width: '100%' }} value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} disabled />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="previouspassword"
                                    label="Previous Password "
                                    rules={[{ required: true, message: 'Please enter password ' }]}
                                >
                                    <Input.Password value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} placeholder="Previous password" />
                                    {/* <Input type="password" style={{ width: '100%' }} value={adminPassword} onChange={(e) => setAdminPassword} /> */}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="newPassword"
                                    label="New Password"
                                    rules={[{ required: true, message: 'Please enter new password ' }]}
                                >
                                    <Input.Password value={adminNewPassword} onChange={(e) => setAdminNewPassword(e.target.value)} placeholder="New password" />
                                    {/* <Input type="password" style={{ width: '100%' }} value={adminNewPassword} onChange={(e) => setAdminNewPassword} /> */}
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Buttons label="Submit" type="submit" data-autoid="" />
                            </Col>
                        </Row>
                    </Form>
                    : Role == "COMPANY" ? <Form name="form_item_path" layout="vertical" onFinish={changePassword}>
                        <h3 style={{ margin: "0px 0px 5px" }}>Change Your password</h3>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="Email"
                                    label="Company Email "
                                    rules={[{ required: false, message: 'Please input your full Name ' }]}
                                >
                                    <Input placeholder={adminData?.email} style={{ width: '100%' }} value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} disabled />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="previouspassword"
                                    label="Previous Password "
                                    rules={[{ required: true, message: 'Please enter password ' }]}
                                >
                                    <Input.Password value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} placeholder="Previous password" />
                                    {/* <Input type="password" style={{ width: '100%' }} value={adminPassword} onChange={(e) => setAdminPassword} /> */}
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="newPassword"
                                    label="New Password"
                                    rules={[{ required: true, message: 'Please enter new password ' }]}
                                >
                                    <Input.Password value={adminNewPassword} onChange={(e) => setAdminNewPassword(e.target.value)} placeholder="New password" />
                                    {/* <Input type="password" style={{ width: '100%' }} value={adminNewPassword} onChange={(e) => setAdminNewPassword} /> */}
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Buttons label="Submit" type="submit" data-autoid="" />
                            </Col>
                        </Row>
                    </Form> : ""
                }

            </MainBoxContainer>
        </>

    );
};

export default AboutPage;