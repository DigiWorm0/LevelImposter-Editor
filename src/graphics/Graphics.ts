import React from 'react';
import LIMap from '../types/LIMap';
import Renderer from '../types/Renderer';
import GraphicsContext from './GraphicsContext';
import InputHandler from './InputHandler';
import GridRenderer from './renderers/GridRenderer';

export class Graphics {
    canvas: HTMLCanvasElement;
    ctx: GraphicsContext;
    renderers: Renderer[];

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = new GraphicsContext(canvas);
        this.renderers = [
            new GridRenderer()
        ];
        window.requestAnimationFrame(this.render.bind(this));
    }

    render() {
        this.ctx.clearScreen();
        this.ctx.cam.update();
        this.renderers.forEach((renderer) => renderer.render(this.ctx));
        window.requestAnimationFrame(this.render.bind(this));
    }

    addRenderer(renderer: Renderer) {
        this.renderers.push(renderer);
    }

    removeRenderer(renderer: Renderer) {
        this.renderers = this.renderers.filter((r) => r !== renderer);
    }
}