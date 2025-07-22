import GUID from "../../../types/common/GUID";
import {useElementValue} from "../../../hooks/elements/useElements";
import {DEFAULT_DISPLAY_HEIGHT, DEFAULT_DISPLAY_WIDTH} from "../../../types/amongus/Constants";

export interface DisplayOverlayProps {
    elementID: GUID;
}

export default function DisplayOverlay(props: DisplayOverlayProps) {
    const element = useElementValue(props.elementID);

    const camHeight = element?.properties.displayHeight ?? DEFAULT_DISPLAY_HEIGHT;
    const camWidth = element?.properties.displayWidth ?? DEFAULT_DISPLAY_WIDTH;

    if (!element || element.type !== "util-display")
        return null;
    return (
        <pixiGraphics
            eventMode={"none"}
            draw={(g) => {
                g.clear();
                g.rect(
                    -camWidth / 2,
                    -camHeight / 2,
                    camWidth,
                    camHeight
                )
                    .fill({color: "green", alpha: 0.4})
                    .stroke({color: "green", width: 5, alignment: 0.5});
            }}
        />
    )
}