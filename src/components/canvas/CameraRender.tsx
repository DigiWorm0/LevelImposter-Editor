import { Rect } from "react-konva";
import { useSelectedElemValue } from "../../hooks/elements/useSelectedElem";
import {
    DEFAULT_CAM_ASPECT,
    DEFAULT_CAM_SIZE,
    DEFAULT_DISPLAY_HEIGHT,
    DEFAULT_DISPLAY_WIDTH,
    UNITY_SCALE
} from "../../types/generic/Constants";

export default function CameraRender() {
    const selectedElem = useSelectedElemValue();

    // Check if selected element is a camera
    if (!selectedElem)
        return null;
    if (selectedElem.type !== "util-cam" &&
        selectedElem.type !== "util-cams4" &&
        selectedElem.type !== "util-display")
        return null;

    // Camera Properties
    const { camXOffset, camYOffset, camZoom } = selectedElem.properties;
    const { x, y } = selectedElem;

    // Aspect Ratio
    let aspectRatio = DEFAULT_CAM_ASPECT;
    if (selectedElem.type === "util-display") {
        const { displayWidth, displayHeight } = selectedElem.properties;
        aspectRatio = (displayWidth ?? DEFAULT_DISPLAY_WIDTH) / (displayHeight ?? DEFAULT_DISPLAY_HEIGHT);
    }

    // Dimensions
    const camHeight = (camZoom ? camZoom * 2 : DEFAULT_CAM_SIZE) * UNITY_SCALE;
    const camWidth = camHeight * aspectRatio;

    // Position
    const camX = (camXOffset ? (camXOffset + x) : x) * UNITY_SCALE;
    const camY = (camYOffset ? (-camYOffset - y) : -y) * UNITY_SCALE;

    return (
        <Rect
            x={camX - camWidth / 2}
            y={camY - camHeight / 2}
            width={camWidth}
            height={camHeight}
            fill="#00ff0022"
            stroke="green"
            strokeWidth={5}
            listening={false}
        />
    );
}