import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom'
// import { useIsFetching, useIsMutating } from 'react-query'
import { Spin } from 'antd'
import routes, { CompanyDashboardRoute, DashboardRoute, IRoute, LoginRoute } from 'constants/routes'
import PublicLayout from 'components/LayOut/PublicLayout'
import PrivateLayout from 'components/LayOut/PrivateLayout'
import { ProfileRoute } from 'constants/routes'
import useLoader, { LoaderProvider } from 'context/loader'

import useMetaData, { MetadataProvider } from 'context/metaData'
import { useIsFetching, useIsMutating } from 'react-query'
import useGet from 'hooks/useGet'
import { CabBooking, ComapnyRegistration } from 'constants/api'
import { type } from 'os'
import LogoutModal from 'components/Modals/LogoutModal'

export const CustomRoute = ({ component: Component, restricted, role: role }: IRoute) => {
    const navigate = useNavigate()
    const { logoutModalOpen, setLogoutModalOpen } = useMetaData()
    const { loader, setLoader } = useLoader()
    const isMutating = useIsMutating()
    const isFetching = useIsFetching()
    const [companyDetails, setCompanyDetails] = useState([]);
    const { mutateAsync: CompanyDetails } = useGet()
    const params = useParams();
    useEffect(() => {
        CompanyDetails({
            url: ComapnyRegistration + params.id,
            // url: CabBooking + params.id,
            // CabBooking
            type: 'details',
            token: true
        })
    }, [])


    const Role = localStorage.getItem('_role')
    useEffect(() => {
        const accessToken = localStorage.getItem('_accessToken')
        if (Role == "ADMIN") {
            if (restricted && !accessToken) navigate(LoginRoute.path)
            if (!restricted && accessToken) navigate(DashboardRoute.path)
        }
        else if (Role == "COMPANY") {
            if (restricted && !accessToken) navigate(LoginRoute.path)
            if (!restricted && accessToken) navigate(CompanyDashboardRoute.path)
        }
        else {
            if (restricted && !accessToken) navigate(LoginRoute.path)
        }
    }, [restricted])

    useEffect(() => {
        if (isFetching || isMutating) setLoader(true)
        else setLoader(false)
    }, [isFetching, isMutating])
    //   useEffect(() => {
    //     if (isFetching || isMutating) setLoader(true)
    //     else setLoader(false)
    //   }, [isFetching, isMutating])

    return (

        <>
            <LogoutModal />
            <Spin size="large" spinning={loader}>
                {restricted ? (

                    <PrivateLayout>
                        {role.includes(Role) && <Component />}
                    </PrivateLayout>

                ) : (
                    <PublicLayout>
                        <Component />
                    </PublicLayout>
                )}
            </Spin>
        </>
    )
}

const AppRoutes = () => {
    // const SentryRoutes = withSentryReactRouterV6Routing(Routes)
    const Role = localStorage.getItem('_role') || ""

    return (
        <MetadataProvider>
            <LoaderProvider>
                <Routes>
                    {routes.map((route, index,) => {
                        const { component, restricted, path, role } = route

                        return (
                            <>
                                <Route
                                    key={index}
                                    path={path}
                                    element={
                                        <CustomRoute role={role} key={index} path={path} component={component} restricted={restricted} />
                                    }
                                />
                            </>
                        )


                    })}
                </Routes>
            </LoaderProvider>
        </MetadataProvider>
    )
}

export default AppRoutes
