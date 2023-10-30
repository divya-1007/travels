import React, { ReactNode, useEffect, useState } from 'react';
// import './index.css';
import { Button, Switch, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { CompanyDetatils } from 'constants/api';
import useGet from 'hooks/useGet';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import useDelete from 'hooks/useDelete';
import { UserDetailsRoute } from 'constants/routes';
import { useNavigate } from 'react-router-dom';
import DeleteModal from 'components/Modals/DeleteModal';
import { ComapnyRegistration } from 'constants/api';

interface DataType {
    key: any;
    name: string;
    supportEmail: string;
    domain: string;
    icon?: ReactNode;
}
const TableComponent: React.FC = () => {
    const [state, setstate] = useState([]);
    const history = useNavigate()
    const { mutateAsync: getComapnyList } = useGet();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)
    const [openDeleteModal, setDeleteModal] = useState(false)
    const [companyId, setCaompanyId] = useState(false)
    const { mutateAsync: deleteComapny } = useDelete()
    const [pagination, setPagination] = useState<any>({})
    const handleTableChange = (page: any) => {
        setCurrentPage(page.current)
    }
    const onDelete = (res: any, key: any) => {
        setDeleteModal(true)
        setCaompanyId(key)
    }
    useEffect(() => {
        fetchData()
    }, [currentPage])

    const deleteConfirmdeleteConfirm = () => {
        deleteComapny({
            url: ComapnyRegistration + "/" + companyId,
            token: true,
            type: 'details'
        }).then(() => {
            fetchData()
        })
    }



    // *******************companyAllInformation All Data show*************
    const fetchData = () => {
        setLoading(true)
        getComapnyList({
            url: `${CompanyDetatils}?page=${currentPage}&limit=${8}`,
            type: 'details',
            token: true
        }).then((res: any) => {
            if (res) {
                const pager: any = {};
                pager["current"] = res.meta.currentPage;
                pager["total"] = res.meta.totalItems
                pager["pageSize"] = res.meta.itemsPerPage
                setPagination({
                    pagination: pager
                });
            }
            setstate(res.items)
            setLoading(false)

        }).catch((err: any) => {
            setLoading(false)

        })
    }
    const onChanges = (checked: boolean) => {
    };
    useEffect(() => {
        // getComapnyList({

        //     url: `${CompanyDetatils}?page=${currentPage}&limit=${7}`,
        //     type: 'details',
        //     token: true
        // }).then((res: any) => {
        //     setstate(res.items)
        // }).catch((err: any) => {

        // })
    }, [])


    const ViewsDetails = (id: any) => {
        history('user-details/' + id)
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Company Name',
            dataIndex: 'name',

        },
        {
            title: 'Company Domain',
            dataIndex: 'domain',
        },

        {
            title: 'Support Email',
            dataIndex: 'supportEmail',

        },
        // {
        //     title: 'status',
        //     dataIndex: '',
        //     width: '40px',

        //     render: (text, record) => (
        //         <span className="" >
        //             <Switch defaultChecked onChange={onChanges} />
        //         </span>
        //     )

        // },



        {
            title: 'Action',
            dataIndex: 'action',
            render: (key, record: any) => {
                return (
                    <div >
                        <Button type="primary" onClick={() => ViewsDetails(record ? record.id : '')} >View</Button>
                    </div >)
            }
        },
        {
            title: 'Delete',
            dataIndex: '',
            width: '40px',
            render: (record) => (
                <span className=""
                    onClick={() => onDelete(record, record.id)}>
                    <DeleteOutlined />
                </span>)
        },
    ];

    const data: DataType[] = state ? state : [];



    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                pagination={pagination.pagination}
                onChange={handleTableChange}
            />
            <DeleteModal open={openDeleteModal} setOpen={setDeleteModal} deleteConfirm={deleteConfirmdeleteConfirm} title='Are you sure you want to delete this Company?' />

        </>
    )
}
export default TableComponent;
