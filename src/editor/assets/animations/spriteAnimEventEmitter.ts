import EventEmitter from "eventemitter3";

// Defines the events for TypeScript checking
interface SpriteAnimEvents {
    "stopPlayback": () => void;
}

class SpriteAnimEventEmitter extends EventEmitter<SpriteAnimEvents> {
    // No additional methods or properties are needed
}

// Global instance of the MapElementEventEmitter
const spriteAnimEventEmitter = new SpriteAnimEventEmitter();
export default spriteAnimEventEmitter;