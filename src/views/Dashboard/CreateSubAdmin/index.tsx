import { Card, Col, Modal, Row, Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import Buttons from 'components/Button';
import { ReactElement, useState } from 'react';
import {
    AddCandidate,
    Profilepage
} from 'styles/views/Deshboard/Profile/index'

import CompanyForm from './DetailsForm/CompanyForm';
import EmployeeForm from './DetailsForm/EmployeeForm';
import { LogoutView, MainContainer, NavSubContainer, UserSubContainer } from 'styles/component/Navbar';
import { TextFieldTag, TextFieldTagHeading } from 'styles/views/Deshboard';
import CabForm from './DetailsForm/CabForm';
import DriverCreate from './DetailsForm/DriverForm';
import { Link } from 'react-router-dom';


const CreateSubAdmin = (): ReactElement => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Profilepage>
                <MainContainer>
                    <NavSubContainer>
                        <TextFieldTagHeading>Create</TextFieldTagHeading>
                    </NavSubContainer>
                    <UserSubContainer>
                        <TextFieldTag><Link to="/dashboard">Home</Link></TextFieldTag>

                        <LogoutView>
                        </LogoutView>
                    </UserSubContainer>
                </MainContainer>

                <AddCandidate>
                    {/* <Buttons onClick={showModal} label="Add Candidate" type="submit" data-autoid="" /> */}
                </AddCandidate>
                <Row gutter={16}>
                    <Col span={24}>
                        <Card bordered={true}>
                            <Tabs>
                                <TabPane tab="Company Register" key="1">
                                    <CompanyForm />
                                </TabPane>
                                <TabPane tab="Driver Register" key="2">
                                    <DriverCreate />
                                </TabPane>
                                <TabPane tab="Cab Register" key="3">
                                    <CabForm />
                                </TabPane>
                                <TabPane tab="Employee Register" key="4">
                                    <EmployeeForm />
                                </TabPane>
                            </Tabs>
                        </Card>
                    </Col>

                </Row>
            </Profilepage>

            {/* ****************** */}
            <Modal title="Create Employee" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <>
                    <EmployeeForm />
                </>
            </Modal>
        </>
    );
}
export default CreateSubAdmin
