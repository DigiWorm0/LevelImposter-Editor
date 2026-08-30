import React, {RefObject} from "react";
import useViewport from "../../../hooks/canvas/useViewport";
import {Container} from "pixi.js";
import roundTo from "@shared/math/roundTo";
import draggableEventEmitter from "../../../utils/canvas/draggableEventEmitter";

export interface DraggableProps {
    id: string;
    x: number;
    y: number;
    zIndex?: number;
    xScale?: number;
    yScale?: number;
    rotation?: number;

    gridSnapResolution?: number;
    draggable?: boolean;
    selected?: boolean;
    allowRightClick?: boolean;

    onDragStart?: (e: DragEvent) => void;
    onDragMove?: (e: DragEvent) => void;
    onDragEnd?: (e: DragEvent) => void;
    onClick?: (e: DragEvent) => void;

    children?: React.ReactNode;
    nonInteractableChildren?: React.ReactNode;

    ref?: RefObject<typeof Draggable>;
}

export interface DragState {
    isMouseDown: boolean;
    targetID: string | null;
    isDragging: boolean;
    mouseXOffset: number;
    mouseYOffset: number;
    x: number;
    y: number;
    startX: number;
    startY: number;
}

export interface DragEvent extends DragState {
    pointerEvent?: PointerEvent;
}

export default function Draggable(props: DraggableProps) {
    const viewport = useViewport();
    const containerRef = React.useRef<Container>(null);
    const dragStateRef = React.useRef<DragState>({
        isMouseDown: false,
        targetID: null,

        isDragging: false,

        mouseXOffset: 0,
        mouseYOffset: 0,

        x: 0,
        y: 0,

        startX: 0,
        startY: 0
    });

    const getGlobalMousePosition = React.useCallback((e: PointerEvent) => {
        // Check if viewport is available
        if (!viewport)
            return null;

        // Convert mouse coordinates to world coordinates
        return viewport.toWorld(e.clientX, e.clientY);
    }, [viewport]);

    const onPointerDown = React.useCallback((e: PointerEvent, target?: boolean) => {

        // Only allow mouse pointer type (touch/pens are for viewport controls only)
        if (e.pointerType !== "mouse")
            return;

        // Click if right click is allowed
        if (e.button === 2 && props.allowRightClick && props.onClick) {
            e.stopPropagation();
            e.preventDefault();
            props.onClick({
                ...dragStateRef.current,
                pointerEvent: e
            });
            return;
        }

        // Only allow left mouse button (right-clicks are for viewport controls only)
        if (e.button !== 0)
            return;

        // Prevent default behavior and stop propagation
        e.stopPropagation();
        e.preventDefault();

        // Convert mouse coordinates to world coordinates
        const mousePosition = getGlobalMousePosition(e);
        if (!mousePosition)
            return;

        // Set the initial mouse offsets
        dragStateRef.current.isMouseDown = true;
        if (target)
            dragStateRef.current.targetID = props.id;

        dragStateRef.current.mouseXOffset = mousePosition.x;
        dragStateRef.current.mouseYOffset = mousePosition.y;

        dragStateRef.current.startX = containerRef.current?.x ?? props.x;
        dragStateRef.current.startY = containerRef.current?.y ?? props.y;

        if (target)
            draggableEventEmitter.emit("mouseDown", e);
    }, [props, viewport]);

    const onPointerMove = React.useCallback((e: PointerEvent) => {
        // Get the current drag state
        const {draggable, selected} = props;
        const {isMouseDown, targetID, isDragging} = dragStateRef.current;
        const isTarget = targetID === props.id;

        // If dragging, update position
        // Called BEFORE onDragStart to give React a chance to re-render before performing onDragMove
        if (dragStateRef.current.isDragging && selected && draggable) {
            // Get the current mouse position
            const mousePosition = getGlobalMousePosition(e);
            if (!mousePosition)
                return;

            // Calculate the new position based on mouse movement
            const {mouseXOffset, mouseYOffset} = dragStateRef.current;
            dragStateRef.current.x = mousePosition.x - mouseXOffset + dragStateRef.current.startX;
            dragStateRef.current.y = mousePosition.y - mouseYOffset + dragStateRef.current.startY;

            // Snap to grid
            const {gridSnapResolution} = props;
            if (gridSnapResolution && gridSnapResolution > 0) {
                dragStateRef.current.x = roundTo(dragStateRef.current.x, gridSnapResolution);
                dragStateRef.current.y = roundTo(dragStateRef.current.y, gridSnapResolution);
            }

            // Update the container position
            const container = containerRef.current;
            if (container) {
                container.x = dragStateRef.current.x;
                container.y = dragStateRef.current.y;
            }

            // Call onDragMove if provided
            if (props.onDragMove)
                props.onDragMove({...dragStateRef.current, pointerEvent: e});
        }

        // Start dragging if mouse is down and not already dragging
        if (isMouseDown &&
            !isDragging &&
            (isTarget || selected)) {
            dragStateRef.current.isDragging = true;
            dragStateRef.current.x = containerRef.current?.x ?? props.x;
            dragStateRef.current.y = containerRef.current?.y ?? props.y;

            // Call onDragStart if provided
            if (props.onDragStart)
                props.onDragStart({...dragStateRef.current, pointerEvent: e});
        }
    }, [props, viewport]);

    const onPointerUp = React.useCallback((e: PointerEvent, target?: boolean) => {
        const isTarget = target || dragStateRef.current.targetID === props.id;

        // Check for drag end
        if (dragStateRef.current.isDragging) {

            // Call onDragEnd if provided
            if (props.onDragEnd)
                props.onDragEnd({...dragStateRef.current, pointerEvent: e});
        }

        // Check for click
        else if (dragStateRef.current.isMouseDown && isTarget) {

            // Call onClick if provided
            if (props.onClick)
                props.onClick({...dragStateRef.current, pointerEvent: e});
        }

        dragStateRef.current.isMouseDown = false;
        dragStateRef.current.targetID = null;
        dragStateRef.current.isDragging = false;

        // Emit mouse up event
        if (target)
            draggableEventEmitter.emit("mouseUp", e);

    }, [props]);

    React.useEffect(() => {
        draggableEventEmitter.on("mouseDown", onPointerDown);
        draggableEventEmitter.on("mouseUp", onPointerUp);
        return () => {
            draggableEventEmitter.off("mouseDown", onPointerDown);
            draggableEventEmitter.off("mouseUp", onPointerUp);
        };
    }, [onPointerDown, onPointerUp]);

    return (
        <pixiContainer
            ref={containerRef}
            x={props.x}
            y={props.y}
            zIndex={props.zIndex ?? 0}
            scale={{x: props.xScale ?? 1, y: props.yScale ?? 1}}
            rotation={props.rotation ?? 0}
        >
            {/* Interactable Children */}
            <pixiContainer
                eventMode={"static"}
                onPointerDown={(e: PointerEvent) => onPointerDown(e, true)}

                onPointerMove={onPointerMove}
                onGlobalPointerMove={onPointerMove}

                onPointerUp={(e: PointerEvent) => onPointerUp(e, true)}
                onPointerUpOutside={(e: PointerEvent) => onPointerUp(e, true)}
            >
                {props.children}
            </pixiContainer>

            {/* Non-interactable Children */}
            {props.nonInteractableChildren}
        </pixiContainer>
    );
}