import EventEmitter from "eventemitter3";
import GUID from "@shared/types/GUID";

// Defines the events for TypeScript checking
interface MapElementEvents {
    "mouseOver": (id: GUID) => void;
    "mouseOut": (id: GUID) => void;
}

class MapElementEventEmitter extends EventEmitter<MapElementEvents> {
    // No additional methods or properties are needed
}

// Global instance of the MapElementEventEmitter
const mapElementEventEmitter = new MapElementEventEmitter();
export default mapElementEventEmitter;