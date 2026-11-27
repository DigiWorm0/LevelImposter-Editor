import {Box, Typography} from "@mui/material";
import React from "react";
import {Animation} from "@mui/icons-material";
import {useAtomValue} from "jotai";
import {selectedSpriteAnimAtom} from "@editor/spriteAnim/spriteAnimStore";

export default function SpriteAnimEditorNoAnimationError() {
    const animation = useAtomValue(selectedSpriteAnimAtom);

    if (animation)
        return null;
    return (
        <Box
            sx={{
                width: "100%",
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
            }}
        >
            <Animation
                sx={{fontSize: 64}}
                color={"disabled"}
            />
            <Typography
                sx={{mt: 1}}
                variant={"body2"}
                color={"text.secondary"}
            >
                Upload frames to make an animation here.
            </Typography>
        </Box>
    );
}
