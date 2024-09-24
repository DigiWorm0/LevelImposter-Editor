import {atom, useAtomValue, useSetAtom} from "jotai";

export enum Scope {
    Navigation = "Navigation",
    SceneGraph = "SceneGraph",
    Inspector = "Inspector",
    Canvas = "Canvas",
    Timeline = "Timeline",
    Modal = "Modal"
}

export const focusAtom = atom(Scope.Canvas);

export default function useSetFocus() {
    return useSetAtom(focusAtom);
}

export function useFocusValue() {
    return useAtomValue(focusAtom);
}
