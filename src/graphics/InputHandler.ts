import Vector2 from "../types/Vector2";

export default class InputHandler {
    keys: { [key: string]: boolean };
    mousePos: Vector2;
    leftMouse: boolean;
    middleMouse: boolean;
    rightMouse: boolean;
    _scroll: number;

    constructor(canvas: HTMLCanvasElement) {
        this.keys = {};
        this.mousePos = { x: 0, y: 0 };
        this._scroll = 0;
        this.leftMouse = false;
        this.middleMouse = false;
        this.rightMouse = false;

        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
        document.addEventListener('wheel', (this.onScroll as EventListener).bind(this));
        canvas.addEventListener('mousemove', (this.onMouseMove as EventListener).bind(this));
        canvas.addEventListener('mousedown', (this.onMouseDown as EventListener).bind(this));
        canvas.addEventListener('mouseup', (this.onMouseUp as EventListener).bind(this));
    }

    onKeyDown(e: KeyboardEvent) {
        this.keys[e.key.toLowerCase()] = true;
    }

    onKeyUp(e: KeyboardEvent) {
        this.keys[e.key.toLowerCase()] = false;
    }

    onScroll(e: WheelEvent) {
        this._scroll = e.deltaY;
    }

    onMouseMove(e: MouseEvent) {
        this.mousePos.x = e.clientX;
        this.mousePos.y = e.clientY;
    }

    onMouseDown(e: MouseEvent) {
        switch (e.button) {
            case 0:
                this.leftMouse = true;
                break;
            case 1:
                this.middleMouse = true;
                break;
            case 2:
                this.rightMouse = true;
                break;
        }
    }

    onMouseUp(e: MouseEvent) {
        switch (e.button) {
            case 0:
                this.leftMouse = false;
                break;
            case 1:
                this.middleMouse = false;
                break;
            case 2:
                this.rightMouse = false;
                break;
        }
    }


    getScroll(): number {
        const scroll = this._scroll;
        this._scroll = 0;
        return scroll;
    }

    isKeyDown(key: string): boolean {
        return this.keys[key] === true;
    }
}