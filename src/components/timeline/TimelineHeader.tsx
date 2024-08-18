import {Box, IconButton} from "@mui/material";
import {PlayArrow} from "@mui/icons-material";
import TimelineRow from "./TimelineRow";
import TimelineTimesteps from "./TimelineTimesteps";

export default function TimelineHeader() {
    return (
        <TimelineRow
            header={(
                <Box>
                    <IconButton>
                        <PlayArrow/>
                    </IconButton>
                </Box>
            )}
        >
            <TimelineTimesteps/>

        </TimelineRow>
    );
}