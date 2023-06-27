import { Rect } from "react-konva";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";
import { DEFAULT_CAM_ASPECT, DEFAULT_CAM_SIZE, DEFAULT_DISPLAY_WIDTH, DEFAULT_DISPLAY_HEIGHT, UNITY_SCALE } from "../../types/generic/Constants";

export default function CameraRender() {
    const selectedElem = useSelectedElemValue();

    if (!selectedElem
        || (selectedElem.type !== "util-cam" && selectedElem.type !== "util-display"))
        return null;

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
            strokeWidth={10}
            listening={false}
        />
    );
}