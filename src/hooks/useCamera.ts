import React from "react";

const PAN_SPEED = 10;
const ZOOM_SPEED = 1.1;

export default function useCamera() {
    const [x, setX] = React.useState(0);
    const [y, setY] = React.useState(0);
    const [zoom, setZoom] = React.useState(1);
    const [, setVersion] = React.useState(0);

    const onMouseScroll = (e: WheelEvent) => {
        e.preventDefault();
        setZoom(z => z * (e.deltaY < 0 ? ZOOM_SPEED : 1 / ZOOM_SPEED));
    }

    React.useEffect(() => {
        document.addEventListener('wheel', onMouseScroll);
        window.onresize = () => {
            setVersion(v => v + 1);
        }

        return () => {
            document.removeEventListener('wheel', onMouseScroll);
            window.onresize = null;
        }
    }, []);

    return {
        x: x,
        y: y,
        z: zoom,
    };
}