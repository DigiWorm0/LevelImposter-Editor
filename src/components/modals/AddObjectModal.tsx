import { HorizontalRule } from "@mui/icons-material";
import { Modal, Typography, Box, Grid } from "@mui/material";
import { setElement } from "../../hooks/useElement";
import useMap from "../../hooks/useMap";
import AUElement from "../../types/au/AUElement";
import AUElementDB from "../../types/au/AUElementDB";
import LIElement from "../../types/li/LIElement";
import AddObjectButton from "./AddObjectButton";
import generateGUID from '../../hooks/generateGUID';

export default function AddObjectModal(props: { isOpen: boolean, onClose: () => void }) {
    const [map, setMap] = useMap();

    const handleClose = () => {
        props.onClose();
    }

    const handleClick = (elem: AUElement) => {
        const element: LIElement = {
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
        };
        map.elementIDs.push(element.id);
        setElement(element);
        setMap(map);
        handleClose();
    }

    return (
        <Modal
            open={props.isOpen}
            onClose={handleClose}
            sx={{
                width: "100%",
                height: "100%",
            }}>

            <Box
                sx={{
                    transform: 'translate(-50%, -50%)',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '80%',
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    overflow: 'auto',
                    maxHeight: '90%'
                }}>

                <Typography variant="h6" noWrap>
                    Add Object
                </Typography>
                <HorizontalRule />

                <Grid
                    container
                    spacing={2}
                    sx={{
                        height: '100%',
                        width: '100%',
                    }}>
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