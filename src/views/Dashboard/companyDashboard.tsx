import { Button, Card, Col, Progress, Row } from 'antd';
import { ReactElement, useEffect, useState } from 'react';
import {
    MainBoxContainer, TotalNumber, TextField,
    CardBox, TextParagraph, Counter, TextFieldTag,
    TextFieldTagHeading, DeshboardItems,
    DashboardFirstItems
} from 'styles/views/Deshboard/index';
import { ArrowRightOutlined, CarOutlined, UserOutlined } from '@ant-design/icons';
import { LogoutView, MainContainer, NavSubContainer, UserSubContainer } from 'styles/component/Navbar';
import CoinICon from 'assets/images/commisions.svg'
import Customer from 'assets/images/customer.svg'
import Income from 'assets/images/income.svg'
import { useNavigate } from 'react-router-dom';

import { Image, TextData, TextValue } from 'styles/views/Deshboard/Report';
import useGet from 'hooks/useGet';
import { TotalCab, TotalCompany, TotalDriver, TotalEmployee, CompanyEmployeeCount } from 'constants/api';
import { Link } from 'react-router-dom';

const CompanyDashboard = (): ReactElement => {
    const ID = localStorage.getItem("_id")

    const [totalComapny, setTotalCompant] = useState()
    const [totalEmployee, setTotalEmployee] = useState()
    const [totalDriver, setTotalDriver] = useState()
    const [totalCab, setTotalCab] = useState()


    const navigate = useNavigate();
    const companyPage = (id: string) => {
        navigate("/list", {
            state: { key: id }
        });
    }
    const { mutateAsync: totalCompanyNO } = useGet();
    const { mutateAsync: totalEmployeeNO } = useGet();
    const { mutateAsync: tatalDriverNO } = useGet();
    const { mutateAsync: totalCabNO } = useGet();
    useEffect(() => {
        totalCompanyNO({
            url: `${CompanyEmployeeCount}/${ID}`,
            type: 'details',
            token: true
        }).then((res) => {
            setTotalEmployee(res)
        }).catch((error) => {

        })
        totalEmployeeNO({
            url: TotalEmployee,
            type: 'details',
            token: true
        }).then((res) => {
            setTotalEmployee(res)

        }).catch((error) => {

        })
        tatalDriverNO({
            url: TotalDriver,
            type: 'details',
            token: true
        }).then((res) => {
            setTotalDriver(res)
        }).catch((error) => {

        })
        totalCabNO({
            url: TotalCab,
            type: 'details',
            token: true
        }).then((res) => {
            setTotalCab(res)
        }).catch((error) => {

        })
    }, [])


    return (
        <>

            <MainBoxContainer>
                <MainContainer>
                    <NavSubContainer>
                        <TextFieldTagHeading>Dashboard</TextFieldTagHeading>
                    </NavSubContainer>
                    <UserSubContainer>
                        <TextFieldTag><Link to="/dashboard">Home/Dashboard</Link></TextFieldTag>
                        <LogoutView>
                        </LogoutView>
                    </UserSubContainer>
                </MainContainer>
                <DeshboardItems>
                    <DashboardFirstItems>
                        <Row gutter={16}>
                            {/* onClick={() => companyPage("3")} */}
                            <Col span={6} md={6} sm={12} xs={24}>
                                <Card >
                                    <CardBox>
                                        <Counter>
                                            <TotalNumber>{totalEmployee}</TotalNumber>
                                            <TextField>Total No Of Employee</TextField>
                                        </Counter>
                                        <UserOutlined />
                                    </CardBox>
                                    <TextParagraph > <Link to="/employee/employee-list" >more info <ArrowRightOutlined /></Link></TextParagraph>
                                </Card>
                            </Col>
                            {/* <Col span={6} md={6} sm={12} xs={24}>
                                <Card >
                                    <CardBox>
                                        <Counter>
                                            <TotalNumber>{totalCab}</TotalNumber>
                                            <TextField>Total No Of Cab</TextField>
                                        </Counter>
                                        <CarOutlined />
                                    </CardBox>
                                    <TextParagraph><Link to="/cab/cab-list">more info <ArrowRightOutlined /></Link></TextParagraph>
                                </Card>
                            </Col> */}
                            {/* <Col span={6} md={6} sm={12} xs={24}>
                                <Card >
                                    <CardBox>
                                        <Counter>
                                            <TotalNumber>{totalDriver}</TotalNumber>
                                            <TextField>Total No Of Drivers</TextField>
                                        </Counter>
                                    </CardBox>
                                    <TextParagraph ><Link to="/driver/driver-list">more info <ArrowRightOutlined /></Link></TextParagraph>
                                </Card>
                            </Col> */}
                        </Row>
                    </DashboardFirstItems>
                    <Row gutter={16}>

                        {/* <Col span={6} md={6} sm={12} xs={24}>
                            <Card bordered={true}>
                                <Image> <img src={Customer} alt="" /></Image>
                                <TextValue>50</TextValue>
                                <TextData>New Customers</TextData>
                                <Progress percent={50} size="small" status="active" />
                                <Button>View</Button>
                            </Card>
                        </Col>
                        <Col span={6} md={6} sm={12} xs={24}>
                            <Card bordered={true}>
                                <Image> <img src={Income} alt="" /></Image>
                                <TextValue>20</TextValue>
                                <TextData>Today Cab Booking </TextData>
                                <Progress percent={70} size="small" status="exception" />
                                <Button className='bg-primary'>View</Button>
                            </Card>
                        </Col>
                        <Col span={6} md={6} sm={12} xs={24}>
                            <Card bordered={true}>
                                <Image> <img src={CoinICon} alt="" /></Image>
                                <TextValue>30</TextValue>
                                <TextData>Bills Pending </TextData>
                                <Progress percent={30} size="small" />
                                <Button>View</Button>
                            </Card>
                        </Col> */}
                    </Row>
                </DeshboardItems>

            </MainBoxContainer>
        </>

    );
};

export default CompanyDashboard;