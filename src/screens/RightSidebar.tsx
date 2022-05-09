import { Drawer, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';

const DEFAULT_WIDTH = 240;

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
        </Drawer>
    );
}