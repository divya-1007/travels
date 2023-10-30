import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Progress, Rate, Row } from 'antd';
import { ReactElement } from 'react';
import {
    MainBoxContainer, TextValue,
    TextData, ReportSection, Image,
    ReviewsBox, ReviewsPerson, ItemsList,
    Description, TopSection
} from 'styles/views/Deshboard/Report';
import CoinICon from 'assets/images/commisions.svg'
import Customer from 'assets/images/customer.svg'
import Income from 'assets/images/income.svg'
import CabBookingInformationfilter from 'components/Table/CabBookingInformation/CabBookingFilter';
import { SubHeading } from 'styles/views/Deshboard/Profile';


const ReportPage = (): ReactElement => {
    return (
        <>
            <MainBoxContainer>
                <ReportSection>
                    <SubHeading>Report</SubHeading>
                    <Row gutter={16}>

                        <Col span={6} md={6} sm={12} xs={24}>
                            <Card bordered={true}>
                                <Image> <img src={Customer} alt="" /></Image>
                                <TextValue>50</TextValue>
                                <TextData>New Customers</TextData>
                                <Progress percent={50} size="small" status="active" />
                                {/* <Progress type="circle" percent={70} status="exception" /> */}
                                <Button>View</Button>
                            </Card>
                        </Col>
                        <Col span={6} md={6} sm={12} xs={24}>
                            <Card bordered={true}>
                                <Image> <img src={Customer} alt="" /></Image>
                                <TextValue>100</TextValue>
                                <TextData>This Month Cab Booking List </TextData>
                                <Progress percent={100} size="small" />
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
                                {/* <Progress type="circle" percent={100} /> */}
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
                        </Col>
                    </Row>

                    <Row gutter={16} style={{ marginTop: "20px" }}>
                        <Col span={12} md={12} sm={24} xs={24}>
                            <Card>
                                <h3>Recent Booking</h3>
                                <CabBookingInformationfilter />
                            </Card>
                        </Col>
                        <Col span={12} md={12} sm={24} xs={24}>
                            <Card>
                                <h3>Recent Booking</h3>
                                <CabBookingInformationfilter />
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{ marginTop: "20px" }}>
                        <Col span={12} md={12} sm={24} xs={24}>
                            <Card>
                                <TopSection>
                                    <TextData>Reviews </TextData>
                                    <TextData>
                                        <Rate allowHalf defaultValue={2.5} disabled />
                                    </TextData>
                                </TopSection>
                                <ReviewsBox>
                                    <Image>
                                        <Avatar size={40} icon={<UserOutlined />} />
                                    </Image>
                                    <ReviewsPerson>
                                        <Rate allowHalf defaultValue={2.5} disabled />
                                        <h3>Best Quality</h3>
                                        <p>By, Hayasa Galleher <span>12/12/22</span></p>
                                        <Description>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Description>
                                    </ReviewsPerson>
                                </ReviewsBox>
                                <ReviewsBox>
                                    <Image>
                                        <Avatar size={40} icon={<UserOutlined />} />
                                    </Image>
                                    <ReviewsPerson>
                                        <Rate allowHalf defaultValue={4} disabled />
                                        <h3>Best Quality</h3>
                                        <p>By, Hayasa Galleher <span>12/12/22</span></p>
                                        <Description>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Description>
                                    </ReviewsPerson>
                                </ReviewsBox>
                                <ReviewsBox>
                                    <Image>
                                        <Avatar size={40} icon={<UserOutlined />} />
                                    </Image>
                                    <ReviewsPerson>
                                        <Rate allowHalf defaultValue={3.5} disabled />
                                        <h3>Best Quality</h3>
                                        <p>By, Hayasa Galleher <span>12/12/22</span></p>
                                        <Description>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Description>
                                    </ReviewsPerson>
                                </ReviewsBox>
                            </Card>
                        </Col>
                        <Col span={12} md={12} sm={24} xs={24}>
                            <Card>
                                <TopSection>
                                    <TextData>Top Rated Cab </TextData>
                                </TopSection>
                                <ItemsList>
                                    <TopSection>
                                        <TextData>Cab 01 </TextData>
                                        <TextData>
                                            <Rate allowHalf defaultValue={5} disabled />
                                        </TextData>
                                    </TopSection>
                                </ItemsList>
                                <ItemsList>
                                    <TopSection>
                                        <TextData>Cab 02 </TextData>
                                        <TextData>
                                            <Rate allowHalf defaultValue={5} disabled />
                                        </TextData>
                                    </TopSection>
                                </ItemsList>
                                <ItemsList>
                                    <TopSection>
                                        <TextData>Cab 03 </TextData>
                                        <TextData>
                                            <Rate allowHalf defaultValue={4.9} disabled />
                                        </TextData>
                                    </TopSection>
                                </ItemsList>
                                <ItemsList>
                                    <TopSection>
                                        <TextData>Cab 04 </TextData>
                                        <TextData>
                                            <Rate allowHalf defaultValue={4.8} disabled />
                                        </TextData>
                                    </TopSection>
                                </ItemsList>
                                <ItemsList>
                                    <TopSection>
                                        <TextData>Cab 05 </TextData>
                                        <TextData>
                                            <Rate allowHalf defaultValue={4.6} disabled />
                                        </TextData>
                                    </TopSection>
                                </ItemsList>
                                <ItemsList>
                                    <TopSection>
                                        <TextData>Cab 0 </TextData>
                                        <TextData>
                                            <Rate allowHalf defaultValue={4.5} disabled />
                                        </TextData>
                                    </TopSection>
                                </ItemsList>
                            </Card>
                        </Col>
                    </Row>
                </ReportSection>
            </MainBoxContainer>
        </>

    );
};

export default ReportPage;