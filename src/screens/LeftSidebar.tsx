import { Button, Divider, Drawer, Typography } from "@mui/material";
import React from "react";
import AddObjectModal from "../components/modals/AddObjectModal";
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