import { CopyOutlined, MessageOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Row, List, MenuProps, } from 'antd';
import Buttons from 'components/Button';
import { CabBooking, CabBookingById } from 'constants/api';
import useGet from 'hooks/useGet';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    ProfileIetms,
    AddCandidate,
    UserProfiles,
    Profilepage,
    TextBox,
    TextHeading,
    Textdata,
    TextHeadingFirst,
    AllDetails,
    SubHeading
} from 'styles/views/Deshboard/Profile/index'
const CabBookingData = () => {
    const [cabBookingDetails, setCabBookingDetails] = useState<any>([]);
    const { mutateAsync: CabBookings } = useGet()
    const params = useParams();
    useEffect(() => {
        CabBookings({
            url: CabBookingById + params.id,
            type: 'details',
            token: true
        }).then(res => {
            setCabBookingDetails(res);

        })
            .catch(error => {
            })
    }, [])
    const ListData = [
        {
            title: cabBookingDetails ? cabBookingDetails?.employee?.email : 'null',
            avatar: <> <MessageOutlined /><span style={{ paddingLeft: " 10px" }}>Email</span></>
        },
        {
            title: cabBookingDetails ? cabBookingDetails?.employee?.mobileNumber : '',
            avatar: <><PhoneOutlined /><span style={{ paddingLeft: " 10px" }}>Mobile No.</span></>
        },
        {
            title: cabBookingDetails ? cabBookingDetails?.employee?.address : '',
            avatar: <> <CopyOutlined /><span style={{ paddingLeft: " 10px" }}>Address </span></>
        },
        {
            title: cabBookingDetails ? cabBookingDetails?.category?.cabCategoryName : '',
            avatar: <><CopyOutlined /><span style={{ paddingLeft: " 10px" }}>Cab Category</span></>
        },
    ];
    return (
        <>
            <Profilepage>
                <UserProfiles>
                    <SubHeading>
                        Booking Information
                    </SubHeading>
                    <p><b>Booking Status :</b>{cabBookingDetails?.bookingStatus == 1 ?
                        <div className="status-Pending"> Pending</div> : cabBookingDetails?.bookingStatus == 2 ?
                            <div className="status-approved">Approved</div> : cabBookingDetails?.bookingStatus == 3 ?
                                <div className="status-ongoing">Ongoing</div> : cabBookingDetails?.bookingStatus == 4 ?
                                    <div className="status-dropped">Dropped</div> : cabBookingDetails?.bookingStatus == 0 ?
                                        <div className="status-cancelled">Cancelled</div> : ""}</p>
                    <Row gutter={16}>
                        <Col span={8} className="user-profiles">
                            <Card bordered={true}>
                                <div className='profile-bg-img'></div>
                                <ProfileIetms>
                                    <div className='profile-user-details'>
                                        <div className='profile-user'>
                                            <img style={{ width: "100%", height: "auto" }} src={`http://${cabBookingDetails?.employee?.fileUrl}`} alt="" />
                                        </div>
                                        <h3>{cabBookingDetails?.employee?.fullName}</h3>
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={ListData}
                                            renderItem={(item) => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        // avatar={item.avatar}
                                                        avatar={item.avatar}

                                                        title={<a href="'tel:'`  `">{item.title}</a>}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                    </div>
                                </ProfileIetms>
                            </Card>
                        </Col>
                        <Col span={16} >
                            <Card>
                                <TextHeadingFirst>Basic Details</TextHeadingFirst>
                                <AllDetails>
                                    {/* <TextBox>
                                            <TextHeading>Booking Status</TextHeading>
                                            <Textdata>{cabBookingDetails?.employee?.fullName}</Textdata>
                                        </TextBox> */}
                                    <TextBox>
                                        <TextHeading>Employee Name</TextHeading>
                                        <Textdata>{cabBookingDetails?.employee?.fullName}</Textdata>
                                    </TextBox>
                                    <TextBox>
                                        <TextHeading>name</TextHeading>
                                        <Textdata>{cabBookingDetails?.employee?.fullName}</Textdata>
                                    </TextBox>
                                    <TextBox>
                                        <TextHeading>Pickup Address</TextHeading>
                                        <Textdata>{cabBookingDetails ? cabBookingDetails?.pickupAddress : 'null'}</Textdata>
                                    </TextBox>
                                    <TextBox>
                                        <TextHeading>Drop Address</TextHeading>
                                        <Textdata>{cabBookingDetails ? cabBookingDetails?.dropAddress : 'null'}</Textdata>
                                    </TextBox>
                                    <TextBox>
                                        <TextHeading>booking Date</TextHeading>
                                        <Textdata>{cabBookingDetails ? cabBookingDetails?.bookingStartdate : ''}</Textdata>
                                    </TextBox>
                                    <TextBox>
                                        <TextHeading>booking  date</TextHeading>
                                        <Textdata>{cabBookingDetails ? cabBookingDetails?.bookingEnddate : ''}</Textdata>
                                    </TextBox>
                                    <TextBox>
                                        <TextHeading>Employee Email</TextHeading>
                                        <Textdata>{cabBookingDetails ? cabBookingDetails?.employee?.email : 'null'}</Textdata>
                                    </TextBox>
                                    <TextBox>
                                        <TextHeading>Employee mobile No.</TextHeading>
                                        <Textdata>{cabBookingDetails ? cabBookingDetails?.employee?.mobileNumber : ''}</Textdata>
                                    </TextBox>
                                    <TextBox>
                                        <TextHeading>Employee Address</TextHeading>
                                        <Textdata>{cabBookingDetails ? cabBookingDetails?.employee?.address : ''}</Textdata>
                                    </TextBox>
                                    <TextBox>
                                        <TextHeading>Cab Reg. Number</TextHeading>
                                        <Textdata>{cabBookingDetails ? cabBookingDetails?.cab?.regNumber : ''}</Textdata>
                                    </TextBox>
                                    <TextBox>
                                        <TextHeading>Cab Insurance No.</TextHeading>
                                        <Textdata>{cabBookingDetails ? cabBookingDetails?.cab?.insuranceNumber : ''}</Textdata>
                                    </TextBox>
                                    <TextBox>
                                        <TextHeading>Cab Category</TextHeading>
                                        <Textdata>{cabBookingDetails ? cabBookingDetails?.category?.cabCategoryName : ''}</Textdata>
                                    </TextBox>
                                    <TextBox>
                                        <TextHeading>Cab PUC Number</TextHeading>
                                        <Textdata>{cabBookingDetails ? cabBookingDetails?.cab?.pucNumber : ''}</Textdata>
                                    </TextBox>
                                    <TextBox>
                                        <TextHeading>driver Name</TextHeading>
                                        <Textdata>{cabBookingDetails ? cabBookingDetails?.driver?.name : ''}</Textdata>
                                    </TextBox>
                                    <TextBox>
                                        <TextHeading>driver License No.</TextHeading>
                                        <Textdata>{cabBookingDetails ? cabBookingDetails?.driver?.licenseNumber : ''}</Textdata>
                                    </TextBox>
                                    <TextBox>
                                        <TextHeading>driver Mobile No.</TextHeading>
                                        <Textdata>{cabBookingDetails ? cabBookingDetails?.driver?.mobileNumber : ''}</Textdata>
                                    </TextBox>
                                    <TextBox>
                                        <TextHeading>driver Address</TextHeading>
                                        <Textdata>{cabBookingDetails ? cabBookingDetails?.name : ''}</Textdata>
                                    </TextBox>
                                    <TextBox>
                                        <TextHeading>filled Manual </TextHeading>
                                        <Textdata>{cabBookingDetails ? cabBookingDetails?.filledManual : ''}</Textdata>
                                    </TextBox>
                                    <TextBox>
                                        <TextHeading>GL Code </TextHeading>
                                        <Textdata>{cabBookingDetails ? cabBookingDetails?.glCode : ''}</Textdata>
                                    </TextBox>
                                    <TextBox>
                                        <TextHeading>Ceo Approval </TextHeading>
                                        <Textdata>{cabBookingDetails?.ceoApproval == false ? <div>False</div> : <div>True</div    >}</Textdata>
                                    </TextBox>
                                    <TextBox>
                                        <TextHeading>Usages Module </TextHeading>
                                        <Textdata>{cabBookingDetails ? cabBookingDetails?.usagesModule : ''}</Textdata>
                                    </TextBox>
                                </AllDetails>
                                {/* {res?.ceoApproval == true ? <div className="status-success" >yes</div> : <div className="status-cancelled" >No</div>} */}
                            </Card>
                        </Col>
                    </Row>
                </UserProfiles>
            </Profilepage>
        </>
    );
}
export default CabBookingData