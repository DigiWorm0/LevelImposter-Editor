export default class InputHandler {
    keys: { [key: string]: boolean };
    _scroll: number;

    constructor() {
        this.keys = {};
        this._scroll = 0;
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
        document.addEventListener('wheel', (this.onScroll as EventListener).bind(this));
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

    getScroll(): number {
        const scroll = this._scroll;
        this._scroll = 0;
        return scroll;
    }

    isKeyDown(key: string): boolean {
        return this.keys[key] === true;
    }
}