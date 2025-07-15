import GUID from "../../../types/generic/GUID";
import {useElementValue} from "../../../hooks/elements/useElements";
import {DEFAULT_SPORE_GAS_RANGE, UNITY_SCALE} from "../../../types/generic/Constants";

export interface SporeOverlayProps {
    elementID: GUID;
}

export default function SporeOverlay(props: SporeOverlayProps) {
    const element = useElementValue(props.elementID);

    const radius = element?.properties.sporeRange ?? DEFAULT_SPORE_GAS_RANGE;

    if (!element || element.type !== "util-spore")
        return null;
    return (
        <pixiGraphics
            eventMode={"none"}
            draw={(g) => {
                g.clear();

                g.beginPath();
                g.arc(0, 0, radius * UNITY_SCALE, 0, Math.PI * 2, false)
                    .fill({color: 0x00aaff, alpha: 0.4})
                    .stroke({color: 0x00aaff, width: 4, alignment: 0.5});
                g.closePath();
                g.stroke();
            }}
        />
    )
}