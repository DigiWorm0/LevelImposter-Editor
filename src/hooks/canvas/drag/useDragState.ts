import GUID from "../../../types/generic/GUID";
import {atom} from "jotai";

export interface DragState {
    onClick: () => void;
    onDragStart: () => void;
    isDragging: boolean;
    offsets: DragOffset[]
}

export interface DragOffset {
    id: GUID;
    x: number;
    y: number;
}

export const dragStateAtom = atom<DragState | null>(null);