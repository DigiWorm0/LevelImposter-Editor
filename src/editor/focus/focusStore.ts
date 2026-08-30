import {atom} from "jotai";

export enum Scope {
    Navigation = "Navigation",
    SceneGraph = "SceneGraph",
    Inspector = "Inspector",
    Canvas = "Canvas",
    Timeline = "Timeline"
}

export const focusAtom = atom(Scope.Canvas);