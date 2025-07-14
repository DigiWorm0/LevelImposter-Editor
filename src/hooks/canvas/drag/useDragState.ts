import GUID from "../../../types/generic/GUID";
import {atom} from "jotai";
import {Container} from "pixi.js";

export interface DragState {
    target: Container,
    elementID: GUID;
    elementOffsetX: number;
    elementOffsetY: number;
    cursorX: number;
    cursorY: number;
}

export const dragStateAtom = atom<DragState | null>(null);