import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { mouseXAtom, mouseYAtom } from "../jotai/Jotai";

export default function useMousePos() {
    const x = useAtomValue(mouseXAtom);
    const y = useAtomValue(mouseYAtom);

    return {
        x,
        y,
    }
}

export function useSetMousePos(): (x: number, y: number) => void {
    const setX = useSetAtom(mouseXAtom);
    const setY = useSetAtom(mouseYAtom);

    const setData = (x: number, y: number) => {
        setX(x);
        setY(y);
    }

    return setData;
}