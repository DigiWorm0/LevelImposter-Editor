import { Rect } from "react-konva";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";

const UNITY_SCALE = 100;
const CAM_SIZE = 6; // TODO: Get the actual size of the camera

export default function CameraRender() {
    const selectedElem = useSelectedElemValue();

    if (!selectedElem
        || selectedElem.type !== "util-cam")
        return null;

    const { camXOffset, camYOffset, camZoom } = selectedElem.properties;

    const camSize = (camZoom ? camZoom * 2 : CAM_SIZE) * UNITY_SCALE;
    const camX = camXOffset ? camXOffset * UNITY_SCALE : 0;
    const camY = camYOffset ? -camYOffset * UNITY_SCALE : 0;

    return (
        <Rect
            x={camX - camSize / 2}
            y={camY - camSize / 2}
            width={camSize}
            height={camSize}
            fill="#00ff0022"
            stroke="green"
            strokeWidth={10}
            listening={false}
        />
    );
}