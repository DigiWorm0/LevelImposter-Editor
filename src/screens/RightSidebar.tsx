import { Drawer, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import React from "react";
import TaskPanel from "../components/properties/TaskPanel";
import TransformPanel from "../components/properties/TransformPanel";

const DEFAULT_WIDTH = 300;

export default function RightSidebar() {
    return (
        <Drawer
            variant="permanent"
            anchor="right"
            sx={{
                width: DEFAULT_WIDTH,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: DEFAULT_WIDTH,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Typography
                variant="subtitle2"
                noWrap
                sx={{
                    m: 2
                }}>
                Properties
            </Typography>

            <Divider />

            <TransformPanel />
            <TaskPanel />
        </Drawer >
    );
}