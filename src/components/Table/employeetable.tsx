import { Card, Col, Row, Tabs } from "antd";
import { ReactElement } from 'react';
import DataTable from "components/Datatable";
import TableComponent from "components/Table";

import {
    MainBoxContaint
} from 'styles/views/Deshboard/Table/index'
const EmployeeTable = (): ReactElement => {
    return (
        <>
            <MainBoxContaint>
                <Row gutter={16}>
                    <Col span={24} lg={24} md={24}>
                        <Card bordered={true}>
                            <h4>Employee List</h4>
                            <DataTable />
                        </Card>
                    </Col>
                </Row>
            </MainBoxContaint>
        </>
    );
}
export default EmployeeTable
