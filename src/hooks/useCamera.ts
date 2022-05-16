import React from "react";
import useKeyboard from "./useKeyboard";

const PAN_SPEED = 5;
const ZOOM_SPEED = 1.1;

export default function useCamera() {
    const [x, setX] = React.useState(0);
    const [y, setY] = React.useState(0);
    const [zoom, setZoom] = React.useState(1);
    const keys = useKeyboard();

    React.useEffect(() => {
        keys.forEach(keyCode => {
            switch (keyCode) {
                case "w":
                    setY(y + PAN_SPEED);
                    break;
                case "s":
                    setY(y - PAN_SPEED);
                    break;
                case "a":
                    setX(x - PAN_SPEED);
                    break;
                case "d":
                    setX(x + PAN_SPEED);
                    break;
                case "q":
                    setZoom(zoom * ZOOM_SPEED);
                    break;
                case "e":
                    setZoom(zoom / ZOOM_SPEED);
                    break;
            }
        });
    }, [keys]);

    return {
        x: x,
        y: y,
        z: zoom,
    };
}