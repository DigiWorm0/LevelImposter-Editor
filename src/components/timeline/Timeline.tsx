import {Box} from "@mui/material";
import TimelineHeader from "./TimelineHeader";
import TimelineBody from "./TimelineBody";

export default function Timeline() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: 100,
                flexGrow: 1,
            }}
        >
            <TimelineHeader/>
            <TimelineBody/>
        </Box>
    );
}