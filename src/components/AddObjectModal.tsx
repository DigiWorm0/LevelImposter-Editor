import { HorizontalRule } from "@mui/icons-material";
import { Modal, Typography, Box } from "@mui/material";

export default function AddObjectModal(props: { isOpen: boolean, onClose: () => void }) {

    const handleClose = () => {
        props.onClose();
    }

    return (
        <Modal
            open={props.isOpen}
            onClose={handleClose}>

            <Box
                sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>

                <Typography variant="h6" noWrap>
                    Add Object
                </Typography>
                <HorizontalRule />
            </Box>

        </Modal>
    );
}