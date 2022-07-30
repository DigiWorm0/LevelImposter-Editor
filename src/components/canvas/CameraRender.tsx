import { Rect } from "react-konva";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";
import { DEFAULT_CAM_ASPECT, DEFAULT_CAM_SIZE, UNITY_SCALE } from "../../types/generic/Constants";


export default function CameraRender() {
    const selectedElem = useSelectedElemValue();

    if (!selectedElem
        || selectedElem.type !== "util-cam")
        return null;

    const { camXOffset, camYOffset, camZoom } = selectedElem.properties;
    const { x, y } = selectedElem;

    const camHeight = (camZoom ? camZoom * 2 : DEFAULT_CAM_SIZE) * UNITY_SCALE;
    const camWidth = camHeight * DEFAULT_CAM_ASPECT;

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