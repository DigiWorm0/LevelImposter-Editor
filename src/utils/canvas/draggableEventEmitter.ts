import EventEmitter from "eventemitter3";

// Defines the events for TypeScript checking
interface DraggableEvents {
    "mouseDown": (e: PointerEvent) => void;
    "mouseUp": (e: PointerEvent) => void;
}

class DraggableEventEmitter extends EventEmitter<DraggableEvents> {
    // No additional methods or properties are needed
}

// Global instance of the DraggableEventEmitter
const draggableEventEmitter = new DraggableEventEmitter();
export default draggableEventEmitter;