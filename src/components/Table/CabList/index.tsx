import { Card, Col, Row, Tabs } from "antd";
import { ReactElement } from 'react';
import {
    MainBoxContaint
} from 'styles/views/Deshboard/Table/index'
import TableComponentCab from "./cablist";
const CabTable = (): ReactElement => {

    return (
        <>
            <MainBoxContaint>
                <h4>Cab List</h4>

                <TableComponentCab />
            </MainBoxContaint >
        </>
    );
}
export default CabTable
