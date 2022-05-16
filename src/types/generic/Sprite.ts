export default class Sprite {
    isLoaded: boolean;
    img: HTMLImageElement;
    scale: number;
    w: number;
    h: number;

    constructor() {
        this.isLoaded = false;
        this.img = new Image();
        this.scale = 1 / 100;
        this.w = 0;
        this.h = 0;
        this.img.onload = () => {
            this.isLoaded = true;
            this.w = this.img.width;
            this.h = this.img.height;
        };
    }

    loadType(type: string) {
        this.loadURL(`/sprites/${type}.png`);
    }

    loadURL(url: string) {
        this.img.src = url;
    }
}