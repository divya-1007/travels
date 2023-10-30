import { ReactElement } from 'react'
import Login from 'views/LandingPage/Login'
import ChangePassword from 'views/LandingPage/ChangePassword'
import ForgetPassword from 'views/LandingPage/ForgetPassword'
import Profile from 'views/Dashboard/Profile'
import Tablelist from 'views/Dashboard/List/TableList'
import CreateSubAdmin from 'views/Dashboard/CreateSubAdmin'
import DashBoard from 'views/Dashboard'
import companyTable from 'components/Table/company'
import EmployeeTable from 'components/Table/employeetable'
import UserProfile from 'views/Dashboard/UserProfile'
import UserProfileDtails from 'views/Dashboard/UserProfile'
import CabBookingData from 'components/Table/CabBookingInformation/cabbookingdata'
import Employeedata from 'components/Table/EmployeeDtails'
import ReportPage from 'views/Dashboard/Report'
import ReportPageFilter from 'views/Dashboard/Report/report'
import DriverData from 'components/Table/DriverList/DriverDetails'
import CabTypeSelect from 'views/Dashboard/CabType'
import CabBookingInformation from 'components/Table/CabBookingInformation'
import AllDriverList from 'components/Table/DriverList'
import CabTable from 'components/Table/CabList'
import CompanyForm from 'views/Dashboard/CreateSubAdmin/DetailsForm/CompanyForm'
import EmployeeForm from 'views/Dashboard/CreateSubAdmin/DetailsForm/EmployeeForm'
import DriverCreate from 'views/Dashboard/CreateSubAdmin/DetailsForm/DriverForm'
import CabForm from 'views/Dashboard/CreateSubAdmin/DetailsForm/CabForm'
import CompanyDashboard from 'views/Dashboard/companyDashboard'
export interface IRoute {
    component: () => ReactElement
    path: string
    restricted: boolean
    role: any
}
export const LoginRoute: IRoute = {
    component: Login,
    path: '/',
    restricted: false,
    role: ["ADMIN", "COMPANY"]
}
export const ChangePasswordRoute: IRoute = {
    component: ChangePassword,
    path: '/change-password',
    restricted: false,
    role: ["ADMIN", "COMPANY"]
}
export const ForgetPasswordRoute: IRoute = {
    component: ForgetPassword,
    path: '/forget-password',
    restricted: false,
    role: ["ADMIN", "COMPANY"]
}
export const CompanyDashboardRoute: IRoute = {
    component: CompanyDashboard,
    path: '/company/dashboard',
    restricted: true,
    role: ["COMPANY"]
}
export const CompanyDashboardHomeRoute: IRoute = {
    component: CompanyDashboard,
    path: '*',
    restricted: true,

    role: ["COMPANY"]
}
export const DashboardRoute: IRoute = {
    component: DashBoard,
    path: '/dashboard',
    restricted: true,
    role: ["ADMIN"]
}
export const CabTypeRoute: IRoute = {
    component: CabTypeSelect,
    path: '/cab-type',
    restricted: true,
    role: ["ADMIN", "COMPANY"]
}
export const UserDetailsRoute: IRoute = {
    component: UserProfileDtails,
    path: '/Company/company-list/user-details/:id',
    restricted: true,
    role: ["ADMIN", "COMPANY"]
}
export const DriverListRoute: IRoute = {
    component: AllDriverList,
    path: '/driver/driver-list',
    restricted: true,
    role: ["ADMIN"]
}
export const DriverFormRoute: IRoute = {
    component: DriverCreate,
    path: '/driver-register',
    restricted: true,
    role: ["ADMIN"]
}
export const CabListRoute: IRoute = {
    component: CabTable,
    path: '/cab/cab-list',
    restricted: true,
    role: ["ADMIN"]
}
export const CabFormRoute: IRoute = {
    component: CabForm,
    path: '/cab-register',
    restricted: true,
    role: ["ADMIN"]
}
export const CabBookingDataRoute: IRoute = {
    component: CabBookingData,
    path: '/cabbooking-list/cab-booking/:id',
    restricted: true,
    role: ["ADMIN", "COMPANY"]
}
export const ReportCabBookingDataRoute: IRoute = {
    component: CabBookingData,
    path: '/report/cab-booking/:id',
    restricted: true,
    role: ["ADMIN", "COMPANY"]
}
export const BookingDataRoute: IRoute = {
    component: CabBookingInformation,
    path: '/cabbooking-list',
    restricted: true,
    role: ["ADMIN", "COMPANY"]
}
export const EmployeedataRoute: IRoute = {
    component: Employeedata,
    path: '/list/employee-data/:id',
    restricted: true,
    role: ["ADMIN", "COMPANY"]
}
export const DriverdataRoute: IRoute = {
    component: DriverData,
    path: '/list/driver-data/:id',
    restricted: true,
    role: ["ADMIN", "COMPANY"]
}
export const ProfileRoute: IRoute = {
    component: Profile,
    path: '/profile',
    restricted: true,
    role: ["ADMIN", "COMPANY"]
}
export const ReportRoute: IRoute = {
    component: ReportPageFilter,
    path: '/report',
    restricted: true,
    role: ["ADMIN", "COMPANY"]
}
export const HomeRoute: IRoute = {
    component: DashBoard,
    path: '*',
    restricted: true,
    role: ["ADMIN"]
}
export const CompanyListTableRoute: IRoute = {
    component: companyTable,
    path: '/Company/company-list',
    restricted: true,
    role: ["ADMIN", "COMPANY"]
}
export const CompanyFormTableRoute: IRoute = {
    component: CompanyForm,
    path: '/company-register',
    restricted: true,
    role: ["ADMIN", "COMPANY"]
}
export const EmployeelistRoute: IRoute = {
    component: EmployeeTable,
    path: '/employee/employee-list',
    restricted: true,
    role: ["ADMIN", "COMPANY"]
}
export const EmployeeFormRoute: IRoute = {
    component: EmployeeForm,
    path: '/employee-register',
    restricted: true,
    role: ["ADMIN", "COMPANY"]
}
export const DriverlistRoute: IRoute = {
    component: AllDriverList,
    path: '/list/driver-list',
    restricted: true,
    role: ["ADMIN", "COMPANY"]
}
export const UserProfileRoute: IRoute = {
    component: UserProfile,
    path: '/user-profile',
    restricted: true,
    role: ["ADMIN", "COMPANY"]
}
const IRouteS = [
    LoginRoute,
    EmployeedataRoute,
    DriverFormRoute,
    DriverListRoute,
    CompanyFormTableRoute,
    CabTypeRoute,
    DriverdataRoute,
    CabListRoute,
    CabFormRoute,
    ChangePasswordRoute,
    ForgetPasswordRoute,
    DashboardRoute,
    ProfileRoute,
    EmployeeFormRoute,
    UserDetailsRoute,
    ReportRoute,
    EmployeelistRoute,
    HomeRoute,
    CompanyDashboardHomeRoute,
    UserProfileRoute,
    BookingDataRoute,
    CabBookingDataRoute,
    ReportCabBookingDataRoute,
    DriverlistRoute,
    CompanyListTableRoute,
    CompanyDashboardRoute
]
export default IRouteS