import React from "react";
import useViewportScale from "../../../hooks/canvas/useViewportScale";
import GUID from "@shared/types/GUID";
import useElementSprite from "../../../hooks/sprites/useElementSprite";
import useIsElementSelected from "../../../hooks/elements/useIsElementSelected";
import getOffsetFromElement from "../../../utils/canvas/getOffsetFromElement";
import useMapElementRef from "../../../hooks/canvas/useMapElementRef";
import useIsHoveringOverMapElement from "../../../hooks/canvas/useIsHoveringOverMapElement";
import TickingGraphics from "../common/TickingGraphics";

export interface SelectionOutlineOverlayProps {
    elementID: GUID;
}

export default function SelectionOutlineOverlay(props: SelectionOutlineOverlayProps) {
    const isSelected = useIsElementSelected(props.elementID);
    const isHovering = useIsHoveringOverMapElement(props.elementID);
    const mapElementRef = useMapElementRef(props.elementID);
    const sprite = useElementSprite(props.elementID);
    const viewportScale = useViewportScale();

    if (!sprite)
        return null;

    const spriteWidth = sprite.width;
    const spriteHeight = sprite.height;
    const strokeWidth = 2 / viewportScale;

    if (!isSelected && !isHovering)
        return null;
    return (
        <TickingGraphics
            draw={(g) => {
                if (!mapElementRef.current)
                    return;

                const topLeft = getOffsetFromElement(mapElementRef.current, {
                    x: -spriteWidth / 2,
                    y: -spriteHeight / 2
                });
                const bottomRight = getOffsetFromElement(mapElementRef.current, {
                    x: spriteWidth / 2,
                    y: spriteHeight / 2
                });
                const topRight = getOffsetFromElement(mapElementRef.current, {
                    x: spriteWidth / 2,
                    y: -spriteHeight / 2
                });
                const bottomLeft = getOffsetFromElement(mapElementRef.current, {
                    x: -spriteWidth / 2,
                    y: spriteHeight / 2
                });

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
            }}
        />
    );
}