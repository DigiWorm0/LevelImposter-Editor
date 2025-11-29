import GUID from "../../../types/common/GUID";
import {useElementValue} from "../../../hooks/elements/useElements";
import {DEFAULT_DISPLAY_HEIGHT, DEFAULT_DISPLAY_WIDTH} from "../../../types/amongus/Constants";
import TickingGraphics from "../common/TickingGraphics";
import getOffsetFromElement from "../../../utils/canvas/getOffsetFromElement";
import useMapElementRef from "../../../hooks/canvas/useMapElementRef";

export interface DisplayOverlayProps {
    elementID: GUID;
}

export default function DisplayOverlay(props: DisplayOverlayProps) {
    const element = useElementValue(props.elementID);
    const mapElementRef = useMapElementRef(props.elementID);

    const camHeight = element?.properties.displayHeight ?? DEFAULT_DISPLAY_HEIGHT;
    const camWidth = element?.properties.displayWidth ?? DEFAULT_DISPLAY_WIDTH;

    if (!element || element.type !== "util-display")
        return null;
    return (
        <TickingGraphics
            draw={(g) => {
                const topLeft = getOffsetFromElement(mapElementRef.current, {
                    x: -camWidth / 2,
                    y: -camHeight / 2
                });
                const bottomRight = getOffsetFromElement(mapElementRef.current, {
                    x: camWidth / 2,
                    y: camHeight / 2
                });
                const topRight = getOffsetFromElement(mapElementRef.current, {
                    x: camWidth / 2,
                    y: -camHeight / 2
                });
                const bottomLeft = getOffsetFromElement(mapElementRef.current, {
                    x: -camWidth / 2,
                    y: camHeight / 2
                });

                g.moveTo(topLeft.x, topLeft.y)
                    .lineTo(topRight.x, topRight.y)
                    .lineTo(bottomRight.x, bottomRight.y)
                    .lineTo(bottomLeft.x, bottomLeft.y)
                    .lineTo(topLeft.x, topLeft.y)
                    .closePath()
                    .stroke({color: 0x2889DE, width: 5})
                    .fill({color: 0x2889DE, alpha: 0.4});
            }}
        />
    );
}