import {Box, IconButton} from "@mui/material";
import {Loop, Pause, PlayArrow, Stop} from "@mui/icons-material";
import TimelineRow from "./TimelineRow";
import TimelineTimesteps from "./TimelineTimesteps";
import TimelinePlayheadHandle from "./TimelinePlayheadHandle";
import useLoopAnim from "../../hooks/timeline/useLoopAnim";
import usePlayAnim from "../../hooks/timeline/usePlayAnim";
import {useSetPlayhead} from "../../hooks/timeline/usePlayhead";

export default function TimelineHeader() {
    const [isLoop, setLoop] = useLoopAnim();
    const [playAnim, setPlayAnim] = usePlayAnim();
    const setPlayhead = useSetPlayhead();

    return (
        <TimelineRow
            header={(
                <Box sx={{textAlign: "center"}}>
                    <IconButton
                        onClick={() => setPlayAnim(!playAnim)}
                    >
                        {playAnim ? <Pause/> : <PlayArrow/>}
                    </IconButton>
                    <IconButton
                        onClick={() => {
                            setPlayAnim(false);
                            setPlayhead(0);
                        }}
                    >
                        <Stop/>
                    </IconButton>
                    <IconButton
                        onClick={() => setLoop(!isLoop)}
                    >
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