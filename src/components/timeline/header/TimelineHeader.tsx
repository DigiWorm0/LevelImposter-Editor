import {Box, IconButton} from "@mui/material";
import {Loop, Pause, PlayArrow, Stop} from "@mui/icons-material";
import TimelineRow from "../TimelineRow";
import TimelineTimesteps from "./TimelineTimesteps";
import TimelinePlayheadHandle from "./TimelinePlayheadHandle";
import usePlayAnim from "../../../hooks/timeline/usePlayAnim";
import {useSetPlayhead} from "../../../hooks/timeline/usePlayhead";
import TimelineTimestamp from "./TimelineTimestamp";
import useSelectedElemProp from "../../../hooks/elements/useSelectedElemProperty";
import {timelineScaleAtom, useSetTimelineScale} from "../../../hooks/timeline/useTimelineScale";
import {timelineOffsetAtom, useSetTimelineOffset} from "../../../hooks/timeline/useTimelineOffset";
import Konva from "konva";
import primaryStore from "../../../hooks/primaryStore";
import lerp from "../../../utils/math/lerp";

const ANIM_DURATION = 500;
const ANIM_SCALE = 40;
const ANIM_OFFSET = 0;

export default function TimelineHeader() {
    const [isLoop, setLoop] = useSelectedElemProp("triggerLoop");
    const [playAnim, setPlayAnim] = usePlayAnim();
    const setPlayhead = useSetPlayhead();
    const setScale = useSetTimelineScale();
    const setOffset = useSetTimelineOffset();

    const onDoubleClick = () => {
        const startScale = primaryStore.get(timelineScaleAtom);
        const startOffset = primaryStore.get(timelineOffsetAtom);

        const anim = new Konva.Animation((frame) => {
            if (!frame)
                return;

            // Calculate t
            const t = frame.time / ANIM_DURATION;
            const curvedT = Math.sin(t * Math.PI / 2);

            // Stop
            if (t >= 1) {
                setScale(ANIM_SCALE);
                setOffset(ANIM_OFFSET);
                anim.stop();
                return;
            }

            // Set scale and offset
            setScale(lerp(startScale, ANIM_SCALE, curvedT));
            setOffset(lerp(startOffset, ANIM_OFFSET, curvedT));
        });

        anim.start();
    };

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
                            onDoubleClick={() => onDoubleClick()}
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
            <TimelineTimesteps/>
            <TimelinePlayheadHandle/>

        </TimelineRow>
    );
}