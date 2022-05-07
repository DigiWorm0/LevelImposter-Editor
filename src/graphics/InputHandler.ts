export default class InputHandler {
    keys: { [key: string]: boolean };

    constructor() {
        this.keys = {};
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    onKeyDown(e: KeyboardEvent) {
        this.keys[e.key] = true;
    }

    onKeyUp(e: KeyboardEvent) {
        this.keys[e.key] = false;
    }

    isKeyDown(key: string): boolean {
        return this.keys[key] === true;
    }
}