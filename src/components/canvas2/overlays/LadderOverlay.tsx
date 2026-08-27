import GUID from "../../../types/common/GUID";
import {
    DEFAULT_LADDER_HEIGHTS,
    DEFAULT_LADDER_OFFSET,
    LADDER_RADIUS,
    UNITY_SCALE
} from "@/types/amongus/Constants";
import getOffsetFromElement from "../../../utils/canvas/getOffsetFromElement";
import useMapElementRef from "../../../hooks/canvas/useMapElementRef";
import TickingGraphics from "../common/TickingGraphics";
import {useElement} from "@/hooks/elements/useElement";

export interface LadderOverlayProps {
    elementID: GUID;
}

export default function LadderOverlay(props: LadderOverlayProps) {
    const mapElementRef = useMapElementRef(props.elementID);
    const element = useElement(props.elementID);

    const ladderOffset = element?.properties.ladderOffset ?? DEFAULT_LADDER_OFFSET;
    const height = element?.properties.ladderHeight ?? DEFAULT_LADDER_HEIGHTS[element?.type ?? "util-ladder1"];

    if (!element || !element?.type.startsWith("util-ladder"))
        return null;
    return (
        <TickingGraphics
            draw={(g) => {
                // Get the top and bottom offsets of the ladder
                const topOffset = getOffsetFromElement(mapElementRef.current, {
                    x: 0,
                    y: (height + ladderOffset) * UNITY_SCALE
                });
                const bottomOffset = getOffsetFromElement(mapElementRef.current, {
                    x: 0,
                    y: (-height + ladderOffset) * UNITY_SCALE
                });

                const drawCircle = (direction: "top" | "bottom") => {
                    if (!mapElementRef.current)
                        return;

                    const offset = direction === "top" ? topOffset : bottomOffset;

                    g.arc(
                        offset.x,
                        offset.y,
                        LADDER_RADIUS * UNITY_SCALE,
                        0,
                        Math.PI * 2,
                        false
                    )
                        .fill({color: 0xffaa00, alpha: 0.4})
                        .stroke({color: 0xffaa00, width: 4, alignment: 0.5})
                        .closePath();
                };

                // Draw the top and bottom circles
                drawCircle("top");
                drawCircle("bottom");

                // Draw the ladder line
                g.moveTo(topOffset.x, topOffset.y)
                    .lineTo(bottomOffset.x, bottomOffset.y)
                    .stroke({color: 0xffaa00, width: 4, alignment: 0.5});
            }}
        />
    );
}