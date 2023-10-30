import { useState } from 'react'
import NavBar from 'components/Navbar'
import SideBar from 'components/SideBar'
import { Wrapper } from 'styles/component/sidebar'
import { Section } from 'styles/component/LayOut/Public'
// import { Section } from 'styles/component/Navbar'

const Layout = ({ children }: any) => {
    const [isShow, setIsShow] = useState(true)

    const handleClick = () => {
        setIsShow(!isShow)
    }
    return (
        <Wrapper>
            <NavBar handleClick={handleClick} />
            <Section>
                <SideBar isShow={isShow} />
                {children}
            </Section>
        </Wrapper>
    )
}

export default Layout
