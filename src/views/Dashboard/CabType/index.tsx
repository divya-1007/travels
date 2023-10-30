import { Card, Col, Form, Input, Modal, Row, Table, Tabs, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import TabPane from 'antd/es/tabs/TabPane';
import Buttons from 'components/Button';
import { CabCategory } from 'constants/api';
import useGet from 'hooks/useGet';
import usePost from 'hooks/usePost';
import { ReactElement, useEffect, useState } from 'react';
import { SubHeading, CabType } from 'styles/views/Deshboard/CabType';
import { Profilepage } from 'styles/views/Deshboard/Profile/index'


interface DataType {
    key: React.Key;
    name: string;
}


const CabTypeSelect = (): ReactElement => {
    const [cabType, setCabType] = useState("")
    const [form] = Form.useForm();
    const [tableData, setTabledata] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const { mutateAsync: getCabCategoryList } = useGet();
    const { mutateAsync: postCabCategoryList } = usePost();
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState<any>({
    })



    const CreateCabType = () => {
        const payload = {
            cabCategoryName: cabType
        }
        postCabCategoryList({
            url: CabCategory,
            type: 'details',
            payload: payload
        }).then((res) => {
            messageApi.open({
                type: 'success',
                content: 'successfully created.',
            });
            form.resetFields();
            fetchData()
        }).catch((err) => {
            messageApi.open({
                type: 'error',
                content: 'Already exist cab category',
            });
        })
    }
    useEffect(() => {
        fetchData()
    }, [currentPage])

    const fetchData = () => {
        getCabCategoryList({
            url: `${CabCategory}?page=${currentPage}&limit=${3}`,
            type: 'details',
            token: true
        }).then((res) => {
            if (res) {
                const pager: any = {};
                pager["current"] = res.meta.currentPage;
                pager["total"] = res.meta.totalItems
                pager["pageSize"] = res.meta.itemsPerPage
                setPagination({
                    pagination: pager
                });
                setTabledata(res.items)

            }
        })
    }
    const handleTableChange = (page: any) => {
        setCurrentPage(page.current)

    }
    const columns: ColumnsType<DataType> = [
        {
            title: 'Cab Category',
            dataIndex: 'cabCategoryName',

        },]
    const data: DataType[] = tableData ? tableData : [];

    return (
        <>
            {contextHolder}
            <Profilepage>
                <SubHeading>
                    Cab Type
                </SubHeading>
                <CabType>
                    <Row gutter={16}>
                        <Col span={12}>
                            <h3>
                                Create Cab Categary
                            </h3>
                            <Card>
                                <Form form={form} name="form_item_path" layout="vertical" onFinish={CreateCabType}>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                name="cab"
                                                label="cab type "
                                                rules={[{ required: true, message: 'Please input your full Name ' }]}
                                            >
                                                <Input style={{ width: '100%' }} value={cabType} onChange={(e) => setCabType(e.target.value)} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={24}>
                                            <Buttons label="Create" type="submit" data-autoid="" />
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <h3>
                                Cab Categary List
                            </h3>
                            <Card>
                                <Table
                                    columns={columns}
                                    dataSource={data}
                                    // loading={loading}
                                    pagination={pagination.pagination}
                                    onChange={handleTableChange}
                                />
                            </Card>
                        </Col>
                    </Row>
                </CabType>

            </Profilepage>



        </>
    );
}
export default CabTypeSelect
