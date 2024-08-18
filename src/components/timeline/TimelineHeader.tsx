import {Box, IconButton} from "@mui/material";
import {Loop, PlayArrow, Stop} from "@mui/icons-material";
import TimelineRow from "./TimelineRow";
import TimelineTimesteps from "./TimelineTimesteps";
import TimelinePlayheadHandle from "./TimelinePlayheadHandle";
import useLoopAnim from "../../hooks/timeline/useLoopAnim";

export default function TimelineHeader() {
    const [isLoop, setLoop] = useLoopAnim();

    return (
        <TimelineRow
            header={(
                <Box sx={{textAlign: "center"}}>
                    <IconButton>
                        <PlayArrow/>
                    </IconButton>
                    <IconButton>
                        <Stop/>
                    </IconButton>
                    <IconButton onClick={() => setLoop(!isLoop)}>
                        <Loop
                            color={isLoop ? "success" : "error"}
                        />
                    </IconButton>
                </Box>
            )}
        >
            <TimelinePlayheadHandle/>
            <TimelineTimesteps/>

        </TimelineRow>
    );
}