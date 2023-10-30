import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Button, Card, Col, MenuProps, Modal, Row, Select, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useGet from 'hooks/useGet';
import { CabBooking, BookingStatus, CabRegistration, DriverDetails, CabBookingDriverChange, CabCategoryById, CompanyCabBooking, CompanycabBookingData, CompanyCabBookingStatus } from 'constants/api';
import moment from 'moment'
import { CarOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { TableContainer, ActionViewModal, ActionViewText } from 'styles/component/Table'
import usePatch from 'hooks/usePatch';
import DeleteModal from 'components/Modals/DeleteModal';
import useDelete from 'hooks/useDelete';
import { MainBoxContaint } from 'styles/views/Deshboard/Table';
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
const CabBookingInformation = (): ReactElement => {
    const { mutateAsync: updateStatus, data: updatedData } = usePatch();
    const [openDeleteModal, setDeleteModal] = useState(false)
    const [openCabSelectModal, setOpenCabSelectModal] = useState(false)
    const [openStatusChangeModal, setOpenStatusChangeModal] = useState(false)
    const [bookingId, setBookingId] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [cabNameAll, setCabNameAll] = useState([]);
    const [driverName, setDriverName] = useState<any>([]);
    const [bookingData, setBookingData] = useState([]);
    const { mutateAsync: getComapnyList } = useGet();
    const { mutateAsync: cabSelcted } = usePatch();
    const { mutateAsync: deleteCabBooking } = useDelete()
    const [isViewOpen, setIsViewOpen] = useState(false)
    const [cabData, setCabData] = useState("false")
    const [dropDownIndex, setDropDownIndex] = useState(0)
    const [id, setCabBookingId] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [driverId, setDriverId] = useState();
    const [cabRegistraionNo, setCabRegistraionNo] = useState([])
    const [cabCategoryId, setCabCategoryId] = useState();
    const [cabId, setCabId] = useState();
    const wrapperRef = useRef<any>()
    const { mutateAsync: getCabList } = useGet();
    const { mutateAsync: getCabCategoryList } = useGet();
    const history = useNavigate()
    const [confirmStatus, setConfirmStatus] = useState<any>({})
    const [pagination, setPagination] = useState<any>({
    })
    // ********local storage************
    const Role = localStorage.getItem("_role")
    const Id = localStorage.getItem("_id")
    const CabSelectPopup = (text: any) => {
        setCabCategoryId(text?.action?.category?.id)
        setCabBookingId(text.action.id)
        getCabCategoryList({
            url: CabCategoryById + "/" + text?.action?.category?.id,
            type: 'details',
            token: true
        }).then((res) => {
            setCabRegistraionNo(res)
            setOpenCabSelectModal(true)
        })
    }
    // ****************** get CAb List
    useEffect(() => {
        getCabList({
            url: CabRegistration,
            type: 'details',
            token: true
        }).then((res: any) => {
            setCabNameAll(res.items)
        })
            .catch((err: any) => {
            })
    }, [])
    // ***************get driver List
    useEffect(() => {
        getCabList({
            url: DriverDetails,
            type: 'details',
            token: true
        }).then((res: any) => {
            setDriverName(res.items)
        })
            .catch((err: any) => {
            })
    }, [])
    const [loading, setLoading] = useState(false);
    const handleTableChange = (page: any) => {
        setCurrentPage(page.current)
    }
    const selectDriver = (id: any) => {
        setDriverId(id)
    }
    const changeCabSelect = (val: any) => {
        setOpenCabSelectModal(false);
        const payload = {
            driverId,
            id,
            cabId
        }
        cabSelcted({
            url: CabBookingDriverChange,
            payload: payload,
            type: 'details',
            token: true
        }).then((res: any) => {
            fetchData()
            setDisabled(current => !current);
        })
    }
    const SelectCab = (cabId: any) => {
        setCabId(cabId)
    }
    // ***************get table List Data
    useEffect(() => {
        fetchData()
    }, [updatedData, currentPage])
    // fetchdata
    const fetchData = () => {
        setLoading(true)
        getComapnyList({
            // url: Role === "ADMIN" ? `${CabBooking}?page=${currentPage}&limit=${8}` : Role === "COMPANY" ? `${CompanyCabBooking}?page=${currentPage}&limit=${8}` : "",
            url: Role === "ADMIN" ? `${CabBooking}?page=${currentPage}&limit=${8}` : Role === "COMPANY" ? `${CompanycabBookingData}?page=${currentPage}&limit=${8}` : "",
            // url: "http://192.168.29.139:3000/api/cab/employee-id",
            // url: CompanycabBookingData,
            type: 'details',
            token: true
        }).then((res: any) => {
            const cabRes = res?.items?.map((val: any, index: number) => {
                return {
                    name: val?.employee?.fullName,
                    pickupAddress: val?.pickupAddress,
                    bookingPeriod: [val?.bookingStartdate, val?.bookingEnddate],
                    bookingEnddate: val?.bookingEnddate,
                    dropAddress: val?.dropAddress,
                    cabname: val?.cab?.name,
                    regNumber: val?.cab?.regNumber,
                    cabCategoryName: val?.category?.cabCategoryName,
                    drivername: val?.driver?.name,
                    bookingStatus: { status: val?.bookingStatus, index, id: val?.id, driverId: val?.driverId },
                    selectcab: { driverId: val?.driverId, cabNumber: val?.cab?.regNumber, cabId: val?.cabId },
                    glCode: val?.glCode,
                    ceoApproval: val?.ceoApproval,
                    filledManual: val?.filledManual,
                    usagesModule: val?.usagesModule,
                    action: val
                }
            })
            if (cabRes) {
                const pager: any = {};
                pager["current"] = res.meta.currentPage;
                pager["total"] = res.meta.totalItems
                pager["pageSize"] = res.meta.itemsPerPage
                setPagination({
                    pagination: pager
                });
                setBookingData(cabRes)
                setLoading(false)
            }
        }).catch((err: any) => {
            setLoading(false)
        })
    }
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
    const handleSelctCabe = () => {
        setOpenCabSelectModal(false);
    }
    const handleCancel = () => {
        setOpenStatusChangeModal(false);
    };
    const handleChangeStatus = () => {
        const payload = {
            id: confirmStatus?.id,
            bookingStatus: confirmStatus?.value
        }
        updateStatus({
            url: Role === "ADMIN" ? `${BookingStatus}` : Role === "COMPANY" ? `${CompanyCabBookingStatus}` : "",
            token: true,
            type: 'details',
            payload
        })
    }
    const ChangeCabStatus = (val: any) => {
        handleChangeStatus()
        setOpenStatusChangeModal(false);
    }
    // ********************* delet cab booking status change
    const deleteConfirmdeleteConfirm = () => {
        deleteCabBooking({
            url: CabBooking + bookingId,
            token: true,
            type: 'details'
        }).then(() => getComapnyList({
            url: CabBooking,
            type: 'details',
            token: true
        }).then((res: any) => {
            const cabRes = res?.items?.map((val: any, index: number) => {
                return {
                    name: val?.employee?.fullName,
                    pickupAddress: val?.pickupAddress,
                    bookingPeriod: [val?.bookingStartdate, val?.bookingEnddate],
                    bookingEnddate: val?.bookingEnddate,
                    dropAddress: val?.dropAddress,
                    cabname: val?.cab?.name,
                    regNumber: val?.cab?.regNumber,
                    drivername: val?.driver?.name,
                    bookingStatus: { status: val?.bookingStatus, index, id: val?.id, driverId: val?.driverId },
                    selectcab: { driverId: val?.driverId, cabId: val?.cabId },
                    glCode: val?.glCode,
                    ceoApproval: val?.ceoApproval,
                    filledManual: val?.filledManual,
                    usagesModule: val?.usagesModule,
                    action: val,
                }
            })
            if (cabRes)
                setBookingData(cabRes)
            fetchData()
        }).catch((error) => {
        })
        )
    }
    const ViewsDetails = (id: any, key: any) => {
        history('cab-booking/' + key.id)
        setCabData(key)
    };
    const onDeleteCabBooking = (record: any) => {
        setDeleteModal(true)
        setBookingId(record.action.id)
    }
    const newItems: MenuProps['items'] = [
        {
            key: 1,
            label: <div className="status-Pending"> Pending</div>
        },
        {
            key: 2,
            label: <div className="status-approved">Approved</div>
        },
        {
            key: 3,
            label: <div className="status-ongoing">Ongoing</div>
        },
        {
            key: 4,
            label: <div className="status-dropped">Dropped</div>
        },
        {
            key: 0,
            label: <div className="status-cancelled">Cancelled</div>
        },
    ];
    const newItemsComapny: MenuProps['items'] = [
        {
            key: 0,
            label: <div className="status-cancelled">Cancelled</div>
        },

        {
            key: 2,
            label: <div className="status-approved">Approved</div>
        },
    ]
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
        }, {
            title: 'booking period',
            dataIndex: 'bookingPeriod',
            render: (text) => {
                return (
                    <span >
                        {moment(text ? text[0] : new Date()).format("DD/MM/YYYY")} - &nbsp;
                        {moment(text ? text[1
                        ] : new Date()).format("DD/MM/YYYY")}
                    </span >)
            }
        },
        {
            title: 'Cab No.',
            dataIndex: 'regNumber',
            width: '70px',
        },
        {
            title: 'Select Cab',
            dataIndex: 'selectcab',
            render: (data, text) => {
                return (
                    data.driverId && data.cabId ? <span style={{ opacity: "0.5" }} >
                        <Button  >select cab</Button>
                    </span > : <span>
                        <Button onClick={(() => CabSelectPopup(text))} >select cab</Button>
                    </span >
                )
            }
        },
        {
            title: "cab Category",
            dataIndex: "cabCategoryName"
        },
        {
            title: 'Driver Name',
            dataIndex: 'drivername',
        },

        {
            title: 'Booking Status',
            dataIndex: 'bookingStatus',
            render: ({ status, index, id, driverId }) => {
                let item: any = newItems.filter((ele: any) => ele.key == status);
                const viewItem: any = newItems.filter((ele: any) => ele.key !== status);
                let comanyItem: any = newItemsComapny.filter((ele: any) => ele.key == status);
                const ComapnyIiewItem: any = newItemsComapny.filter((ele: any) => ele.key !== status);

                const handleUpdateValue = (val: any, id: any) => {
                    setOpenStatusChangeModal(true)
                    setConfirmStatus({
                        value: val,
                        id: id
                    })
                }
                return (
                    <>
                        {Role == "COMPANY" ? <>
                            {
                                <div className={'custom-status'}>
                                    {item.length && item[0].label}
                                    <span onClick={() => handleDropdown(index)} >  <MoreOutlined /></span>
                                    {isViewOpen && dropDownIndex === index && (
                                        <ActionViewModal ref={wrapperRef}>
                                            {ComapnyIiewItem?.map((val: any) => (
                                                <ActionViewText onClick={() => handleUpdateValue(val.key, id)}>{val?.label}</ActionViewText>
                                            ))}
                                        </ActionViewModal>
                                    )}
                                </div>
                            }
                        </> :
                            Role == "ADMIN" ?
                                <>
                                    {driverId && status !== 4 ?
                                        <div className={'custom-status'}>
                                            {item.length && item[0].label}
                                            <span onClick={() => handleDropdown(index)} >  <MoreOutlined /></span>
                                            {isViewOpen && dropDownIndex === index && (
                                                <ActionViewModal ref={wrapperRef}>
                                                    {viewItem?.map((val: any) => (
                                                        <ActionViewText onClick={() => handleUpdateValue(val.key, id)}>{val?.label}</ActionViewText>
                                                    ))}
                                                </ActionViewModal>
                                            )}
                                        </div > :
                                        <div className={'custom-status'} style={{ opacity: "0.6" }}>
                                            {item.length && item[0].label}
                                            <span>  <MoreOutlined /></span>
                                            {isViewOpen && dropDownIndex === index && (
                                                <ActionViewModal ref={wrapperRef}>
                                                    {viewItem?.map((val: any) => (
                                                        <ActionViewText onClick={() => handleUpdateValue(val.key, id)}>{val?.label}</ActionViewText>
                                                    ))}
                                                </ActionViewModal>
                                            )}
                                        </div >
                                    }
                                </>
                                : ""}

                    </>
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
        {
            title: 'Delete',
            dataIndex: '',
            width: '40px',
            render: (record) => (
                <span className=""
                    onClick={() => onDeleteCabBooking(record)}>
                    <DeleteOutlined />
                </span>)
        },
    ];
    const companycolumns: ColumnsType<DataType> = [

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
        }, {
            title: 'booking period',
            dataIndex: 'bookingPeriod',
            render: (text) => {
                return (
                    <span >
                        {moment(text ? text[0] : new Date()).format("DD/MM/YYYY")} - &nbsp;
                        {moment(text ? text[1
                        ] : new Date()).format("DD/MM/YYYY")}
                    </span >)
            }
        },
        {
            title: 'Cab No.',
            dataIndex: 'regNumber',
            width: '70px',
        },
        // {
        //     title: 'Select Cab',
        //     dataIndex: 'selectcab',
        //     render: (data, text) => {
        //         return (
        //             data.driverId && data.cabId ? <span style={{ opacity: "0.5" }} >
        //                 <Button  >select cab</Button>
        //             </span > : <span>
        //                 <Button onClick={(() => CabSelectPopup(text))} >select cab</Button>
        //             </span >
        //         )
        //     }
        // },
        {
            title: "cab Category",
            dataIndex: "cabCategoryName"
        },
        {
            title: 'Driver Name',
            dataIndex: 'drivername',
        },

        {
            title: 'Booking Status',
            dataIndex: 'bookingStatus',
            render: ({ status, index, id, driverId }) => {
                let item: any = newItems.filter((ele: any) => ele.key == status);
                const viewItem: any = newItems.filter((ele: any) => ele.key !== status);
                let comanyItem: any = newItemsComapny.filter((ele: any) => ele.key == status);
                const ComapnyIiewItem: any = newItemsComapny.filter((ele: any) => ele.key !== status);

                const handleUpdateValue = (val: any, id: any) => {
                    setOpenStatusChangeModal(true)
                    setConfirmStatus({
                        value: val,
                        id: id
                    })
                }
                return (
                    <>
                        {Role == "COMPANY" ? <>
                            {
                                <div className={'custom-status'}>
                                    {item.length && item[0].label}
                                    <span onClick={() => handleDropdown(index)} >  <MoreOutlined /></span>
                                    {isViewOpen && dropDownIndex === index && (
                                        <ActionViewModal ref={wrapperRef}>
                                            {ComapnyIiewItem?.map((val: any) => (
                                                <ActionViewText onClick={() => handleUpdateValue(val.key, id)}>{val?.label}</ActionViewText>
                                            ))}
                                        </ActionViewModal>
                                    )}
                                </div>
                            }
                        </> :
                            Role == "ADMIN" ?
                                <>
                                    {driverId && status !== 4 ?
                                        <div className={'custom-status'}>
                                            {item.length && item[0].label}
                                            <span onClick={() => handleDropdown(index)} >  <MoreOutlined /></span>
                                            {isViewOpen && dropDownIndex === index && (
                                                <ActionViewModal ref={wrapperRef}>
                                                    {viewItem?.map((val: any) => (
                                                        <ActionViewText onClick={() => handleUpdateValue(val.key, id)}>{val?.label}</ActionViewText>
                                                    ))}
                                                </ActionViewModal>
                                            )}
                                        </div > :
                                        <div className={'custom-status'} style={{ opacity: "0.6" }}>
                                            {item.length && item[0].label}
                                            <span>  <MoreOutlined /></span>
                                            {isViewOpen && dropDownIndex === index && (
                                                <ActionViewModal ref={wrapperRef}>
                                                    {viewItem?.map((val: any) => (
                                                        <ActionViewText onClick={() => handleUpdateValue(val.key, id)}>{val?.label}</ActionViewText>
                                                    ))}
                                                </ActionViewModal>
                                            )}
                                        </div >
                                    }
                                </>
                                : ""}

                    </>
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
        {
            title: 'Delete',
            dataIndex: '',
            width: '40px',
            render: (record) => (
                <span className=""
                    onClick={() => onDeleteCabBooking(record)}>
                    <DeleteOutlined />
                </span>)
        },
    ];
    const data: DataType[] = bookingData ? bookingData : [];
    return (
        <>
            <MainBoxContaint>
                <Row gutter={16}>
                    <Col span={24} lg={24} md={24}>
                        <Card bordered={true}>
                            <h4>CabBooking List</h4>
                            <TableContainer>
                                {Role == "ADMIN" ? <>  <Table
                                    columns={columns}
                                    dataSource={bookingData}
                                    loading={loading}
                                    pagination={pagination.pagination}
                                    onChange={handleTableChange}
                                /></> : Role == "COMPANY" ? <>
                                    <Table
                                        columns={companycolumns}
                                        dataSource={bookingData}
                                        loading={loading}
                                        pagination={pagination.pagination}
                                        onChange={handleTableChange}
                                    />
                                </> : ""}

                                <DeleteModal open={openDeleteModal} setOpen={setDeleteModal} deleteConfirm={deleteConfirmdeleteConfirm} title='Are you sure you want to delete this Cab Booking?' />
                                {/* <DeleteModal open={openStatusChangeModal} setOpen={setOpenStatusChangeModal} deleteConfirm={ChangeCabStatus} title='Are you sure you want to change this Cab Booking status?' /> */}
                                <Modal title="Are you sure you want to change this Cab Booking status?" open={openStatusChangeModal} onOk={ChangeCabStatus} onCancel={handleCancel}>
                                </Modal>
                                <Modal title="select Cab And Driver" open={openCabSelectModal} onOk={changeCabSelect} onCancel={handleSelctCabe}>
                                    <Row gutter={16} style={{ paddingBottom: "30px" }}>
                                        <Col span={12}>
                                            <h4>Select Cab</h4>
                                            <Space wrap className='selectCabChange'>
                                                <Select
                                                    defaultValue="Cab"
                                                    style={{ width: 150 }}
                                                    onChange={SelectCab}
                                                >
                                                    {cabRegistraionNo?.map((res: any) => {
                                                        return (
                                                            res?.isActive == false ? null :
                                                                <option value={res?.id}>  {res?.regNumber}</option>)
                                                    })}
                                                </Select>
                                            </Space>
                                        </Col>
                                        <Col span={12}>
                                            <h4>Select Cab Driver</h4>
                                            <Select
                                                defaultValue="Driver"
                                                style={{ width: 120 }}
                                                onChange={selectDriver}
                                            >
                                                {driverName?.map((data: any) => {
                                                    return (
                                                        <option value={data?.id}>{data?.name}</option>)
                                                })}
                                            </Select>
                                        </Col>
                                    </Row>
                                </Modal>
                            </TableContainer>
                        </Card>
                    </Col>
                </Row>
            </MainBoxContaint>
        </>
    )
}
export default CabBookingInformation;