import Vector2 from "../types/Vector2";

export class Camera {
    x: number;
    y: number;
    zoom: number;

    constructor(x: number, y: number, zoom: number) {
        this.x = x;
        this.y = y;
        this.zoom = zoom;
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
            x: (v.x - screenSize.x / 2) / this.zoom + this.x,
            y: (v.y - screenSize.y / 2) / this.zoom + this.y
        }
    }
}