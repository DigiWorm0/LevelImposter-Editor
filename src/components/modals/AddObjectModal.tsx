import { HorizontalRule } from "@mui/icons-material";
import { Modal, Typography, Box, Grid } from "@mui/material";
import useMap from "../../hooks/useMap";
import AUElement from "../../types/AUElement";
import AUElementDB from "../../types/AUElementDB";
import AddObjectButton from "./AddObjectButton";

const generateGUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export default function AddObjectModal(props: { isOpen: boolean, onClose: () => void }) {
    const [map] = useMap();

    const handleClose = () => {
        props.onClose();
    }

    const handleClick = (elem: AUElement) => {
        map.elements.push({
            name: elem.name,
            type: elem.type,
            id: generateGUID(),
            x: 1,
            y: 1,
            z: 0,
            xScale: 1,
            yScale: 1,
            rotation: 0,
            properties: {}
        });
        handleClose();
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
                    width: '50%',
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

                <Grid container spacing={2}>
                    {AUElementDB.map((element, index) => {
                        return (
                            <AddObjectButton
                                key={element.type + "-" + index}
                                element={element}
                                onClick={handleClick}
                            />
                        )
                    })}
                </Grid>
            </Box>

        </Modal>
    );
}