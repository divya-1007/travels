import {
    authInstance,
    detailsInstance,
} from 'service/axiosinstance'
// import { RefreshTokenPayload } from 'views/Dashboard/Connections/CandidateList/interfaces'

export type IInstanceType = 'auth' | 'details' | undefined

export const determineInstance = (type: IInstanceType) => {
    switch (type) {
        case 'auth':
            return authInstance
        case 'details':
            return detailsInstance
        default:
            return detailsInstance
    }
}

export const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve) => {
        const reader = new FileReader()
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        reader.onloadend = () => resolve(reader.result as any)
        reader.readAsDataURL(blob)
    })
}

export const issuerName = ['SynchroServe', 'Synchroserve']
