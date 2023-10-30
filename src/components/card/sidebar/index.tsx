import { FC, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Section, TextSection, Icon, IconSection, MainBox } from 'styles/component/card/sidebar/index'
import SideArrow from 'assets/svg/side-arrow'
import { ChildrenData } from 'components/SideBar/data'
import useMetaData from 'context/metaData'


export interface ICardProps {
    children?: ChildrenData[]
    title?: string
    image?: string
    path?: string
    disable?: boolean
    selectPath: (path: string, active: boolean) => void
    showModal: (value: boolean) => void
    aciveChildSidebar: boolean
    setAciveChildSidebar: (data: boolean) => void
}

const SidebarCard: FC<ICardProps> = ({ image, title, path, disable, selectPath, aciveChildSidebar, setAciveChildSidebar, showModal, children }) => {
    const { logoutModalOpen, setLogoutModalOpen } = useMetaData()
    const navigate = useNavigate()
    const location = useLocation()
    let active = false
    let childActive = false
    const [activeChild, setactiveChild] = useState<any>({
        title: '',
        active: false,
    })

    if (location.pathname === `${path}`) {
        active = true
    }

    useEffect(() => {
    }, [activeChild])



    return (
        <><MainBox>
            <Section
                className={` ${active ? "active" : ""}`}
                onClick={() => {
                    title == 'Logout' ? console.log('\\\\\\\\\\') : console.log('bttttttt')
                    if (title === 'Logout') {
                        setLogoutModalOpen(true)
                    }
                    else if (children && children?.length > 0) {
                        setAciveChildSidebar(true)
                        setactiveChild({
                            title: title,
                            active: true
                        })
                    } else if (path) {
                        selectPath(path, false)
                    } else {
                        showModal(true)
                    }
                }}
                data-autoid="mnuItm"
            >
                <IconSection >
                    <Icon className="sideIcon">
                        {image}
                    </Icon>
                </IconSection>
                <TextSection >{title}</TextSection>
                {active ? <SideArrow className="sidearrow" /> : ''}
            </Section>
            {(activeChild.title == title && aciveChildSidebar && children && children.length > 0) && children.map((c) => <div className={`subItemsMenu ${location.pathname == c.path && 'active'}`}
                onClick={() => {
                    c?.path && navigate(c?.path)

                }}>{c?.icon}{c.title}</div>)}
        </MainBox>
        </>
    )
}

export default SidebarCard
