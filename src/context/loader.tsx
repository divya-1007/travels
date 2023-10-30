import { createContext, ReactNode, useContext, useState } from 'react'

export interface ILoaderProps {
    loader: boolean
    setLoader: (data: boolean) => void
}

const contextDefaultValues: ILoaderProps = {
    loader: true,
    setLoader: (data: boolean) => data,
}

const LoaderContext = createContext<ILoaderProps>(contextDefaultValues)

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
    const [loader, setLoader] = useState(contextDefaultValues.loader)

    return (
        <LoaderContext.Provider
            value={{
                loader,
                setLoader,
            }}
        >
            {children}
        </LoaderContext.Provider>
    )
}

export default () => useContext(LoaderContext)
