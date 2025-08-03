import React from "react";
import useViewportScale from "../../../hooks/canvas/useViewportScale";
import GUID from "../../../types/common/GUID";
import useElementSprite from "../../../hooks/canvas/sprite/useElementSprite";
import useIsElementSelected from "../../../hooks/elements/useIsElementSelected";
import mapElementEventEmitter from "../../../utils/canvas/mapElementEventEmitter";
import getOffsetFromElement from "../../../utils/canvas/getOffsetFromElement";
import useMapElementRef from "../../../hooks/canvas/useMapElementRef";

export interface SelectionOutlineOverlayProps {
    elementID: GUID;
}

export default function SelectionOutlineOverlay(props: SelectionOutlineOverlayProps) {
    const [isHovering, setIsHovering] = React.useState(false);
    const mapElementRef = useMapElementRef(props.elementID);
    const sprite = useElementSprite(props.elementID);
    const isSelected = useIsElementSelected(props.elementID);
    const viewportScale = useViewportScale();

    const spriteWidth = sprite?.width || 64; // Default width if sprite is not loaded
    const spriteHeight = sprite?.height || 64; // Default height if sprite is not loaded
    const strokeWidth = 2 / viewportScale; // Adjust stroke width based on viewport scale

    const topLeft = getOffsetFromElement(mapElementRef.current, {x: -spriteWidth / 2, y: -spriteHeight / 2});
    const bottomRight = getOffsetFromElement(mapElementRef.current, {x: spriteWidth / 2, y: spriteHeight / 2});
    const topRight = getOffsetFromElement(mapElementRef.current, {x: spriteWidth / 2, y: -spriteHeight / 2});
    const bottomLeft = getOffsetFromElement(mapElementRef.current, {x: -spriteWidth / 2, y: spriteHeight / 2});

    React.useEffect(() => {
        const handleMouseOver = (id: GUID) => {
            if (id === props.elementID)
                setIsHovering(true);
        };

        const handleMouseOut = (id: GUID) => {
            if (id === props.elementID)
                setIsHovering(false);
        };

        mapElementEventEmitter.on("mouseOver", handleMouseOver);
        mapElementEventEmitter.on("mouseOut", handleMouseOut);

        return () => {
            mapElementEventEmitter.off("mouseOver", handleMouseOver);
            mapElementEventEmitter.off("mouseOut", handleMouseOut);
        };

    }, [props.elementID]);

    if (!isSelected && !isHovering)
        return null;
    return (
        <pixiGraphics
            draw={(g) => {
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

                // g.rect(0, 0, spriteWidth, spriteHeight).stroke({
                //     color: 0xFFFFFF,
                //     width: strokeWidth,
                //     alpha: isSelected ? 0.5 : 0.25,
                // });
            }}
        />
    );
}