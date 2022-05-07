import Vector2 from "../types/Vector2";
import { Camera } from "./Camera";
import InputHandler from "./InputHandler";

export default class GraphicsContext {
    ctx: CanvasRenderingContext2D;
    cam: Camera;
    input: InputHandler;

    constructor(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        this.cam = new Camera(0, 0, 100);
        this.input = new InputHandler();
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

    drawRect(from: Vector2, to: Vector2) {
        const fromWorld = this.cam.worldToScreen(from);
        const toWorld = this.cam.worldToScreen(to);
        this.ctx.beginPath();
        this.ctx.rect(fromWorld.x, fromWorld.y, toWorld.x - fromWorld.x, toWorld.y - fromWorld.y);
        this.ctx.stroke();
    }

    drawCircle(center: Vector2, radius: number) {
        const centerWorld = this.cam.worldToScreen(center);
        const radiusWorld = radius * this.cam.zoom;
        this.ctx.beginPath();
        this.ctx.arc(centerWorld.x, centerWorld.y, radiusWorld, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    drawText(text: string, pos: Vector2) {
        const posWorld = this.cam.worldToScreen(pos);
        this.ctx.fillText(text, posWorld.x, posWorld.y);
    }

    drawSprite(sprite: HTMLImageElement, pos: Vector2, size: Vector2) {
        const posWorld = this.cam.worldToScreen(pos);
        const sizeWorld = this.cam.worldToScreen(size);
        this.ctx.drawImage(sprite, posWorld.x, posWorld.y, sizeWorld.x, sizeWorld.y);
    }
}