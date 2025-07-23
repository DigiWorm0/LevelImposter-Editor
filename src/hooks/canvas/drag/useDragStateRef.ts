import React from "react";
import GUID from "../../../types/common/GUID";
import {Container} from "pixi.js";

type ContainerRef = React.RefObject<Container | null>;

interface DragState {
    id: GUID;

    isEnabled?: boolean;
    isSelected?: boolean;
    isMouseDown?: boolean;
    isDragging?: boolean;

    mouseXOffset?: number;
    mouseYOffset?: number;
    containerRef: ContainerRef;
}

export const allDragStates: DragState[] = [];

export function useDragStateRef(id: GUID): DragState {

    // Find the drag state by id
    const dragState = allDragStates.find(state => state.id === id);
    if (dragState)
        return dragState;

    // If the drag state does not exist, create a new one
    const newDragState: DragState = {
        id,
        isSelected: false,
        mouseXOffset: 0,
        mouseYOffset: 0,
        containerRef: React.createRef<Container>()
    };
    allDragStates.push(newDragState);

    // Return the new drag state
    return newDragState;
}