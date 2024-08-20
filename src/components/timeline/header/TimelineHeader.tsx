import {Box, IconButton} from "@mui/material";
import {Loop, Pause, PlayArrow, Stop} from "@mui/icons-material";
import TimelineRow from "../TimelineRow";
import TimelineTimesteps from "./TimelineTimesteps";
import TimelinePlayheadHandle from "./TimelinePlayheadHandle";
import usePlayAnim from "../../../hooks/timeline/usePlayAnim";
import {useSetPlayhead} from "../../../hooks/timeline/usePlayhead";
import TimelineTimestamp from "./TimelineTimestamp";
import useSelectedElemProp from "../../../hooks/elements/useSelectedElemProperty";
import {useSetTimelineScale} from "../../../hooks/timeline/useTimelineScale";
import {useSetTimelineOffset} from "../../../hooks/timeline/useTimelineOffset";

export default function TimelineHeader() {
    const [isLoop, setLoop] = useSelectedElemProp("triggerLoop");
    const [playAnim, setPlayAnim] = usePlayAnim();
    const setPlayhead = useSetPlayhead();
    const setScale = useSetTimelineScale();
    const setOffset = useSetTimelineOffset();

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
                            onDoubleClick={() => {
                                setScale(40);
                                setOffset(0);
                                setPlayhead(0);
                            }}
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