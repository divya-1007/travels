import { AxiosError, AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { determineInstance, IInstanceType } from 'utils/helper'

interface IParams {
    url: string
    payload?: any
    type?: IInstanceType
    token?: boolean
    file?: boolean

}

const patch = async ({ url, payload, type, token = false, file = false }: IParams) => {
    const instance = determineInstance(type)
    let headers = {}
    if (token) {
        const accessToken = localStorage.getItem('_accessToken')
        headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        }
    }
    if (file) {
        headers = { ...headers, 'Content-Type': 'multipart/form-data' }
    }
    const { data } = await instance
        // .patch(url, payload, { headers })
        .patch(url, payload, { headers, responseType: file ? 'blob' : 'json' })

        .then((res) => {
            return res
        })
        .catch(async (e: AxiosError) => {
            // eslint-disable-next-line no-console
            console.dir(e, { depth: null })
            // await getRefreshToken({ e, navigate, setAlert })
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-throw-literal
            throw e.response as AxiosResponse<any, any>
        })
    return data
}

const usePatch = () => useMutation(patch)

export default usePatch
