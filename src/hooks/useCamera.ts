import { useAtom } from "jotai";
import React from "react";
import { useSetMousePos } from "./input/useMousePos";
import { camXAtom, camYAtom, camZAtom } from "./jotai/Jotai";

const ZOOM_SPEED = 1.1;
const UNITY_SCALE = 100;

export default function useCamera(w: number, h: number) {
    const setMousePos = useSetMousePos();
    const [x, setX] = useAtom(camXAtom);
    const [y, setY] = useAtom(camYAtom);
    const [zoom, setZoom] = useAtom(camZAtom);

    const onMouseScroll = (e: WheelEvent) => {
        if ((e.target as HTMLElement).tagName.toLowerCase() !== "canvas")
            return;
        const zoomDelta = e.deltaY < 0 ? ZOOM_SPEED : 1 / ZOOM_SPEED;
        setZoom(z => z * zoomDelta);
        setX(x => ((x + (w / 2)) * zoomDelta) - (w / 2));
        setY(y => ((y + (h / 2)) * zoomDelta) - (h / 2));
    }

    const onMouseMove = (e: MouseEvent) => {
        const relX = (e.clientX - x);
        const relY = (e.clientY - y);

        const globalX = ((relX - w) / zoom) / UNITY_SCALE;
        const globalY = ((relY - h) / zoom) / -UNITY_SCALE;

        setMousePos(globalX, globalY);
    }

    React.useEffect(() => {
        document.addEventListener('wheel', onMouseScroll, { passive: true });
        document.addEventListener('mousemove', onMouseMove);
        return () => {
            document.removeEventListener('wheel', onMouseScroll);
            document.removeEventListener('mousemove', onMouseMove);
            window.onresize = null;
        }
    }, [w, h, x, y, zoom]);

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