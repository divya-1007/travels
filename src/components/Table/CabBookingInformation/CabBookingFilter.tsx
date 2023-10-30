import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Button, Dropdown, MenuProps, Select, Space, Table, DatePicker } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import useGet from 'hooks/useGet';
import { CabBooking, BookingStatus } from 'constants/api';
import moment from 'moment'
import { CarOutlined, MoreOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {
    TableContainer,
    ActionContainer,
    ActionText,
    ActionViewModal,
    ActionViewText,
    ActionSecondaryModal
} from 'styles/component/Table'
import usePatch from 'hooks/usePatch';
interface CabInformation {
    name: string;
    regNumber: string;
}
interface DriverInformation {
    name: string;
    licenseNumber: string;

}
interface Employee {
    id: string
    fullName: string
    role: number
    email: string
    mobileNumber: string | null
    address: string
    isVerify: boolean
}
interface DataType {
    id: any;
    key: React.Key;
    name: string;
    pickupAddress: string;
    dropAddress: string;
    pucNumber: string;
    contact_no: string;
    employee: Employee;
    bookingStatus: string;
    driver: DriverInformation;
    cab: CabInformation
}
const CabBookingInformationfilter = (): ReactElement => {
    const [statusChage, setStatusChage] = useState('')
    const { RangePicker } = DatePicker;
    const Option = Select
    const history = useNavigate()
    const ViewsDetails = (id: any, key: any) => {
        history('cab-booking/' + key.id)

    };
    const getCabId = (id: any, key: any) => {
        setBookingStatus(key.action.cabId)
    }
    const newItems: MenuProps['items'] = [
        {
            key: 1,
            label: <span className="status-Pending"> Pending</span>
        },
        {
            key: 2,
            label: <span className="status-approved">approved</span>
        },
        {
            key: 3,
            label: <span className="status-ongoing">ongoing</span>
        },
        {
            key: 4,
            label: <span className="status-dropped">dropped</span>
        },
        {
            key: 0,
            label: <span className="status-cancelled">cancelled</span>
        },
    ];
    let items: MenuProps['items'] = []
    const options = [
        { value: 1, label: 'Pending' },
        { value: 2, label: 'Approved' },
        { value: 3, label: 'Ongoing' },
        { value: 4, label: 'Dropped' },
        { value: 0, label: 'Cancelled' },
    ]
    useEffect(() => {
        cabBookingStatus({
            url: BookingStatus,
            type: 'details',
            token: true
        }).then((res: any) => {
            setBookingStatus(res)
        })
    }, [])
    const handleChangeStatus = (value: string, key: any) => {
        const values = `selected ${value}`
        setStatusChage(values)
    };
    const [isViewOpen, setIsViewOpen] = useState(false)
    const [dropDownIndex, setDropDownIndex] = useState(0)
    const wrapperRef = useRef<any>()

    useEffect(() => {
        function handleClickOutside(event: { target: any }) {
            if (wrapperRef.current && !wrapperRef.current?.contains(event?.target)) {
                setIsViewOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [wrapperRef])

    const handleDropdown = (index: any) => {
        setDropDownIndex(index)
        setIsViewOpen(true)
    }

    const columns: ColumnsType<DataType> = [

        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Pickup Address',
            dataIndex: 'pickupAddress',
        },
        {
            title: 'Drop Address',
            dataIndex: 'dropAddress',

        },
        {
            title: 'Cab Name',
            dataIndex: 'cabname',

        },
        {
            title: 'Booking Status',
            dataIndex: 'bookingStatus',
            render: ({ status, index }) => {
                let item: any = newItems.filter((ele: any) => ele.key == status);
                const viewItem: any = newItems.filter((ele: any) => ele.key !== status);
                const handleUpdateValue = (val: any) => {
                    item = newItems.filter((ele: any) => ele.key == val);
                }
                // items = viewItem
                return (
                    <span style={{ display: "flex" }}>
                        {item.length && item[0].label}
                        <span onClick={() => handleDropdown(index)} > <MoreOutlined />{isViewOpen && dropDownIndex === index && (
                            <ActionViewModal ref={wrapperRef}>
                                {viewItem?.map((val: any) => (
                                    <ActionViewText onClick={() => handleUpdateValue(val.key)}>{val?.label}</ActionViewText>
                                ))}
                            </ActionViewModal>
                        )}</span>
                        {/* <button placeholder='hhh' onClick={() => handleDropdown(index)} ></button> */}

                        {/* <Dropdown menu={{ items }} placement="bottomLeft" >
                            <span > <MoreOutlined /></span>
                        </Dropdown> */}
                    </span >
                )
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (key) => {
                return (
                    <span >
                        <Button type="primary" onClick={() => ViewsDetails(key ? key.id : '', key)}>View</Button>
                    </span >)
            }
        },
    ]; const [state, setstate] = useState([]);
    const [bookingstatus, setBookingStatus] = useState();
    const { mutateAsync: getComapnyList } = useGet();
    const { mutateAsync: cabBookingStatus } = usePatch();

    useEffect(() => {
        getComapnyList({
            url: CabBooking,
            type: 'details',
            token: true
        }).then((res: any) => {
            const cabRes = res?.map((val: any, index: number) => {
                return {
                    name: val?.employee?.fullName,
                    pickupAddress: val?.pickupAddress,
                    bookingPeriod: [val?.bookingStartdate, val?.bookingEnddate],
                    bookingEnddate: val?.bookingEnddate,
                    dropAddress: val?.dropAddress,
                    cabname: val?.cab?.name,
                    drivername: val?.cab?.driver?.name,
                    bookingStatus: { status: val?.bookingStatus, index },
                    //  == 3 ? 'ongoing' : val?.bookingStatus == 1 ? 'pending' : val?.bookingStatus == 2 ? 'approved' : val?.bookingStatus == 4 ? 'dropped' : 'cancelled',
                    action: val
                }
            })
            setstate(cabRes)
        }).catch((err: any) => {
        })
    }, [])
    const data: DataType[] = state ? state : [];
    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    };

    return (
        <>
            <TableContainer>

                <Space direction="vertical" size={12}>
                    <RangePicker picker="month" />
                </Space>
                <Table
                    columns={columns}
                    dataSource={state}
                    onChange={onChange} />
            </TableContainer>
        </>
    )
}
export default CabBookingInformationfilter;
