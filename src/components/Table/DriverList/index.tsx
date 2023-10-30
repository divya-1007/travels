import XLSX, { read, utils, writeFile } from 'xlsx';
import { ReactElement, useEffect, useState } from 'react';
import { Card, Col, Row, Table, message } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import useGet from 'hooks/useGet';
import { DriverDetails } from 'constants/api';
import { CloudDownloadOutlined, CloudUploadOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import usePost from 'hooks/usePost';
import { MainBoxContaint } from 'styles/views/Deshboard/Table';

interface DataType {
    name: string;
    regNumber: string;
    licenseNumber: string;
    address: string;
    mobileNumber: string;
}
const AllDriverList = (): ReactElement => {
    const [state, setState] = useState();
    const { mutateAsync: DriverDtails } = useGet();
    const [currentPage, setCurrentPage] = useState(1)
    const { mutateAsync: driver } = usePost();

    const [importExcelFileData, setImportExcelFileData] = useState<any>()
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const [pagination, setPagination] = useState<any>({
    })
    const handleTableChange = (page: any) => {
        setCurrentPage(page.current)
    }
    const history = useNavigate()
    const ViewsDetails = (id: any) => {
        history('/list/driver-data/' + id)
    };

    // **********examle excel sheet download*********
    const sheetData = [{ name: '', 'licenseNumber': '', "mobileNumber": "" }]

    const handleTemplateDownload = () => {
        const wb = utils.book_new()
        const ws = utils.json_to_sheet(sheetData)

        utils.book_append_sheet(wb, ws, 'MySheet')
        writeFile(wb, 'Driver Details.xlsx')
    }
    // ***********excelSheetupdate*********************
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


    const excelSheetDriverupdate = () => {
        driver({
            url: DriverDetails,
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
        // driver({
        //     url: DriverDetails,
        //     type: 'details',
        //     token: true,
        //     payload: importExcelFileData,
        // }).then((res) => {
        //     messageApi.open({
        //         type: 'success',
        //         content: 'Successfully Register',
        //     });
        //     // form.resetFields();
        // })
        //     .catch((err: any) => {
        //         messageApi.open({
        //             type: 'error',
        //             content: 'something went wrong',
        //         });
        //         // setShowError(true)
        //     })
    }
    // *-***********************
    useEffect(() => {
        fetchData()
    }, [currentPage])
    const fetchData = () => {
        setLoading(true)
        DriverDtails({

            url: `${DriverDetails}?page=${currentPage}&limit=${8}`,
            type: 'details',
            token: true
        }).then((resposnse: any) => {
            const pager: any = {};
            pager["current"] = resposnse.meta.currentPage;
            pager["total"] = resposnse.meta.totalItems
            pager["pageSize"] = resposnse.meta.itemsPerPage
            setPagination({
                pagination: pager
            });
            setLoading(false)

            setState(resposnse.items)

        }).catch((err: any) => {
            setLoading(false)

        })
    }
    useEffect(() => {
        DriverDtails({

            url: `${DriverDetails}?page=${currentPage}&limit=${7}`,
            type: 'details',
            token: true
        }).then((resposnse: any) => {
            setState(resposnse.items)

        }).catch((err: any) => {

        })
    }, [])
    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',

        },
        {
            title: 'License Number',
            dataIndex: 'licenseNumber',
        },

        {
            title: 'Address',
            dataIndex: 'address',

        },
        {
            title: 'Mobile Number',
            dataIndex: 'mobileNumber',

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


    ];

    const data: DataType[] = state ? state : [];

    return (
        <>
            {contextHolder}
            <MainBoxContaint>
                <Row gutter={16}>
                    <Col span={24} lg={24} md={24}>
                        <Card bordered={true}>
                            <h4>Driver List</h4>

                            <div>
                                <div className='excel-sheet-upadate'>
                                    <form>
                                        <label>Upload Driver Excel Sheet</label>
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
                                            <button type='button' onClick={() => excelSheetDriverupdate()}>Submit</button>
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
                                <Table
                                    columns={columns}
                                    dataSource={data}
                                    loading={loading}
                                    pagination={pagination.pagination}
                                    onChange={handleTableChange}
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </MainBoxContaint>

        </>
    )
}
export default AllDriverList;
