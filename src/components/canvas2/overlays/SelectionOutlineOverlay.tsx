import React from "react";
import useViewportScale from "../../../hooks/canvas/useViewportScale";
import GUID from "../../../types/common/GUID";
import useElementSprite from "../../../hooks/canvas/sprite/useElementSprite";
import useIsElementSelected from "../../../hooks/elements/useIsElementSelected";
import getOffsetFromElement from "../../../utils/canvas/getOffsetFromElement";
import useMapElementRef from "../../../hooks/canvas/useMapElementRef";
import {Graphics} from "pixi.js";
import useIsHoveringOverMapElement from "../../../hooks/canvas/useIsHoveringOverMapElement";
import {useTick} from "@pixi/react";

export interface SelectionOutlineOverlayProps {
    elementID: GUID;
}

export default function SelectionOutlineOverlay(props: SelectionOutlineOverlayProps) {
    const isSelected = useIsElementSelected(props.elementID);
    const isHovering = useIsHoveringOverMapElement(props.elementID);
    const mapElementRef = useMapElementRef(props.elementID);
    const sprite = useElementSprite(props.elementID);
    const viewportScale = useViewportScale();
    const graphicsRef = React.useRef<Graphics>(null);

    const spriteWidth = sprite?.width || 64; // Default width if sprite is not loaded
    const spriteHeight = sprite?.height || 64; // Default height if sprite is not loaded
    const strokeWidth = 2 / viewportScale; // Adjust stroke width based on viewport scale

    useTick(() => {
        if (!graphicsRef.current)
            return;

        const topLeft = getOffsetFromElement(mapElementRef.current, {x: -spriteWidth / 2, y: -spriteHeight / 2});
        const bottomRight = getOffsetFromElement(mapElementRef.current, {x: spriteWidth / 2, y: spriteHeight / 2});
        const topRight = getOffsetFromElement(mapElementRef.current, {x: spriteWidth / 2, y: -spriteHeight / 2});
        const bottomLeft = getOffsetFromElement(mapElementRef.current, {x: -spriteWidth / 2, y: spriteHeight / 2});

        const g = graphicsRef.current;
        g.clear();
        g.moveTo(topLeft.x, topLeft.y)
            .lineTo(topRight.x, topRight.y)
            .lineTo(bottomRight.x, bottomRight.y)
            .lineTo(bottomLeft.x, bottomLeft.y)
            .lineTo(topLeft.x, topLeft.y)
            .closePath()
            .stroke({
                color: 0xFFFFFF,
                width: strokeWidth,
                alpha: isSelected ? 0.5 : 0.25,
            });
    });

    if (!isSelected && !isHovering)
        return null;
    return (
        <pixiGraphics
            ref={graphicsRef}
            draw={() => {
            }}
        />
    );
}