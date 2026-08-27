import {Box, IconButton, Tooltip} from "@mui/material";
import {Pause, PlayArrow, Repeat, Stop} from "@mui/icons-material";
import TimelineRow from "../TimelineRow";
import TimelineTimesteps from "./TimelineTimesteps";
import TimelinePlayheadHandle from "./TimelinePlayheadHandle";
import useIsAnimPlaying from "../../../hooks/timeline/useIsAnimPlaying";
import {useSetPlayhead} from "@/hooks/timeline/usePlayhead";
import TimelineTimestamp from "./TimelineTimestamp";
import useSelectedElemProp from "../../../hooks/elements/useSelectedElemProperty";
import {useTranslation} from "react-i18next";

export default function TimelineHeader() {
    const {t} = useTranslation();
    const [isLoop, setLoop] = useSelectedElemProp("triggerLoop");
    const [playAnim, setPlayAnim] = useIsAnimPlaying();
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
                        <IconButton onClick={() => setPlayAnim(!playAnim)}>
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

                        <Tooltip title={t("anim.loop")}>
                            <IconButton onClick={() => setLoop(!isLoop)}>
                                {isLoop ?
                                    <Repeat color={"success"}/> :
                                    <Repeat color={"disabled"}/>
                                }
                            </IconButton>
                        </Tooltip>
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