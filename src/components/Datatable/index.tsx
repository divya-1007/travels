import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useGet from 'hooks/useGet';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import DeleteModal from 'components/Modals/DeleteModal';
import useDelete from 'hooks/useDelete';
import { CompanyEmployee, EmployeeRegistration, OtpEmailVerify, ResendEmailVerify, CompanyEmployeeData, CompanyEmployeeallData } from 'constants/api';
import { useNavigate } from 'react-router-dom';
import usePost from 'hooks/usePost';
interface DataType {
    isVerify: boolean;
    fullName: string;
    email: string;
    mobileNumber: number;
    company: string;
    key: React.Key;
}
const DataTable: React.FC = () => {
    const [state, setState] = useState([]);
    const [openDeleteModal, setDeleteModal] = useState(false)
    const [employeeId, setEmployeeId] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const { mutateAsync: EmployeeList } = useGet();
    const { mutateAsync: deleteEmployee } = useDelete();
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [otp, setOtp] = useState("");
    const { mutateAsync: OtpVarifiy } = usePost();
    const [emailVrification, setEmailVrification] = useState("")
    const [pagination, setPagination] = useState<any>({})
    const Role = localStorage.getItem("_role")
    const id = localStorage.getItem("_id")
    const history = useNavigate()
    // ************* route to employe data by id
    const ViewsDetails = (id: any) => {
        history('/list/employee-data/' + id)
    };
    const renderCustomCell = (object: any) => {
        const name = object?.company?.name;
        return name;
    };
    const handleTableChange = (page: any) => {
        setCurrentPage(page.current)
    }
    useEffect(() => {
        fetchData()
    }, [currentPage])
    // *******************OTP Verify api *************
    const otpEmailVerification = () => {
        const payloads = {
            otp
        }
        OtpVarifiy({
            url: OtpEmailVerify,
            type: 'details',
            payload: payloads,
            token: true,
        }).then((otpRes) => {
            if (otpRes) setIsModalOpen(false);
            fetchData()
        })
    }
    // *******************again otp Verify api *************
    const varifyNow = (res: any) => {
        setEmailVrification(res.email)
        setIsModalOpen(true)
        const payloads = {
            email: res.email
        }
        OtpVarifiy({
            url: ResendEmailVerify,
            type: 'details',
            payload: payloads,
        }).then((otpRes) => {
        })
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    // *******************EmployeeAllInformation All Data show*************
    const fetchData = () => {
        setLoading(true)
        EmployeeList({
            // url: `${CompanyEmployee}?page=${currentPage}&limit=${7}`,
            url: Role === "ADMIN" ? `${EmployeeRegistration}?page=${currentPage}&limit=${8}` : Role === "COMPANY" ? `${CompanyEmployee}?page=${currentPage}&limit=${8}` : "",
            type: 'details',
            token: true
        }).then((res: any) => {
            if (res) {
                const pager: any = {};
                pager["current"] = res?.meta?.currentPage;
                pager["total"] = res?.meta?.totalItems
                pager["pageSize"] = res?.meta?.itemsPerPage
                setPagination({ pagination: pager });
            }
            setState(res.items ? res.items : res?.[0]?.employees)
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }
    const onDelete = (key: any) => {
        setDeleteModal(true)
        setEmployeeId(key)
    }
    // *******************Employee Delete api*************
    const deleteConfirmdeleteConfirm = () => {
        deleteEmployee({
            url: EmployeeRegistration + employeeId,
            token: true,
            type: 'details'
        }).then(() => EmployeeList({
            url: EmployeeRegistration,
            type: 'details',
            token: true
        }).then((res: any) => {
            setState(res?.items)
            fetchData()
        })
        )
    }
    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email ',
            dataIndex: 'email',
        },
        {
            title: 'Mobile No. ',
            dataIndex: 'mobileNumber',
        },
        {
            title: 'Verify',
            dataIndex: 'isVerify',
            width: '100px',
            render: (status, res) => {
                return (
                    <>
                        {status ? <div className="status-success" >
                            Verify
                            {/* <img src={IsVarify} style={{ width: "20px" }} /> */}
                        </div> : <div className="status-cancelled" style={{ padding: "6px 9px" }}>
                            <div onClick={() => varifyNow(res)}>Verify Now</div>
                            {/* <img src={NotVarify} style={{ width: "20px" }} /> */}
                        </div>}
                        {/* <span className="">
                            <Avatar shape="square" icon={<UserOutlined />} />
                        </span> */}
                    </>)
            }
        },
        {
            title: 'edit',
            dataIndex: '',
            width: '40px',
            render: (key) => (
                <span className="" >
                    <EditOutlined onClick={() => ViewsDetails(key ? key.id : '')} />
                </span>
            )
        },
        {
            title: 'Delete',
            dataIndex: '',
            width: '40px',
            render: (record) => (
                <span className=""
                    onClick={() => onDelete(record.id)}>
                    <DeleteOutlined />
                </span>)
        },
    ];
    const data: DataType[] = state ? state : []
    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                pagination={pagination.pagination}
                onChange={handleTableChange}
            />
            <DeleteModal open={openDeleteModal} setOpen={setDeleteModal} deleteConfirm={deleteConfirmdeleteConfirm} title='Are you sure you want to delete this employee?' />
            <Modal className='OtpVerification' title='Verify Account' open={isModalOpen} onCancel={handleCancel}>
                <p>An OTP has been sent to your entered email <b>{emailVrification}</b></p>
                <h5>Enter your Code here</h5>
                <Input type='number' placeholder='OTP' value={otp} onChange={(e) => setOtp(e.target.value)} />
                {/* <p> Didn't receive the code? </p>
                <h5 >Resend OTP</h5> */}
                <Button style={{ marginTop: "20px" }} onClick={otpEmailVerification}>Verify</Button>
            </Modal>
        </>
    )
}
export default DataTable;