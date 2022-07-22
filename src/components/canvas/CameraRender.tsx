import { Rect } from "react-konva";
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

    const camHeight = (camZoom ? camZoom * 2 : CAM_SIZE) * UNITY_SCALE;
    const camWidth = camHeight * CAM_ASPECT;

    const camX = camXOffset ? camXOffset * UNITY_SCALE : 0;
    const camY = camYOffset ? -camYOffset * UNITY_SCALE : 0;

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