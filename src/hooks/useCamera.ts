import React from "react";

const ZOOM_SPEED = 1.1;

export default function useCamera(w: number, h: number) {
    const [x, setX] = React.useState(-w / 2);
    const [y, setY] = React.useState(-h / 2);
    const [zoom, setZoom] = React.useState(1);

    const onMouseScroll = (e: WheelEvent) => {
        if ((e.target as HTMLElement).tagName.toLowerCase() !== "canvas")
            return;
        e.preventDefault();
        const zoomDelta = e.deltaY < 0 ? ZOOM_SPEED : 1 / ZOOM_SPEED;
        setZoom(z => z * zoomDelta);
        setX(x => ((x + (w / 2)) * zoomDelta) - (w / 2));
        setY(y => ((y + (h / 2)) * zoomDelta) - (h / 2));
    }

    React.useEffect(() => {
        document.addEventListener('wheel', onMouseScroll);
        return () => {
            document.removeEventListener('wheel', onMouseScroll);
            window.onresize = null;
        }
    }, [w, h]);

    return {
        x: x,
        y: y,
        z: zoom,
        width: w,
        height: h,
        setX,
        setY,
    };
}