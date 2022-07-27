import { Rect, Shape } from "react-konva";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";

const UNITY_SCALE = 100;
const CAM_SIZE = 6;
const CAM_ASPECT = 1.5;

export default function CameraRender() {
    const selectedElem = useSelectedElemValue();

    if (!selectedElem
        || selectedElem.type !== "util-cam")
        return null;

    const { camXOffset, camYOffset, camZoom } = selectedElem.properties;

    const { x, y } = selectedElem;

    const camHeight = (camZoom ? camZoom * 2 : CAM_SIZE) * UNITY_SCALE;
    const camWidth = camHeight * CAM_ASPECT;

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