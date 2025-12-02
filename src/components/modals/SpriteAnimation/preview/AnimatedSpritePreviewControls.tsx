import {Box, IconButton, Tooltip} from "@mui/material";
import React from "react";
import {Pause, PlayArrow, Repeat, Stop} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import useSelectedElemProp from "../../../../hooks/elements/useSelectedElemProperty";
import useSpriteAnimPlaying from "../../../../hooks/spriteAnim/playback/useSpriteAnimPlaying";
import spriteAnimEventEmitter from "../../../../utils/spriteAnim/spriteAnimEventEmitter";

export default function AnimatedSpritePreviewControls() {
    const {t} = useTranslation();
    const [_isLoop, setLoop] = useSelectedElemProp("loopGIF");
    const isLoop = _isLoop ?? true;
    const [isPlaying, setIsPlaying] = useSpriteAnimPlaying();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                mt: 1,
            }}
        >
            {isPlaying && (
                <IconButton onClick={() => setIsPlaying(false)}>
                    <Pause/>
                </IconButton>
            )}
            {!isPlaying && (
                <IconButton onClick={() => setIsPlaying(true)}>
                    <PlayArrow/>
                </IconButton>
            )}

            <IconButton
                onClick={() => {
                    setIsPlaying(false);
                    spriteAnimEventEmitter.emit("stopPlayback");
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
    );
}