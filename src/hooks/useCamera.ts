import React from "react";
import useKey from "./useKey";
import useKeyboard from "./useKeyboard";

const PAN_SPEED = 10;
const ZOOM_SPEED = 1.1;

export default function useCamera() {
    const [x, setX] = React.useState(0);
    const [y, setY] = React.useState(0);
    const [zoom, setZoom] = React.useState(1);

    useKey("w", () => setY(y => y + PAN_SPEED));
    useKey("s", () => setY(y => y - PAN_SPEED));
    useKey("a", () => setX(x => x - PAN_SPEED));
    useKey("d", () => setX(x => x + PAN_SPEED));
    useKey("q", () => setZoom(zoom => zoom * ZOOM_SPEED));
    useKey("e", () => setZoom(zoom => zoom / ZOOM_SPEED));

    return {
        x: x,
        y: y,
        z: zoom,
    };
}