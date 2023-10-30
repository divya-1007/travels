import { Tabs } from "antd";
import { ReactElement, useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import DataTable from "components/Datatable";
import TableComponent from "components/Table";
import { MainBoxContaint, Container, Listbox } from 'styles/views/Deshboard/Table/index'
import CabTable from "components/Table/CabList";
import TabPane from "antd/es/tabs/TabPane";
import CabBookingInformation from "components/Table/CabBookingInformation";
import AllDriverList from "components/Table/DriverList";
const Tablelist = (): ReactElement => {
    const [activeKey, setActiveKey] = useState()
    const location = useLocation();

    useEffect(() => {
        if (location) {
            setActiveKey(location?.state?.key)
        }
    }, [location.state?.key])


    return (
        <>
            <MainBoxContaint>
                <Container>
                    <Listbox>
                        {/* activeKey={activeKey} */}
                        {/* activeKey={activeKey} */}
                        <Tabs defaultActiveKey={activeKey}>
                            <TabPane tab="Company List" key="1">
                                <TableComponent />
                            </TabPane>
                            <TabPane tab="Cab List" key="2">
                                <CabTable />
                            </TabPane>
                            <TabPane tab="Employee List" key="3">
                                <DataTable />
                            </TabPane>
                            <TabPane tab="Cab Booking List" key="4">
                                <CabBookingInformation />
                            </TabPane>
                            <TabPane tab="Driver List" key="5">
                                <AllDriverList />
                            </TabPane>
                        </Tabs>
                    </Listbox>
                </Container>
            </MainBoxContaint>
        </>
    )
}
export default Tablelist