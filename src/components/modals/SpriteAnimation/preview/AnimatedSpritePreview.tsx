import {Box} from "@mui/material";
import React from "react";
import {Application} from "@pixi/react";
import MapElementAnimatedSprite from "../../../canvas2/element/MapElementAnimatedSprite";
import {useSelectedElemIDValue} from "../../../../hooks/elements/useSelectedElem";
import {useSelectedElemPropValue} from "../../../../hooks/elements/useSelectedElemProperty";
import AnimatedSpritePreviewControls from "./AnimatedSpritePreviewControls";
import useWindowSize from "../../../../hooks/canvas/useWindowSize";
import AnimatedSpritePreviewBackground from "./AnimatedSpritePreviewBackground";

export default function AnimatedSpritePreview() {
    const selectedElementID = useSelectedElemIDValue();
    const animation = useSelectedElemPropValue("animation");
    const [windowWidth, windowHeight] = useWindowSize();

    const animationWindowSize = Math.min(windowWidth, windowHeight) * 0.4;

    if (!animation)
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