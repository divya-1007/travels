import axios, { AxiosInstance } from 'axios'
import { REFRESH_TOKEN } from 'constants/api'
import { useEffect } from 'react'
import { LoginRoute } from 'constants/routes'
import { useNavigate } from 'react-router-dom'


let tokenString = localStorage.getItem('_refreshToken')
export const getToken = (token: string) => {
    tokenString = token
}

interface ChildrenProps {
    // eslint-disable-next-line no-undef
    children: JSX.Element
}

export const authInstance = axios.create({
    baseURL: process.env.REACT_APP_AUTH_URL,
})

export const detailsInstance = axios.create({
    baseURL: process.env.REACT_APP_DETAILS_URL,
})

let isRefreshing = false

const interceptorHandling = (axiosInstance: AxiosInstance, navigate: any) => {
    const resInterceptor = (response: any) => {
        return response
    }

    const errInterceptor = async (error: any) => {
        if (
            (error.response && error.response.status === 401) ||
            error.status === 401 ||
            error.status === 400
        ) {
            // CS-2 error code is when token is invalid
            if (!isRefreshing && error.response.data.code === 'CS-2') {
                isRefreshing = true
                await authInstance
                    .post(REFRESH_TOKEN, { refreshToken: tokenString })
                    .then((response: any) => {
                        isRefreshing = false
                        localStorage.setItem('_accessToken', response.data.accessToken)
                        return response
                    })
                    .catch((err) => {
                        navigate.push(LoginRoute.path)
                        localStorage.clear()
                        throw err
                    })
            }
        }
        return Promise.reject(error)
    }

    const interceptor = axiosInstance.interceptors.response.use(resInterceptor, errInterceptor)

    return () => axiosInstance.interceptors.response.eject(interceptor)
}
export const AxiosInterceptor = ({ children }: ChildrenProps) => {
    const navigate = useNavigate()
    useEffect(() => interceptorHandling(authInstance, navigate), [])
    useEffect(() => interceptorHandling(detailsInstance, navigate), [])
    return children
}
