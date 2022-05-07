import Vector2 from "../types/Vector2";
import InputHandler from "./InputHandler";

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

    update() {
        if (this._inputHandler.isKeyDown("w")) {
            this.y -= 0.1;
        }
        if (this._inputHandler.isKeyDown("s")) {
            this.y += 0.1;
        }
        if (this._inputHandler.isKeyDown("a")) {
            this.x -= 0.1;
        }
        if (this._inputHandler.isKeyDown("d")) {
            this.x += 0.1;
        }
        if (this._inputHandler.isKeyDown("q")) {
            this.zoom *= 1.1;
        }
        if (this._inputHandler.isKeyDown("e")) {
            this.zoom /= 1.1;
        }
    }

    worldToScreen(v: Vector2): Vector2 {
        return {
            x: (v.x - this.x) * this.zoom,
            y: (v.y - this.y) * this.zoom
        }
    }

    screenToWorld(v: Vector2): Vector2 {
        return {
            x: (v.x / this.zoom) + this.x,
            y: (v.y / this.zoom) + this.y
        }
    }
}