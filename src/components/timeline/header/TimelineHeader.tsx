import {Box, IconButton, Tooltip} from "@mui/material";
import {Pause, PlayArrow, Repeat, Stop} from "@mui/icons-material";
import TimelineRow from "../TimelineRow";
import TimelineTimesteps from "./TimelineTimesteps";
import TimelinePlayheadHandle from "./TimelinePlayheadHandle";
import TimelineTimestamp from "./TimelineTimestamp";
import useSelectedElemProp from "../../../hooks/elements/useSelectedElemProperty";
import {useTranslation} from "react-i18next";
import {useAtomValue} from "jotai";
import {isAnimatorsPlayingAtom} from "@editor/animators/animatorPlaybackStore";
import {stopAnimators, toggleAnimators} from "@editor/animators/setPlaybackState";

export default function TimelineHeader() {
    const {t} = useTranslation();
    const [isLoop, setLoop] = useSelectedElemProp("triggerLoop");
    const playAnim = useAtomValue(isAnimatorsPlayingAtom);

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
                        <IconButton onClick={() => toggleAnimators()}>
                            {playAnim ? <Pause/> : <PlayArrow/>}
                        </IconButton>
                        <IconButton onClick={() => stopAnimators()}>
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