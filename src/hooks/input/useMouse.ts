import { atom, useSetAtom } from "jotai";

export const mouseXAtom = atom(0);
export const mouseYAtom = atom(0);

export interface SetMousePayload {
    x: number;
    y: number;
}

export const setMouseAtom = atom(null, (_, set, payload: SetMousePayload) => {
    set(mouseXAtom, payload.x);
    set(mouseYAtom, payload.y);
});
setMouseAtom.debugLabel = "setMouseAtom";

export default function useSetMouse() {
    return useSetAtom(setMouseAtom);
}