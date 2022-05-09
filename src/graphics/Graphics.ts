import Renderer from '../types/Renderer';
import GraphicsContext from './GraphicsContext';
import ElemRenderer from './renderers/ElemRenderer';
import GridRenderer from './renderers/GridRenderer';

export class Graphics {
    canvas: HTMLCanvasElement;
    ctx: GraphicsContext;
    renderers: Renderer[];
    lastUpdate: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = new GraphicsContext(canvas);
        this.renderers = [
            new GridRenderer(),
            new ElemRenderer(),
        ];
        this.lastUpdate = Date.now();
        window.requestAnimationFrame(this.render.bind(this));
    }

    render() {
        const now = Date.now();
        const delta = (now - this.lastUpdate) / 1000;
        this.lastUpdate = now;

        this.ctx.clearScreen();
        this.ctx.cam.update(delta);
        try {
            this.renderers.forEach((renderer) => renderer.render(this.ctx));
        } catch (e) {
            console.error(e);
        }
        window.requestAnimationFrame(this.render.bind(this));
    }

    addRenderer(renderer: Renderer) {
        this.renderers.push(renderer);
    }

    removeRenderer(renderer: Renderer) {
        this.renderers = this.renderers.filter((r) => r !== renderer);
    }
}