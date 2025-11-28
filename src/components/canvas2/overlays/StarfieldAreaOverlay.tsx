import TickingGraphics from "../common/TickingGraphics";
import getOffsetFromElement from "../../../utils/canvas/getOffsetFromElement";
import useMapElementRef from "../../../hooks/canvas/useMapElementRef";
import {DEFAULT_STARFIELD_HEIGHT, DEFAULT_STARFIELD_LENGTH, UNITY_SCALE} from "../../../types/amongus/Constants";
import {useElementValue} from "../../../hooks/elements/useElements";
import GUID from "../../../types/common/GUID";

export interface StarfieldAreaOverlayProps {
    elementID: GUID;
}

export default function StarfieldAreaOverlay(props: StarfieldAreaOverlayProps) {
    const element = useElementValue(props.elementID);
    const mapElementRef = useMapElementRef(props.elementID);

    const height = element?.properties.starfieldHeight ?? DEFAULT_STARFIELD_HEIGHT;
    const length = element?.properties.starfieldLength ?? DEFAULT_STARFIELD_LENGTH;

    if (!element || element.type !== "util-starfield")
        return null;
    return (
        <TickingGraphics
            draw={(g) => {
                const topLeft = getOffsetFromElement(mapElementRef.current, {
                    x: 0,
                    y: (-height / 2) * UNITY_SCALE
                });
                const bottomRight = getOffsetFromElement(mapElementRef.current, {
                    x: length * UNITY_SCALE,
                    y: (height / 2) * UNITY_SCALE
                });
                const topRight = getOffsetFromElement(mapElementRef.current, {
                    x: length * UNITY_SCALE,
                    y: (-height / 2) * UNITY_SCALE
                });
                const bottomLeft = getOffsetFromElement(mapElementRef.current, {
                    x: 0,
                    y: (height / 2) * UNITY_SCALE
                });

                g.moveTo(topLeft.x, topLeft.y)
                    .lineTo(topRight.x, topRight.y)
                    .lineTo(bottomRight.x, bottomRight.y)
                    .lineTo(bottomLeft.x, bottomLeft.y)
                    .lineTo(topLeft.x, topLeft.y)
                    .closePath()
                    .stroke({color: 0xffaa00, width: 5});
            }}
        />
    );
}
