import {
    MainContainer,
    NavSubContainer,
    UserSubContainer,
    LogoutView
} from 'styles/component/Navbar/index'
import Logo from 'assets/images/ABP-New-Logo.jpg'
import { MainLogo } from 'styles/views/Deshboard'
import { Avatar, Modal } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import Notification from 'assets/svg/notification'
import { useState } from 'react'
import type { DrawerProps } from 'antd/es/drawer';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom'
import { LoginRoute } from 'constants/routes'




const Navbar = ({ handleClick }: any) => {
    const history = useNavigate()
    const Logout = () => {
        localStorage.clear()
        history(LoginRoute.path)
    };
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <>
                    <a >
                        No Data
                    </a>
                </>
            ),
        },

    ];
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<DrawerProps['placement']>('right');

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <MainContainer>
                <NavSubContainer>
                    <MainLogo src={Logo} width={90} height={50} />
                </NavSubContainer>
                <UserSubContainer>
                    {/* <Dropdown menu={{ items }} placement="bottomRight" arrow >
                        <Notification />
                    </Dropdown> */}
                    <LogoutView>
                        <Avatar size={40} icon={<UserOutlined />} />
                    </LogoutView>
                </UserSubContainer>
            </MainContainer>
            <Modal title="Do you want to Log out" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

            </Modal>
        </>
    )
}

export default Navbar
