import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Button, Card, Col, DatePicker, MenuProps, Modal, Row, Select, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useGet from 'hooks/useGet';
import { CabBooking, BookingStatus, CabRegistration, EmployeeRegistration, DriverDetails, CabBookingDriverChange, ComapnyRegistration, CabCategoryById, CompanycabBookingData, CompanycabBookingDataFilter, CompanyEmployee } from 'constants/api';
import moment from 'moment'
import { CarOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { TableContainer, ActionViewModal, ActionViewText } from 'styles/component/Table'
import usePatch from 'hooks/usePatch';
import DeleteModal from 'components/Modals/DeleteModal';
import useDelete from 'hooks/useDelete';
import { MainBoxContainer } from 'styles/views/Deshboard';
import { ReportSection } from 'styles/views/Deshboard/Report';
import { SubHeading } from 'styles/views/Deshboard/Profile';
import { CabCategory } from 'constants/api';
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
const CabBookingReport = (): ReactElement => {
    // ***************************
    const { mutateAsync: updateStatus, data: updatedData } = usePatch();
    const [openDeleteModal, setDeleteModal] = useState(false)
    const [openCabSelectModal, setOpenCabSelectModal] = useState(false)
    const [openStatusChangeModal, setOpenStatusChangeModal] = useState(false)
    const [bookingId, setBookingId] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [cabNameAll, setCabNameAll] = useState([]);
    const [driverName, setDriverName] = useState<any>([]);
    const [bookingData, setBookingData] = useState([]);
    // const [bookingstatus, setBookingStatus] = useState();
    const { mutateAsync: getComapnyList } = useGet();
    const { mutateAsync: cabSelcted } = usePatch();
    const { mutateAsync: deleteCabBooking } = useDelete()
    const [isViewOpen, setIsViewOpen] = useState(false)
    const [cabData, setCabData] = useState("false")
    const [dropDownIndex, setDropDownIndex] = useState(0)
    const [id, setCabBookingId] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [cabCategoryId, setCabCategoryId] = useState();
    const [companyID, setCompanyID] = useState();
    const [driverId, setDriverId] = useState();
    const [dataFilterByCabName, setDataFilterByCabName] = useState<any>([])
    const [dataFilterByEmployeeName, setDataFilterByEmployeeName] = useState<any>([])
    const [cabId, setCabId] = useState();
    const { mutateAsync: getCabCategoryList } = useGet();
    const wrapperRef = useRef<any>()
    const [fullName, setFullName] = useState([]);
    const [employeeID, setEmployeeID] = useState([]);

    const [cabName, setCabName] = useState([]);
    const { mutateAsync: getCabList } = useGet();
    const { mutateAsync: getEmployeeList } = useGet();
    const history = useNavigate()
    const [companyName, setCompanyName] = useState([]);
    const [companyNameId, setCompanyNameId] = useState("");
    const [confirmStatus, setConfirmStatus] = useState<any>({})
    const { mutateAsync: CabNameListFilter } = useGet()
    const { mutateAsync: EmployeeNameListFilter } = useGet()
    const [filtercabName, setFiltercabName] = useState("");
    const [filterEmployeeName, setFilterEmployeeName] = useState("");
    const [filterByStartdate, setFilterByStartdate] = useState("");
    const [filterByEndDate, setFilterByEndDate] = useState("");
    const [cabRegistraionNo, setCabRegistraionNo] = useState([])
    const { RangePicker } = DatePicker;
    // ***************************
    // ************ Api For == Cab List/ Employee List/ company List use in select ***************
    // ***************************
    const role = localStorage.getItem('_role')
    const Role = localStorage.getItem("_role")
    useEffect(() => {
        getCabList({
            url: CabCategory,
            type: 'details',
            token: true
        }).then((res: any) => {
            setCabName(res)
        }).catch((err: any) => {
        })
    }, [])
    useEffect(() => {
        getEmployeeList({
            url: Role == "ADMIN" ? `${EmployeeRegistration}` : Role === "COMPANY" ? `${CompanyEmployee}` : "",
            type: 'details',
            token: true
        }).then((res: any) => {
            setFullName(res.items)
            setEmployeeID(res.items.id)
        }).catch((err: any) => {
        })
    }, [])
    useEffect(() => {
        getComapnyList({
            url: ComapnyRegistration,
            type: 'details',
            token: true
        }).then((res: any) => {
            if (res)
                setCompanyName(res.items)
        }).catch((err: any) => {
        })
    }, [])
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
    useEffect(() => {
        if (dataFilterByCabName?.items) {
            const cabRes = dataFilterByCabName?.items.map((val: any, index: number) => {
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
                    selectcab: { driverId: val?.driverId, cabNumber: val?.cab?.regNumber },
                    glCode: val?.glCode,
                    ceoApproval: val?.ceoApproval,
                    filledManual: val?.filledManual,
                    usagesModule: val?.usagesModule,
                    action: val,
                    // drivername: val?.driver?.name,
                    // bookingStatus: { status: val?.bookingStatus, index, id: val?.id, driverId: val?.driverId },
                    // action: val
                }
            })
            if (cabRes) {
                const pager: any = {};
                pager["current"] = dataFilterByCabName.meta.currentPage;
                pager["total"] = dataFilterByCabName.meta.totalItems
                pager["pageSize"] = dataFilterByCabName.meta.itemsPerPage
                setPagination({
                    pagination: pager
                });
                setBookingData(cabRes)
                setLoading(false)
            }
        } if (dataFilterByEmployeeName?.items) {
            const cabRes = dataFilterByEmployeeName?.items.map((val: any, index: number) => {
                return {
                    name: val?.employee?.fullName,
                    pickupAddress: val?.pickupAddress,
                    bookingPeriod: [val?.bookingStartdate, val?.bookingEnddate],
                    bookingEnddate: val?.bookingEnddate,
                    dropAddress: val?.dropAddress,
                    cabCategoryName: val?.category?.cabCategoryName,
                    regNumber: val?.cab?.regNumber,
                    cabname: val?.cab?.name,
                    bookingStatus: { status: val?.bookingStatus, index, id: val?.id, driverId: val?.driverId },
                    selectcab: { driverId: val?.driverId, cabNumber: val?.cab?.regNumber },
                    glCode: val?.glCode,
                    ceoApproval: val?.ceoApproval,
                    filledManual: val?.filledManual,
                    usagesModule: val?.usagesModule,
                    action: val,
                    drivername: val?.driver?.name,
                    // bookingStatus: { status: val?.bookingStatus, index, id: val?.id, driverId: val?.driverId },
                    // action: val
                }
            })
            if (cabRes) {
                const pager: any = {};
                pager["current"] = dataFilterByEmployeeName.meta.currentPage;
                pager["total"] = dataFilterByEmployeeName.meta.totalItems
                pager["pageSize"] = dataFilterByEmployeeName.meta.itemsPerPage
                setPagination({
                    pagination: pager
                });
                setBookingData(cabRes)
                setLoading(false)
            }
        }
    }, [dataFilterByCabName, dataFilterByEmployeeName])
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
    // ***************************************
    // ***************************************
    // ***************************************
    const companyNameFilter = (value: string) => {
        CabNameListFilter({
            url: `${CabBooking}?companyName=${value}&page=${1}&limit=${8}`,
            type: 'details',
            token: true
        })
            .then((result) => {
            })
    }
    // *****************************
    // *****************************
    // *****************************
    const setStartDate = (date: any) => {
        const startDate = `${date[0].$y}/${date[0].$M + 1}/${date[0].$D}`;
        const endDate = `${date[1].$y}/${date[1].$M + 1}/${date[1].$D}`;
        setFilterByEndDate(endDate);
        setFilterByStartdate(startDate)
    }
    // *************************
    const EmployeeNameList = (value: string) => {
        setFilterEmployeeName(value)
    }
    // ************************ Filter Api Call data filter***************
    const searchFilter = () => {
        CabNameListFilter({
            url: Role === "ADMIN" ? `${CabBooking}?categoryId=${filtercabName}&companyName=${companyNameId}&fullName=${filterEmployeeName}&bookingStartDate=${filterByStartdate}&bookingEndDate=${filterByEndDate}&page=${1}&limit=${10}` :
                Role === "COMPANY" ? `${CompanycabBookingDataFilter}?categoryId=${filtercabName}&companyName=${companyNameId}&fullName=${filterEmployeeName}&bookingStartDate=${filterByStartdate}&bookingEndDate=${filterByEndDate}&page=${1}&limit=${10}`
                    : "",
            //  ${CabBooking}?categoryId=${filtercabName}&companyName=${companyNameId}&fullName=${filterEmployeeName}&bookingStartDate=${filterByStartdate}&bookingEndDate=${filterByEndDate}&page=${1}&limit=${10}
            // url: `${CabBooking}?categoryId=${filtercabName}&companyName=${companyNameId}&fullName=${filterEmployeeName}&bookingStartDate=${filterByStartdate}&bookingEndDate=${filterByEndDate}&page=${1}&limit=${10}`,
            type: 'details',
            token: true
        })
            .then((result) => {
                setDataFilterByCabName(result)
            })
    }
    // ******************
    const cabListFilter = (value: string) => {
        setFiltercabName(value)
    }
    const companyListFilter = (value: string) => {
        setCompanyNameId(value)
    }
    const [pagination, setPagination] = useState<any>({
    })
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
    ////fetchdata
    const fetchData = () => {
        setLoading(true)
        getComapnyList({
            url: Role === "ADMIN" ? `${CabBooking}?categoryId=${filtercabName}&fullName=${filterEmployeeName}&bookingStartDate=${filterByStartdate}&bookingEndDate=${filterByEndDate}&page=${currentPage}&limit=${8}` : Role === "COMPANY" ? `${CompanycabBookingData}?categoryId=${filtercabName}&fullName=${filterEmployeeName}&bookingStartDate=${filterByStartdate}&bookingEndDate=${filterByEndDate}&page=${currentPage}&limit=${8}` : "",
            // url: `${CabBooking}?categoryId=${filtercabName}&fullName=${filterEmployeeName}&bookingStartDate=${filterByStartdate}&bookingEndDate=${filterByEndDate}&page=${currentPage}&limit=${10}`,
            // url: `${CabBooking}?categoryId=${filtercabName}&fullName=${filterEmployeeName}&startDate=${filterByStartdate}&endDate=${filterByEndDate}&page=${currentPage}&limit=${10}`,
            type: 'details',
            token: true
        }).then((res: any) => {
            const cabRes = res?.items.map((val: any, index: number) => {
                return {
                    name: val?.employee?.fullName,
                    pickupAddress: val?.pickupAddress,
                    bookingPeriod: [val?.bookingStartdate, val?.bookingEnddate],
                    bookingEnddate: val?.bookingEnddate,
                    dropAddress: val?.dropAddress,
                    cabname: val?.cab?.name,
                    cabCategoryName: val?.category?.cabCategoryName,
                    regNumber: val?.cab?.regNumber,
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
            url: BookingStatus,
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
            const cabRes = res?.items.map((val: any, index: number) => {
                return {
                    name: val?.employee?.fullName,
                    pickupAddress: val?.pickupAddress,
                    bookingPeriod: [val?.bookingStartdate, val?.bookingEnddate],
                    bookingEnddate: val?.bookingEnddate,
                    dropAddress: val?.dropAddress,
                    cabname: val?.cab?.name,
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
            if (cabRes)
                setBookingData(cabRes)
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
            title: '',
            dataIndex: '',
            width: '40px',
            render: () => (
                <span className="">
                    <CarOutlined />
                </span>)
        },
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
        },
        // { Role== "ADMIN" ? <></> : "" },
        {
            title: 'Select Cab',
            dataIndex: 'selectcab',
            render: (data, text) => {
                return (
                    data.driverId && data.cabId ? <span style={{ opacity: "0.5" }} >
                        <Button >selct cab</Button>
                    </span > : <span>
                        <Button onClick={(() => CabSelectPopup(text))} >selct cab</Button>
                    </span >
                    //  {driverId? <></>:<></>}
                )
            }
            // render: (text) => {
            //     return (
            //         <span >
            //             <Button onClick={(() => CabSelectPopup(text))} >selct cab</Button>
            //         </span >)
            // }
        },
        {
            title: "cab Category",
            dataIndex: "cabCategoryName"
        },
        {
            title: 'Driver Name',
            dataIndex: 'drivername',
        },
        // {
        //     title: 'Booking Status',
        //     dataIndex: 'bookingStatus',
        //     render: ({ status, index, id, driverId }) => {
        //         let item: any = newItems.filter((ele: any) => ele.key == status);
        //         const viewItem: any = newItems.filter((ele: any) => ele.key !== status);
        //         const handleUpdateValue = (val: any, id: any) => {
        //             setOpenStatusChangeModal(true)
        //             setConfirmStatus({
        //                 value: val,
        //                 id: id
        //             })
        //         }
        //         return (
        //             <>
        //                 {driverId && status !== 4 ?
        //                     <div className={'custom-status'}>
        //                         {item.length && item[0].label}
        //                         <span onClick={() => handleDropdown(index)} >  <MoreOutlined /></span>
        //                         {isViewOpen && dropDownIndex === index && (
        //                             <ActionViewModal ref={wrapperRef}>
        //                                 {viewItem?.map((val: any) => (
        //                                     <ActionViewText onClick={() => handleUpdateValue(val.key, id)}>{val?.label}</ActionViewText>
        //                                 ))}
        //                             </ActionViewModal>
        //                         )}
        //                     </div > :
        //                     <div className={'custom-status'} style={{ opacity: "0.6" }}>
        //                         {item.length && item[0].label}
        //                         <span>  <MoreOutlined /></span>
        //                         {isViewOpen && dropDownIndex === index && (
        //                             <ActionViewModal ref={wrapperRef}>
        //                                 {viewItem?.map((val: any) => (
        //                                     <ActionViewText onClick={() => handleUpdateValue(val.key, id)}>{val?.label}</ActionViewText>
        //                                 ))}
        //                             </ActionViewModal>
        //                         )}
        //                     </div >
        //                 }
        //             </>
        //         )
        //     }
        // },
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
            title: '',
            dataIndex: '',
            width: '40px',
            render: () => (
                <span className="">
                    <CarOutlined />
                </span>)
        },
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

    const data: DataType[] = bookingData ? bookingData : [];
    return (
        <>
            <MainBoxContainer>
                <ReportSection style={{ marginBottom: "20px" }}>
                    <SubHeading>Report</SubHeading>
                    <Row gutter={16} style={{ placeItems: "center" }}>
                        {/* <Col span={6} md={6} sm={12} xs={24}>
                            <Card bordered={true}>
                                <div>company Name</div>
                                <Space wrap>
                                    <Select
                                        defaultValue="company"
                                        style={{ width: 150 }}
                                        onChange={companyNameFilter}
                                    >
                                        {companyName.map((res: any) => {
                                            return (
                                                <option value={res?.name}>{res?.name}</option>)
                                        })}
                                    </Select>
                                </Space>
                            </Card>
                        </Col> */}
                        <Col span={6} md={6} sm={12} xs={24}>
                            <Card bordered={true}>
                                <div>Date Select</div>
                                <Space direction="vertical" size={12}>
                                    <RangePicker onChange={setStartDate} />
                                </Space>
                            </Card>
                        </Col>
                        <Col span={6} md={6} sm={12} xs={24}>
                            <Card bordered={true}>
                                <div>Cab List</div>
                                <Space wrap>
                                    <Select
                                        defaultValue="Cab"
                                        style={{ width: 150 }}
                                        onChange={cabListFilter}
                                    >
                                        {cabName?.map((res: any) => {
                                            return (
                                                <option key={res.id} value={res?.id}>{res?.cabCategoryName}</option>)
                                        })}
                                    </Select>
                                </Space>
                            </Card>
                        </Col>
                        {role == "ADMIN" ? <Col span={6} md={6} sm={12} xs={24}>
                            <Card bordered={true}>
                                <div>Company List</div>
                                <Space wrap>
                                    <Select
                                        defaultValue="company"
                                        style={{ width: 150 }}
                                        onChange={companyListFilter}
                                    >
                                        {companyName?.map((res: any) => {
                                            return (
                                                <option key={res.id} value={res?.name}>{res?.name}</option>)
                                        })}
                                    </Select>
                                </Space>
                            </Card>
                        </Col> : ""}
                        <Col span={6} md={6} sm={12} xs={24}>
                            <Card bordered={true}>
                                <div>Employee Name</div>
                                <Space wrap>
                                    <Select
                                        mode="tags"
                                        style={{ width: '100%' }}
                                        placeholder="Tags Mode"
                                        onChange={EmployeeNameList}
                                    >
                                        {fullName?.map((res: any) => {
                                            return (
                                                <option key={res.id} value={res?.fullName}>{res?.fullName}</option>)
                                        })}
                                    </Select>
                                    {/* <Select
                                    mode="multiple"
                                    placeholder="Inserted are removed"
                                    value={selectedItems}
                                    onChange={setSelectedItems}
                                    style={{ width: '100%' }}
                                    options={filteredOptions.map((item) => ({
                                        value: item,
                                        label: item,
                                    }))}
                                >
                                </Select> */}
                                </Space>
                            </Card>
                        </Col>
                        <Col span={6} md={6} sm={12} xs={24} style={{ paddingTop: "10px" }}>
                            <Space direction="vertical" size={12}>
                                <Button onClick={searchFilter} className="searchFilter">Search</Button>
                            </Space>
                        </Col>
                    </Row>
                </ReportSection>
                <TableContainer>
                    {/* <Table
                        columns={columns}
                        dataSource={bookingData}
                        loading={loading}
                        pagination={pagination.pagination}
                        onChange={handleTableChange}
                    /> */}
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
                                <Space wrap>
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
            </MainBoxContainer>
        </>
    )
}
export default CabBookingReport;
// export default CabBookingReport;