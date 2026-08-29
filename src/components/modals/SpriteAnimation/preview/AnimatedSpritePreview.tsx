import {Box, Typography} from "@mui/material";
import React from "react";
import {Application} from "@pixi/react";
import MapElementAnimatedSprite from "../../../canvas2/element/MapElementAnimatedSprite";
import AnimatedSpritePreviewControls from "./AnimatedSpritePreviewControls";
import useWindowSize from "../../../../hooks/canvas/useWindowSize";
import AnimatedSpritePreviewBackground from "./AnimatedSpritePreviewBackground";
import useSelectedSpriteAnim from "../../../../hooks/spriteAnim/useSelectedSpriteAnim";
import {useAtomValue} from "jotai";
import {selectedElementIDAtom} from "@editor/selection/stores/elementSelectionStore";

export default function AnimatedSpritePreview() {
    const selectedElementID = useAtomValue(selectedElementIDAtom);
    const [windowWidth, windowHeight] = useWindowSize();
    const [animation] = useSelectedSpriteAnim();

    const animationWindowSize = Math.min(windowWidth, windowHeight) * 0.4;

    if (!animation)
        return null;
    return (
        <Box
            sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
            }}
        >
            <Typography variant={"subtitle2"}>
                Preview
            </Typography>
            <Application
                backgroundAlpha={0}
                width={animationWindowSize}
                height={animationWindowSize}
            >
                <AnimatedSpritePreviewBackground
                    size={animationWindowSize}
                    cellSize={animationWindowSize / 30}
                />
                <MapElementAnimatedSprite
                    elementID={selectedElementID}
                    shouldAnimate
                />
            </Application>
            <AnimatedSpritePreviewControls/>
        </Box>
    );
}