import GUID from "../../../types/common/GUID";
import {
    DEFAULT_PLATFORM_ENTER,
    DEFAULT_PLATFORM_EXIT,
    DEFAULT_PLATFORM_OFFSET,
    PLATFORM_RADIUS,
    UNITY_SCALE
} from "@/types/amongus/Constants";
import TickingGraphics from "../common/TickingGraphics";
import getOffsetFromElement from "../../../utils/canvas/getOffsetFromElement";
import useMapElementRef from "../../../hooks/canvas/useMapElementRef";
import {useElement} from "@/hooks/elements/useElement";

export interface PlatformOverlayProps {
    elementID: GUID;
}

export default function PlatformPathOverlay(props: PlatformOverlayProps) {
    const element = useElement(props.elementID);
    const mapElementRef = useMapElementRef(props.elementID);

    if (!element || !element.type.startsWith("util-platform"))
        return null;

    const {
        platformYOffset,
        platformXOffset,
        platformXEntranceOffset,
        platformYEntranceOffset,
        platformXExitOffset,
        platformYExitOffset,
    } = element.properties;


    const xOffset = platformXOffset ?? DEFAULT_PLATFORM_OFFSET;
    const yOffset = platformYOffset ?? 0;

    const xEntranceOffset = platformXEntranceOffset ?? DEFAULT_PLATFORM_ENTER;
    const yEntranceOffset = platformYEntranceOffset ?? 0;

    const xExitOffset = platformXExitOffset ?? DEFAULT_PLATFORM_EXIT;
    const yExitOffset = platformYExitOffset ?? 0;

    return (
        <TickingGraphics
            draw={(g) => {
                // Movement Path
                const movementOffset = getOffsetFromElement(mapElementRef.current, {
                    x: xOffset * -UNITY_SCALE,
                    y: yOffset * UNITY_SCALE
                });

                g.moveTo(0, 0)
                    .lineTo(movementOffset.x, movementOffset.y)
                    .stroke({color: 0xffaa00, width: 4, alignment: 0.5})
                    .closePath();

                // Entrance Offset
                const entranceOffset = getOffsetFromElement(mapElementRef.current, {
                    x: xEntranceOffset * -UNITY_SCALE,
                    y: yEntranceOffset * UNITY_SCALE
                });

                g.arc(
                    entranceOffset.x,
                    entranceOffset.y,
                    PLATFORM_RADIUS * UNITY_SCALE,
                    0,
                    2 * Math.PI,
                    false
                )
                    .fill({color: 0xffaa00, alpha: 0.4})
                    .stroke({color: 0xffaa00, width: 4, alignment: 0.5})
                    .closePath();

                // Exit Offset
                const exitOffset = getOffsetFromElement(mapElementRef.current, {
                    x: (xExitOffset + xOffset) * -UNITY_SCALE,
                    y: (yExitOffset + yOffset) * UNITY_SCALE
                });

                g.arc(
                    exitOffset.x,
                    exitOffset.y,
                    PLATFORM_RADIUS * UNITY_SCALE,
                    0,
                    2 * Math.PI,
                    false
                )
                    .fill({color: 0xffaa00, alpha: 0.4})
                    .stroke({color: 0xffaa00, width: 4, alignment: 0.5})
                    .closePath();
            }}
        />
    );
}