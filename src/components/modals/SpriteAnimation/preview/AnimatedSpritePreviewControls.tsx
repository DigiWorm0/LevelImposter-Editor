import {Box, IconButton, Tooltip} from "@mui/material";
import React from "react";
import {PlayArrow, Repeat, Stop} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import useSelectedElemProp from "../../../../hooks/elements/useSelectedElemProperty";

export default function AnimatedSpritePreviewControls() {
    const {t} = useTranslation();
    const [_isLoop, setLoop] = useSelectedElemProp("loopGIF");
    const isLoop = _isLoop ?? true;

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
            <IconButton
                onClick={() => {
                }}
            >
                <PlayArrow/>
            </IconButton>
            <IconButton
                onClick={() => {
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