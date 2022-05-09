import Vector2 from "../types/Vector2";
import InputHandler from "./InputHandler";

const PAN_SPEED = 300;
const ZOOM_SPEED = 0.4;

export class Camera {
    x: number;
    y: number;
    zoom: number;

    _inputHandler: InputHandler;

    constructor(x: number, y: number, zoom: number) {
        this.x = x;
        this.y = y;
        this.zoom = zoom;
        this._inputHandler = new InputHandler();
    }

    update(delta: number) {
        const scroll = this._inputHandler.getScroll();
        let multiplier = 1;
        multiplier = this._inputHandler.isKeyDown("shift") ? 2 : multiplier;
        multiplier = this._inputHandler.isKeyDown("control") ? 0.5 : multiplier;

        if (this._inputHandler.isKeyDown("w"))
            this.y -= PAN_SPEED / this.zoom * delta * multiplier;
        if (this._inputHandler.isKeyDown("s"))
            this.y += PAN_SPEED / this.zoom * delta * multiplier;
        if (this._inputHandler.isKeyDown("a"))
            this.x -= PAN_SPEED / this.zoom * delta * multiplier;
        if (this._inputHandler.isKeyDown("d"))
            this.x += PAN_SPEED / this.zoom * delta * multiplier;
        if (this._inputHandler.isKeyDown("q") || scroll > 0)
            this.zoom *= ZOOM_SPEED ** delta * multiplier;
        if (this._inputHandler.isKeyDown("e") || scroll < 0)
            this.zoom /= ZOOM_SPEED ** delta * multiplier;
    }

    getSceenSize(): Vector2 {
        return {
            x: window.innerWidth,
            y: window.innerHeight
        };
    }

    worldToScreen(v: Vector2): Vector2 {
        const screenSize = this.getSceenSize();
        return {
            x: (v.x - this.x) * this.zoom + screenSize.x / 2,
            y: (v.y - this.y) * this.zoom + screenSize.y / 2
        }
    }

    screenToWorld(v: Vector2): Vector2 {
        const screenSize = this.getSceenSize();
        return {
            x: (v.x / this.zoom) + this.x - screenSize.x / 2,
            y: (v.y / this.zoom) + this.y - screenSize.y / 2
        }
    }
}