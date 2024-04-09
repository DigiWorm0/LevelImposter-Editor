import React from "react";

export default function useWindowSize(): [number, number] {
    const [canvasWidth, setCanvasWidth] = React.useState<number>(window.innerWidth);
    const [canvasHeight, setCanvasHeight] = React.useState<number>(window.innerHeight);

    const onResize = React.useCallback(() => {
        setCanvasWidth(window.innerWidth);
        setCanvasHeight(window.innerHeight);
    }, []);

    React.useEffect(() => {
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [onResize]);

    return [canvasWidth, canvasHeight];
}