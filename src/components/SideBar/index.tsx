import { useState } from 'react'
import data from 'components/SideBar/data'
import { MainContainer, Wrapper } from 'styles/component/sidebar'
import SidebarCard from 'components/card/sidebar'
import { useNavigate } from 'react-router-dom'
const SideBar = ({ isShow }: { isShow: boolean }, role: any) => {
    const [isOpen, setIsOpen] = useState(false)
    const [aciveChildSidebar, setAciveChildSidebar] = useState(false)
    const navigate = useNavigate()
    const selectPath = (path: string, active: boolean) => {
        setAciveChildSidebar(active)
        navigate(path)
    }
    const Role = localStorage.getItem('_role') || ''

    return (
        <MainContainer className={!isShow ? 'hide' : ''} data-autoid="sideMenu">
            <Wrapper>
                {data?.map((item) => {

                    if (item?.role.includes(Role)) {
                        return <SidebarCard
                            children={item.children}
                            key={item.id}
                            image={item?.icon}
                            title={item?.title}
                            path={item?.path}
                            aciveChildSidebar={aciveChildSidebar}
                            setAciveChildSidebar={setAciveChildSidebar}
                            selectPath={selectPath}
                            disable={item?.disable}
                            showModal={(value: boolean) => setIsOpen(value)}
                        />
                    }

                })}
            </Wrapper>
            {isOpen && (
                <div>
                    <div>{/* modal */}</div>
                </div>
            )}
        </MainContainer>
    )
}

export default SideBar
