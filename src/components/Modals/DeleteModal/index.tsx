import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';

interface ModalEvents {
    open: boolean
    setOpen: (open: boolean) => void
    title: string
    deleteConfirm: () => void
}

const DeleteModal: React.FC<ModalEvents> = (props) => {
    const { open, setOpen, title, deleteConfirm } = props


    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        deleteConfirm()
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    useEffect(() => {
        setOpen(open)
    }, [open, setOpen])

    return (
        <>
            <Modal title={title} open={open} onOk={handleOk} onCancel={handleCancel}>
                <p></p>
            </Modal>

        </>
    );
};
export default DeleteModal;
