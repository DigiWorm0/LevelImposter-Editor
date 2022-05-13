import { Drawer, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import { Box } from "@mui/system";
import React from "react";
import TransformPanel from "../components/properties/TransformPanel";
import useSelectedElemIDs from "../hooks/db/useSelection";
import GUID from "../types/GUID";

const DEFAULT_WIDTH = 300;

export default function RightSidebar() {
    const [selectedIDs] = useSelectedElemIDs();
    const [tgtID, setTgtID] = React.useState(undefined as GUID | undefined);

    React.useEffect(() => {
        setTgtID(selectedIDs.length > 0 ? selectedIDs[0] : undefined);
    }, [selectedIDs]);

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

            {tgtID ? (
                <TransformPanel elementID={tgtID} />
            ) : (
                <Box sx={{
                    p: 1
                }}>
                    <Typography
                        variant="subtitle2"
                        noWrap
                        sx={{
                            m: 2
                        }}>
                        No element selected
                    </Typography>
                </Box>
            )}
        </Drawer >
    );
}