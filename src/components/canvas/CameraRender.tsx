import { Rect } from "react-konva";
import useElement from "../../hooks/useElement";
import GUID from "../../types/generic/GUID";

const UNITY_SCALE = 100;
const CAM_SIZE = 5; // TODO: Get the actual size of the camera

export default function CameraRender(props: { elementID: GUID }) {
    const [elem] = useElement(props.elementID);

    if (elem.type !== "util-cam")
        return null;

    const { camXOffset, camYOffset, camZoom } = elem.properties;

    const camSize = (camZoom ? camZoom : 1) * CAM_SIZE * UNITY_SCALE;
    const camX = camXOffset ? camXOffset * UNITY_SCALE : 0;
    const camY = camYOffset ? camYOffset * UNITY_SCALE : 0;

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