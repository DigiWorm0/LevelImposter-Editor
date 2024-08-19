import {Box, IconButton} from "@mui/material";
import {Loop, Pause, PlayArrow, Stop} from "@mui/icons-material";
import TimelineRow from "../TimelineRow";
import TimelineTimesteps from "./TimelineTimesteps";
import TimelinePlayheadHandle from "./TimelinePlayheadHandle";
import usePlayAnim from "../../../hooks/timeline/usePlayAnim";
import {useSetPlayhead} from "../../../hooks/timeline/usePlayhead";
import TimelineTimestamp from "./TimelineTimestamp";
import useSelectedElemProp from "../../../hooks/elements/useSelectedElemProperty";

export default function TimelineHeader() {
    const [isLoop, setLoop] = useSelectedElemProp("triggerLoop");
    const [playAnim, setPlayAnim] = usePlayAnim();
    const setPlayhead = useSetPlayhead();

    return (
        <TimelineRow
            header={(
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                    }}
                >
                    <Box sx={{flexShrink: 0}}>
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
                    <TimelineTimestamp/>
                </Box>
            )}
        >
            <TimelinePlayheadHandle/>
            <TimelineTimesteps/>

        </TimelineRow>
    );
}