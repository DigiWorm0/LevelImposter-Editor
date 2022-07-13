import React from "react";
import useStore from "../storage/useStore";

export default function useMousePos(): [number, number, (x: number, y: number) => void] {
    const [x, setX] = useStore("mouse-x", 0);
    const [y, setY] = useStore("mouse-y", 0);

    const setData = (x: number, y: number) => {
        setX(x);
        setY(y);
    }

    return [x, y, setData];
}