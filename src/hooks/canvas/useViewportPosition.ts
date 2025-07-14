import useViewport from "./useViewport";
import React from "react";
import {atom, useAtom} from "jotai";

interface ViewportPosition {
    left: number;
    right: number;
    top: number;
    bottom: number;
    scale: number;
    width: number;
    height: number;
}

export const viewportPositionAtom = atom<ViewportPosition>({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    scale: 1,
    width: 0,
    height: 0
});

export default function useViewportPosition() {
    const viewport = useViewport();
    const [viewportPosition, setViewportPosition] = useAtom(viewportPositionAtom);

    React.useEffect(() => {
        if (!viewport)
            return;

        const onMoved = () => {
            if (!viewport._position)
                return;

            setViewportPosition({
                left: viewport.left,
                right: viewport.right,
                top: viewport.top,
                bottom: viewport.bottom,
                scale: viewport.scale.x, // Assuming uniform scale
                width: viewport.worldWidth,
                height: viewport.worldHeight
            });
        };

        // Initial call to set position
        onMoved();

        // Listen for viewport movement events
        viewport.on("moved", onMoved);

        // Cleanup listener on unmount
        return () => {
            viewport.off("moved", onMoved);
        }
    }, [viewport]);

    return viewportPosition;
}