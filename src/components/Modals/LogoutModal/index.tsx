import { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import useMetaData from 'context/metaData'
import { LoginRoute } from 'constants/routes';
import { useNavigate } from 'react-router-dom';


const LogoutModal = () => {
    const { logoutModalOpen, setLogoutModalOpen } = useMetaData()
    const history = useNavigate()

    const handleOk = () => {
        setLogoutModalOpen(false);
        localStorage.clear()
        history(LoginRoute.path)
    };
    const handleCancel = () => {
        setLogoutModalOpen(false);
    };

    return (
        <>
            <Modal title="Do you want to logout ?" open={logoutModalOpen} onOk={handleOk} onCancel={handleCancel}>

            </Modal>

        </>
    );
};
export default LogoutModal;

