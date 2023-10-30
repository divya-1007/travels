import XLSX, { read, utils, writeFile } from 'xlsx';
import React, { ReactElement, useEffect, useState } from 'react';
import { Card, Col, Row, Table, message } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import useGet from 'hooks/useGet';
import { CabDelete, CabRegistration } from 'constants/api';
import DeleteModal from 'components/Modals/DeleteModal';
import useDelete from 'hooks/useDelete';
import { CarOutlined, CloudDownloadOutlined, CloudUploadOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import usePatch from 'hooks/usePatch';
import { useParams } from 'react-router-dom';
import usePost from 'hooks/usePost';
// import ExcelExamle from "assets/files/example.xlsx";

interface Category {
    id: string;
    cabCategoryName: string;
    fileName: string;
}
interface DataType {
    key: React.Key;
    name: string;
    regNumber: string;
    insuranceNumber: string;
    pucNumber: string;
    Contact_no: string;
    isActive: any;
    category: Category;
}
const TableComponentCab = (): ReactElement => {
    const [openDeleteModal, setDeleteModal] = useState(false)
    const [activeCab, setActiveCab] = useState(false)
    const [cabId, setCabId] = useState('')
    const { mutateAsync: deleteCab } = useDelete()
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false);
    const { mutateAsync: CabUpdate } = usePatch()
    const [importExcelFileData, setImportExcelFileData] = useState<any>()
    const params = useParams();
    const { mutateAsync: Cab } = usePost();
    const [regNumber, setRegNumber] = useState("");
    const [name, setName] = useState("");
    const [messageApi, contextHolder] = message.useMessage();

    // ************download excelsheet
    const sheetData = [{ cabCategoryName: '', regNumber: '', pucNumber: "", insuranceNumber: "" }]

    const handleTemplateDownload = () => {
        const wb = utils.book_new()
        const ws = utils.json_to_sheet(sheetData)

        utils.book_append_sheet(wb, ws, 'MySheet')
        writeFile(wb, 'CAB Details.xlsx')
    }
    // *************************excelsheet upload
    const excelSheetupload = async (e: any) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
            // header: 1,
            defval: "",
        });

        setImportExcelFileData(jsonData)
    }
    const excelSheetupdate = () => {
        // const payloads = {
        //     importExcelFileData
        // }
        Cab({
            url: CabRegistration,
            type: 'details',
            token: true,
            payload: importExcelFileData,
        }).then((res) => {
            messageApi.open({
                type: 'success',
                content: 'Successfully Register',
            });
            // form.resetFields();
        })
            .catch((err: any) => {
                messageApi.open({
                    type: 'error',
                    content: 'something went wrong',
                });
                // setShowError(true)
            })
    }

    // ****************************************
    const [pagination, setPagination] = useState<any>({
    })
    const onDelete = (res: any, key: any) => {
        setDeleteModal(true)
        setCabId(key)
    }
    const changeCabStatus = (status: boolean, id: number) => {
        const payload = {
            isActive: status,
            id: id
        }
        CabUpdate({
            url: CabRegistration,
            type: 'details',
            payload: payload,
            token: true
        }).then((result) => {
            fetchData()
        })
    }
    const handleTableChange = (page: any) => {
        setCurrentPage(page.current)
    }
    useEffect(() => {
        fetchData()
    }, [currentPage])
    const fetchData = () => {
        setLoading(true)

        getComapnyList({
            url: `${CabRegistration}?page=${currentPage}&limit=${8}`,
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
            setTabledata(res.items)
            setLoading(false)
        }).catch((err: any) => {
            setLoading(false)

        })

    }
    const [tableData, setTabledata] = useState([]);
    const { mutateAsync: getComapnyList } = useGet();

    // useEffect(() => {
    //     getComapnyList({
    //         url: CabRegistration,
    //         type: 'details',
    //         token: true
    //     }).then((res: any) => {
    //         setTabledata(res.items)
    //     }).catch((err: any) => {
    //     })
    // }, [])

    const deleteConfirmdeleteConfirm = () => {
        deleteCab({
            url: CabDelete + cabId,
            token: true,
            type: 'details'
        }).then(() => getComapnyList({
            url: CabRegistration,
            type: 'details',
            token: true
        }).then((res: any) => {
            setTabledata(res.items)
            fetchData()
        })
        )
    }

    const columns: ColumnsType<DataType> = [
        {
            title: '',
            dataIndex: '',
            width: '40px',
            render: (record) => {
                return (
                    <span className="">
                        <CarOutlined />
                    </span>)
            }
        },
        {
            title: 'Name',
            dataIndex: '',
            render: (record) => {
                return (
                    <span className="">
                        {record?.category?.cabCategoryName ? record?.category?.cabCategoryName : ""}
                    </span>)
            }

        },
        {
            title: 'Reg. Number',
            dataIndex: 'regNumber',
        },
        {
            title: 'Insurance Number',
            dataIndex: 'insuranceNumber',

        },
        {
            title: ' PUC Number',
            dataIndex: 'pucNumber',

        },
        // {
        //     title: 'Contact_no',
        //     dataIndex: 'Contact_no',
        // },
        {
            title: 'status',
            dataIndex: "",
            render: (record) => { return record?.isActive == true ? <> <div className='status-success' onClick={() => changeCabStatus(!record, record?.id)}>Active</div></> : record?.isActive == false ? <div onClick={() => changeCabStatus(!record?.isActive, record?.id)} className='status-cancelled'>In-Active</div> : ""; }
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
    const data: DataType[] = tableData ? tableData : [];
    return (
        <>
            {contextHolder}
            <Row gutter={16}>
                <Col span={24} lg={24} md={24}>
                    <div className='excel-sheet-upadate'>
                        <form>
                            <label>Upload CAB Excel Sheet</label>
                            <br />
                            <div style={{ display: "flex" }}>
                                <div className='excel-sheet-input'>
                                    <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={(e) => excelSheetupload(e)} />
                                    <CloudUploadOutlined style={{
                                        fontSize: "25px", position: "absolute",
                                        left: "35px",
                                        top: "12px"
                                    }} />
                                </div>
                                {/* <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={(e) => excelSheetupload(e)} /> */}
                                <button type='button' onClick={() => excelSheetupdate()}>Submit</button>
                            </div>
                        </form>
                        <div style={{ textAlign: "center" }}>
                            {/* <label>Download Example</label> */}
                            <br />
                            <button className="btn btn-primary dashboardButton"
                                onClick={() => handleTemplateDownload()}>Download Example<CloudDownloadOutlined style={{ marginLeft: "10px", fontSize: "15px" }} /></button>
                            {/* <ExportExcel excelData={ExcelExportData} fileName={"Excel Export"} /> */}

                        </div>
                    </div>
                    <Card bordered={true}>
                        <Table
                            columns={columns}
                            dataSource={data}
                            loading={loading}
                            pagination={pagination.pagination}
                            onChange={handleTableChange}
                        />
                        <DeleteModal open={openDeleteModal} setOpen={setDeleteModal} deleteConfirm={deleteConfirmdeleteConfirm} title='Are you sure you want to delete this Cab?' />
                        <DeleteModal open={openDeleteModal} setOpen={setDeleteModal} deleteConfirm={deleteConfirmdeleteConfirm} title='Are you sure you want to delete this Cab?' />

                    </Card>
                </Col>
            </Row>


        </>
    )
}
export default TableComponentCab;
