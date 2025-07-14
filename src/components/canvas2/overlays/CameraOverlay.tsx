import GUID from "../../../types/generic/GUID";
import {useElementValue} from "../../../hooks/elements/useElements";
import {
    DEFAULT_CAM_ASPECT,
    DEFAULT_CAM_SIZE,
    DEFAULT_DISPLAY_HEIGHT,
    DEFAULT_DISPLAY_WIDTH,
    UNITY_SCALE
} from "../../../types/generic/Constants";
import useViewportScale from "../../../hooks/canvas/useViewportScale";

export interface CameraOverlayProps {
    elementID: GUID;
}

export default function CameraOverlay(props: CameraOverlayProps) {
    const element = useElementValue(props.elementID);
    const scale = useViewportScale();

    // Camera Properties
    const camXOffset = element?.properties.camXOffset ?? 0;
    const camYOffset = element?.properties.camYOffset ?? 0;
    const camZoom = element?.properties.camZoom ?? DEFAULT_CAM_SIZE / 2;

    // Aspect Ratio
    let aspectRatio = DEFAULT_CAM_ASPECT;
    if (element?.type === "util-display") {
        const displayWidth = element.properties.displayWidth ?? DEFAULT_DISPLAY_WIDTH;
        const displayHeight = element.properties.displayHeight ?? DEFAULT_DISPLAY_HEIGHT;
        aspectRatio = displayWidth / displayHeight;
    }

    // Dimensions
    const camHeight = camZoom * 2 * UNITY_SCALE;
    const camWidth = camHeight * aspectRatio;

    if (element?.type !== "util-cam" &&
        element?.type !== "util-cams4" &&
        element?.type !== "util-display" &&
        element?.type !== "util-eject")
        return null;
    if (!element)
        return null;
    return (
        <pixiGraphics
            eventMode={"none"}
            draw={(g) => {
                g.clear();
                g.rect(
                    UNITY_SCALE * camXOffset - camWidth / 2,
                    UNITY_SCALE * -camYOffset - camHeight / 2,
                    camWidth,
                    camHeight
                )
                    .fill({color: "green", alpha: 0.4})
                    .stroke({color: "green", width: 5 / scale, alignment: 0.5});
            }}
        />
    )
}