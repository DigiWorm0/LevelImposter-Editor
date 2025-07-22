import GUID from "../../../types/common/GUID";
import {useElementValue} from "../../../hooks/elements/useElements";
import {
    DEFAULT_LADDER_HEIGHTS,
    DEFAULT_LADDER_OFFSET,
    LADDER_RADIUS,
    UNITY_SCALE
} from "../../../types/amongus/Constants";

export interface LadderOverlayProps {
    elementID: GUID;
}

export default function LadderOverlay(props: LadderOverlayProps) {
    const element = useElementValue(props.elementID);

    const ladderOffset = element?.properties.ladderOffset ?? DEFAULT_LADDER_OFFSET;
    const height = element?.properties.ladderHeight ?? DEFAULT_LADDER_HEIGHTS[element?.type ?? "util-ladder1"];
    const topOffset = height + ladderOffset;
    const bottomOffset = -height + ladderOffset;

    if (!element || !element?.type.startsWith("util-ladder"))
        return null;
    return (
        <pixiGraphics
            eventMode={"none"}
            draw={(g) => {
                g.clear();

                const drawCircle = (direction: "top" | "bottom") => {
                    const yOffset = direction === "top" ? topOffset : bottomOffset;
                    g.arc(
                        0,
                        -yOffset * UNITY_SCALE,
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

                g.moveTo(0, -topOffset * UNITY_SCALE)
                    .lineTo(0, -bottomOffset * UNITY_SCALE)
                    .stroke({color: 0xffaa00, width: 4, alignment: 0.5});

                g.closePath();
            }}
        />
    )
}