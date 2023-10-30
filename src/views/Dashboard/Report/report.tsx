
import { ReactElement } from 'react';
import {
    MainBoxContainer, ReportSection,
} from 'styles/views/Deshboard/Report';
import CabBookingReport from './cabBookingReport';
const ReportPageFilter = (): ReactElement => {
    return (
        <>  <MainBoxContainer>
            <ReportSection>
                <CabBookingReport />
            </ReportSection >
        </MainBoxContainer>
        </>

    );
};

export default ReportPageFilter;