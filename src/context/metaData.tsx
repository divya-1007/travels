import { createContext, ReactNode, useContext, useState, ReactElement } from 'react'

export interface IMetadataProps {
    logoutModalOpen: any
    setLogoutModalOpen: (data: any) => void
}

const contextDefaultValues: IMetadataProps = {
    logoutModalOpen: false,
    setLogoutModalOpen: (data: boolean) => data
}
const MetadataContext = createContext<IMetadataProps>(contextDefaultValues)

export const MetadataProvider = ({ children }: { children: ReactNode }) => {
    const [logoutModalOpen, setLogoutModalOpen] = useState(contextDefaultValues.logoutModalOpen)


    return (
        <MetadataContext.Provider
            value={{
                logoutModalOpen,
                setLogoutModalOpen,
            }}
        >
            {children}
        </MetadataContext.Provider>
    )
}

export default () => useContext(MetadataContext)
