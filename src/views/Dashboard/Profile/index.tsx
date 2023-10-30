import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Row } from 'antd';
import { ReactElement, useEffect, useState } from 'react';
import { ProfileIetms, AddCandidate, Profilepage, SubHeading } from 'styles/views/Deshboard/Profile/index';
import AboutPage from './About';
import useGet from 'hooks/useGet';
import { AdminAllDetails, ComapnyRegistration } from 'constants/api';

const ProfilePage = (): ReactElement => {
    const Role = localStorage.getItem("_role")
    const id = localStorage.getItem("_id")
    const [adminData, setAdminData] = useState<any>()
    const { mutateAsync: getAdminData } = useGet();
    useEffect(() => {
        getAdminData({
            url: Role == "ADMIN" ? AdminAllDetails : Role == "COMPANY" ? ComapnyRegistration + id : "",
            // url: AdminAllDetails,
            token: true,
            type: 'auth',
        }).then((adminResult) => {
            setAdminData(adminResult)

        })
    }, [])
    return (
        <>
            <Profilepage>
                <AddCandidate>
                    <SubHeading>Profile</SubHeading>
                    {/* <Buttons icon={<PlusOutlined />} label="Add Candidate" type="submit" data-autoid="" /> */}
                </AddCandidate>
                <Row gutter={16}>
                    <Col span={8} className="user-profiles">
                        <Card bordered={true}>
                            <div className='profile-bg-img'></div>
                            <ProfileIetms>
                                <div className='profile-user-details'>
                                    <div className='profile-user'>  <Avatar size={64} icon={<UserOutlined />} /></div>
                                    <h3>{Role == "ADMIN" ? <>Admin</> : Role == "COMPANY" ? <>{adminData?.name} </> : ""}</h3>
                                    <p style={{ background: "#eee", width: "100%", padding: "5px" }}>
                                        <a href="mailto:{adminData?.email}">
                                            {adminData?.email}
                                        </a>
                                    </p>

                                </div>
                            </ProfileIetms>
                        </Card>
                    </Col>
                    <Col span={16}>
                        <Card bordered={true}>
                            <AboutPage />
                        </Card>
                    </Col>
                </Row>
            </Profilepage>
        </>
    );
}
export default ProfilePage
