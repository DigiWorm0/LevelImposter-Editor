import { useAtom } from "jotai";
import { mouseXAtom, mouseYAtom } from "../jotai/Jotai";

export default function useMousePos(): [number, number, (x: number, y: number) => void] {
    const [x, setX] = useAtom(mouseXAtom)
    const [y, setY] = useAtom(mouseYAtom)

    const setData = (x: number, y: number) => {
        setX(x);
        setY(y);
    }

    return [x, y, setData];
}