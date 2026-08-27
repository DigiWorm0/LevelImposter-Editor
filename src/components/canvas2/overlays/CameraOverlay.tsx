import GUID from "../../../types/common/GUID";
import {
    DEFAULT_CAM_ASPECT,
    DEFAULT_CAM_SIZE,
    DEFAULT_DISPLAY_HEIGHT,
    DEFAULT_DISPLAY_WIDTH,
    SECONDARY_CAM_ASPECT,
    UNITY_SCALE
} from "@/types/amongus/Constants";
import {useElement} from "@/hooks/elements/useElement";

export interface CameraOverlayProps {
    elementID: GUID;
}

export default function CameraOverlay(props: CameraOverlayProps) {
    const element = useElement(props.elementID);

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
    const secondaryCamWidth = camHeight * SECONDARY_CAM_ASPECT;

    if (element?.type !== "util-cam" &&
        element?.type !== "util-cams4" &&
        element?.type !== "util-display" &&
        element?.type !== "util-eject")
        return null;
    if (!element)
        return null;
    return (
        <pixiContainer>
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
                        .stroke({color: "green", width: 5, alignment: 0.5});
                }}
            />
            <pixiGraphics
                eventMode={"none"}
                draw={(g) => {
                    g.clear();
                    g.rect(
                        UNITY_SCALE * camXOffset - secondaryCamWidth / 2,
                        UNITY_SCALE * -camYOffset - camHeight / 2,
                        secondaryCamWidth,
                        camHeight
                    )
                        .fill({color: "green", alpha: 0.1})
                        .stroke({color: "green", width: 5, alignment: 0.5});
                }}
            />
        </pixiContainer>
    );
}