import Renderer from "../../types/Renderer";
import GraphicsContext from "../GraphicsContext";

const LINE_WIDTH = 1;
const LINE_COLOR = "#888";
const X_AXIS_COLOR = "#0096ff";
const Y_AXIS_COLOR = "#ff0000";
const GRID_SIZE = 100;

const PAN_SPEED = 300;
const ZOOM_SPEED = 0.4;

export default class GridRenderer implements Renderer {
    render(ctx: GraphicsContext) {
        ctx.setColor(LINE_COLOR);
        ctx.setLineWidth(LINE_WIDTH);

        for (let x = -GRID_SIZE; x < GRID_SIZE; x++) {
            ctx.drawLine(
                { x: x, y: -GRID_SIZE },
                { x: x, y: GRID_SIZE }
            );
        }

        for (let y = -GRID_SIZE; y < GRID_SIZE; y++) {
            ctx.drawLine(
                { x: -GRID_SIZE, y: y },
                { x: GRID_SIZE, y: y }
            );
        }

        ctx.setColor(X_AXIS_COLOR);
        ctx.drawLine(
            { x: 0, y: -GRID_SIZE },
            { x: 0, y: GRID_SIZE }
        );

        ctx.setColor(Y_AXIS_COLOR);
        ctx.drawLine(
            { x: -GRID_SIZE, y: 0 },
            { x: GRID_SIZE, y: 0 }
        );

        this.updateCamera(ctx);
    }

    updateCamera(ctx: GraphicsContext) {
        const scroll = ctx.input.getScroll();
        let multiplier = 1;
        multiplier = ctx.input.isKeyDown("shift") ? 2 : multiplier;
        multiplier = ctx.input.isKeyDown("control") ? 0.5 : multiplier;

        if (ctx.input.isKeyDown("w"))
            ctx.cam.y -= PAN_SPEED / ctx.cam.zoom * ctx.deltaTime * multiplier;
        if (ctx.input.isKeyDown("s"))
            ctx.cam.y += PAN_SPEED / ctx.cam.zoom * ctx.deltaTime * multiplier;
        if (ctx.input.isKeyDown("a"))
            ctx.cam.x -= PAN_SPEED / ctx.cam.zoom * ctx.deltaTime * multiplier;
        if (ctx.input.isKeyDown("d"))
            ctx.cam.x += PAN_SPEED / ctx.cam.zoom * ctx.deltaTime * multiplier;
        if (ctx.input.isKeyDown("q") || scroll > 0)
            ctx.cam.zoom *= ZOOM_SPEED ** ctx.deltaTime * multiplier;
        if (ctx.input.isKeyDown("e") || scroll < 0)
            ctx.cam.zoom /= ZOOM_SPEED ** ctx.deltaTime * multiplier;
    }
}