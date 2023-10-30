import { AxiosError, AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { determineInstance, IInstanceType } from 'utils/helper'

interface IParams {
    url: string
    payload?: any
    type?: IInstanceType
    token?: boolean
    adminToken?: boolean
    body?: any
    file?: boolean
}

const post = async ({
    url,
    payload,
    body,
    type,
    token = false,
    adminToken = false,
    file = false,
}: IParams) => {
    const instance = determineInstance(type)
    let headers = {}
    if (token) {
        const accessToken = localStorage.getItem('_accessToken')
        headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    }
    if (adminToken) {
        headers = { ...headers, 'admin-api-key': 'testApiKey' }
    }
    if (file) {
        headers = { ...headers, 'Content-Type': 'multipart/form-data' }
    }
    const { data }: any = await instance
        .post(url, payload, { headers, responseType: file ? 'blob' : 'json' })
        .then((res) => {
            return res
        })
        .catch((e: AxiosError) => {
            // eslint-disable-next-line no-console
            console.dir(e, { depth: null })
            // await getRefreshToken({ e, navigate, setAlert })
            // navigate.push(LoginRoute.path)
            // localStorage.clear()
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-throw-literal
            throw e.response as AxiosResponse<any, any>
        })
    return data
}

const usePost = () => useMutation(post)

export default usePost
