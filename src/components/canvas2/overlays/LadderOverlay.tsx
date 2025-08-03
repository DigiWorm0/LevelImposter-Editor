import GUID from "../../../types/common/GUID";
import {useElementValue} from "../../../hooks/elements/useElements";
import {
    DEFAULT_LADDER_HEIGHTS,
    DEFAULT_LADDER_OFFSET,
    LADDER_RADIUS,
    UNITY_SCALE
} from "../../../types/amongus/Constants";
import getOffsetFromElement from "../../../utils/canvas/getOffsetFromElement";
import useMapElementRef from "../../../hooks/canvas/useMapElementRef";

export interface LadderOverlayProps {
    elementID: GUID;
}

export default function LadderOverlay(props: LadderOverlayProps) {
    const mapElementRef = useMapElementRef(props.elementID);
    const element = useElementValue(props.elementID);

    const ladderOffset = element?.properties.ladderOffset ?? DEFAULT_LADDER_OFFSET;
    const height = element?.properties.ladderHeight ?? DEFAULT_LADDER_HEIGHTS[element?.type ?? "util-ladder1"];
    const topOffset = getOffsetFromElement(mapElementRef.current, {
        x: 0,
        y: (height + ladderOffset) * UNITY_SCALE
    });
    const bottomOffset = getOffsetFromElement(mapElementRef.current, {
        x: 0,
        y: (-height + ladderOffset) * UNITY_SCALE
    });

    if (!element || !element?.type.startsWith("util-ladder"))
        return null;
    return (
        <pixiGraphics
            eventMode={"none"}
            draw={(g) => {
                g.clear();

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

                drawCircle("top");
                drawCircle("bottom");

                g.moveTo(topOffset.x, topOffset.y)
                    .lineTo(bottomOffset.x, bottomOffset.y)
                    .stroke({color: 0xffaa00, width: 4, alignment: 0.5});

                g.closePath();
            }}
        />
    )
}