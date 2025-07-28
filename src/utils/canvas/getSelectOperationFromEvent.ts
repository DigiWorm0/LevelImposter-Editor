import SelectOperation from "../../types/common/SelectOperation";

/**
 * Determines the selection operation based on the pointer event and whether the user is dragging.
 * @param e - The pointer/drag event.
 * @param isSelected - Indicates if the element is currently selected.
 * @param isDragEvent - Indicates if the event is a drag event.
 * @return The selection operation: "set", "add", or "toggle".
 */
export function getSelectOperationFromEvent(
    e: PointerEvent | null | undefined,
    isSelected: boolean = false,
    isDragEvent: boolean = false): SelectOperation {

    // Get the pointer event from the custom drag event if available
    if (!e)
        return "set";
    const {metaKey, ctrlKey, shiftKey} = e;

    // Drag event
    if (isDragEvent) {
        if (metaKey || ctrlKey || shiftKey || isSelected)
            return "add";
        return "set";
    }
    // Pointer event
    else {
        if (metaKey || ctrlKey)
            return "toggle";
        if (shiftKey)
            return "add";
        return "set";
    }
}