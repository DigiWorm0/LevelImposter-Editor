import { Box, Modal } from "@mui/material";
import React from "react";

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: "scroll",
    maxHeight: "100%",
    display: "block"
};

export interface GenericModalProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function GenericModal(props: GenericModalProps) {
    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
        >
            <Box sx={modalStyle}>
                {props.children}
            </Box>
        </Modal>
    )
}