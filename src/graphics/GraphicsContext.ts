import Sprite from "../types/Sprite";
import Vector2 from "../types/Vector2";
import { Camera } from "./Camera";
import InputHandler from "./InputHandler";

export default class GraphicsContext {
    ctx: CanvasRenderingContext2D;
    _spriteCache: { [key: string]: Sprite } = {};
    cam: Camera;
    input: InputHandler;
    deltaTime: number;

    constructor(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        this.cam = new Camera(0, 0, 100);
        this.input = new InputHandler(canvas);
        this.deltaTime = 0;
    }

    getSprite(type: string) {
        if (!this._spriteCache[type]) {
            const sprite = new Sprite();
            sprite.loadType(type);
            this._spriteCache[type] = sprite;
        }
        return this._spriteCache[type];
    }

    clearScreen() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    setColor(color: string) {
        this.ctx.strokeStyle = color;
    }

    setFillColor(color: string) {
        this.ctx.fillStyle = color;
    }

    setLineWidth(width: number) {
        this.ctx.lineWidth = width;
    }

    drawLine(from: Vector2, to: Vector2) {
        const fromWorld = this.cam.worldToScreen(from);
        const toWorld = this.cam.worldToScreen(to);
        this.ctx.beginPath();
        this.ctx.moveTo(fromWorld.x, fromWorld.y);
        this.ctx.lineTo(toWorld.x, toWorld.y);
        this.ctx.stroke();
    }

    drawRect(pos: Vector2, size: Vector2, rotation: number) {
        const posWorld = this.cam.worldToScreen(pos);
        const sizeWorld = {
            x: size.x * this.cam.zoom,
            y: size.y * this.cam.zoom
        }

        this.ctx.save();
        this.ctx.translate(posWorld.x, posWorld.y);
        this.ctx.rotate(rotation);
        this.ctx.translate(-sizeWorld.x / 2, -sizeWorld.y / 2);
        this.ctx.strokeRect(0, 0, sizeWorld.x, sizeWorld.y);
        this.ctx.restore();

    }

    drawCircle(center: Vector2, radius: number) {
        const centerWorld = this.cam.worldToScreen(center);
        const radiusWorld = radius * this.cam.zoom;
        this.ctx.beginPath();
        this.ctx.arc(centerWorld.x, centerWorld.y, radiusWorld, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    drawText(text: string, pos: Vector2, fontSize: number) {
        const posWorld = this.cam.worldToScreen(pos);
        this.ctx.font = Math.floor(this.cam.zoom * fontSize * 0.1) + "px Arial";

        const textMetrics = this.ctx.measureText(text);
        this.ctx.fillText(
            text,
            posWorld.x - textMetrics.width / 2,
            posWorld.y + textMetrics.actualBoundingBoxAscent / 2
        );
    }

    drawSprite(sprite: Sprite, pos: Vector2, scale: Vector2, rotation: number) {
        if (!sprite.isLoaded)
            return;
        const screenPos = this.cam.worldToScreen(pos);

        this.ctx.save();
        this.ctx.translate(screenPos.x, screenPos.y);
        this.ctx.rotate(rotation);
        this.ctx.scale(scale.x * sprite.scale * this.cam.zoom, scale.y * sprite.scale * this.cam.zoom);
        this.ctx.translate(-sprite.w / 2, -sprite.h / 2);
        this.ctx.drawImage(
            sprite.img,
            0,
            0
        );
        this.ctx.restore();
    }
}