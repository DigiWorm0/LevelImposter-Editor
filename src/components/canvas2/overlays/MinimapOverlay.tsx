import GUID from "../../../types/generic/GUID";
import {useElementValue} from "../../../hooks/elements/useElements";
import {MINIMAP_HEIGHT, MINIMAP_WIDTH, UNITY_SCALE} from "../../../types/generic/Constants";

export interface MinimapOverlayProps {
    elementID: GUID;
}

export default function MinimapOverlay(props: MinimapOverlayProps) {
    const element = useElementValue(props.elementID);

    const scale = element?.properties.minimapScale ?? 1;
    const width = MINIMAP_WIDTH * scale * UNITY_SCALE;
    const height = MINIMAP_HEIGHT * scale * UNITY_SCALE;

    if (!element || element.type !== "util-minimap")
        return null;
    return (
        <pixiGraphics
            eventMode={"none"}
            draw={(g) => {
                g.clear();
                g.rect(
                    -width / 2,
                    -height / 2,
                    width,
                    height
                )
                    .fill({color: "green", alpha: 0.4})
                    .stroke({color: "green", width: 5, alignment: 0.5});
            }}
        />
    )
}