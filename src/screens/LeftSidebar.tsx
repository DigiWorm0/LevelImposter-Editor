import { Button, Divider, Drawer, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import AddObjectModal from "../components/modals/AddObjectModal";
import { getElement } from "../hooks/useElement";
import useMap from "../hooks/useMap";

const DEFAULT_WIDTH = 240;

export default function LeftSidebar() {
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [map] = useMap();

    const handleModalOpen = () => {
        setModalVisible(true);
    }
    const handleModalClose = () => {
        setModalVisible(false);
    }

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: DEFAULT_WIDTH,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: DEFAULT_WIDTH,
                    boxSizing: 'border-box',
                },
            }}>

            <Typography
                variant="subtitle2"
                noWrap
                sx={{
                    m: 2
                }}>
                {map.name}
            </Typography>

            <Divider />

            {map.elementIDs.map(elementID => (
                <Box key={elementID}>
                    <Typography
                        variant="body2"
                        noWrap
                        sx={{
                            ml: 2,
                            mr: 2,
                            mt: 1
                        }}>
                        {getElement(elementID).name}
                    </Typography>
                </Box>
            ))}

            <Button
                variant="contained"
                onClick={handleModalOpen}
                sx={{
                    m: 2
                }}>

                + Object

            </Button>

            <AddObjectModal isOpen={isModalVisible} onClose={handleModalClose} />
        </Drawer>
    );
}