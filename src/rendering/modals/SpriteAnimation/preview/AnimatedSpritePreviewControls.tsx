import {Box, IconButton, Tooltip} from "@mui/material";
import React from "react";
import {Pause, PlayArrow, Repeat, Stop} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import {useAtom} from "jotai";
import spriteAnimEventEmitter from "@editor/assets/animations/spriteAnimEventEmitter";
import {isSpriteAnimPlayingAtom, selectedSpriteAnimAtom} from "@editor/spriteAnim/spriteAnimStore";

export default function AnimatedSpritePreviewControls() {
    const {t} = useTranslation();
    const [animation, setAnimation] = useAtom(selectedSpriteAnimAtom);
    const [isPlaying, setIsPlaying] = useAtom(isSpriteAnimPlayingAtom);

    const isLoop = animation?.loop ?? true;
    const setLoop = (newLoop: boolean) => {
        if (!animation)
            return;
        setAnimation({...animation, loop: newLoop});
    };

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
