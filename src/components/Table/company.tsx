import { Card, Col, Row, Tabs } from "antd";
import { ReactElement } from 'react';
import DataTable from "components/Datatable";
import TableComponent from "components/Table";

import {
    MainBoxContaint
} from 'styles/views/Deshboard/Table/index'
const companyTable = (): ReactElement => {

    return (
        <>
            <MainBoxContaint>
                <Row gutter={16}>
                    <Col span={24} lg={24} md={24}>
                        <Card bordered={true}>
                            <h4>Company List</h4>
                            <TableComponent />
                        </Card>
                    </Col>

                </Row>
            </MainBoxContaint>
        </>
    );
}
export default companyTable
