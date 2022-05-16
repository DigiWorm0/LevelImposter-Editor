import React from "react";
import useKeyboard from "./useKeyboard";

export default function useCamera() {
    const [x, setX] = React.useState(0);
    const [y, setY] = React.useState(0);
    const [zoom, setZoom] = React.useState(1);
    const keys = useKeyboard();

    React.useEffect(() => {
        keys.forEach(keyCode => {
            switch (keyCode) {
                case "ArrowUp":
                    setY(y + 1);
                    break;
                case "ArrowDown":
                    setY(y - 1);
                    break;
                case "ArrowLeft":
                    setX(x - 1);
                    break;
                case "ArrowRight":
                    setX(x + 1);
                    break;
                case "KeyZ":
                    setZoom(zoom * 1.1);
                    break;
                case "KeyX":
                    setZoom(zoom / 1.1);
                    break;
            }
        });
    }, [keys]);

    return {
        x: x + window.innerWidth / 2,
        y: y + window.innerHeight / 2,
        z: zoom,
    };
}