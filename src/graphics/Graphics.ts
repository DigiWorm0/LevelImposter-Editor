import Renderer from '../types/Renderer';
import GraphicsContext from './GraphicsContext';
import ElemRenderer from './renderers/ElemRenderer';
import GridRenderer from './renderers/GridRenderer';
import SelectRenderer from './renderers/SelectRenderer';

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
            new SelectRenderer(),
            new ElemRenderer(),
        ];
        this.lastUpdate = Date.now();
        window.requestAnimationFrame(this.render.bind(this));
    }

    render() {
        // Delta Time
        const now = Date.now();
        this.ctx.deltaTime = (now - this.lastUpdate) / 1000;
        this.lastUpdate = now;

        // Render
        this.ctx.clearScreen();
        try {
            this.renderers.forEach((renderer) => renderer.render(this.ctx));
        } catch (e) {
            console.error(e);
        }

        // Next Frame
        window.requestAnimationFrame(this.render.bind(this));
    }

    addRenderer(renderer: Renderer) {
        this.renderers.push(renderer);
    }

    removeRenderer(renderer: Renderer) {
        this.renderers = this.renderers.filter((r) => r !== renderer);
    }
}