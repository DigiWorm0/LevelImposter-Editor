import GUID from "../../../types/common/GUID";
import {useElementValue} from "../../../hooks/elements/useElements";
import {
    DEFAULT_PLATFORM_ENTER,
    DEFAULT_PLATFORM_EXIT,
    DEFAULT_PLATFORM_OFFSET,
    PLATFORM_RADIUS,
    UNITY_SCALE
} from "../../../types/amongus/Constants";

export interface PlatformOverlayProps {
    elementID: GUID;
}

export default function PlatformOverlay(props: PlatformOverlayProps) {
    const element = useElementValue(props.elementID);

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
        <pixiGraphics
            eventMode={"none"}
            draw={(g) => {
                g.clear();
                g.beginPath();
                g.moveTo(0, 0)
                    .lineTo(xOffset * UNITY_SCALE, -yOffset * UNITY_SCALE)
                    .stroke({color: 0xffaa00, width: 4, alignment: 0.5});
                g.closePath();

                g.beginPath();
                g.arc(
                    xEntranceOffset * UNITY_SCALE,
                    -yEntranceOffset * UNITY_SCALE,
                    PLATFORM_RADIUS * UNITY_SCALE,
                    0,
                    2 * Math.PI,
                    false
                )
                    .fill({color: 0xffaa00, alpha: 0.4})
                    .stroke({color: 0xffaa00, width: 4, alignment: 0.5});
                g.closePath();

                g.beginPath();
                g.arc(
                    (xExitOffset + xOffset) * UNITY_SCALE,
                    -(yExitOffset + yOffset) * UNITY_SCALE,
                    PLATFORM_RADIUS * UNITY_SCALE,
                    0,
                    2 * Math.PI,
                    false
                )
                    .fill({color: 0xffaa00, alpha: 0.4})
                    .stroke({color: 0xffaa00, width: 4, alignment: 0.5});
                g.closePath();
            }}
        />
    );
}