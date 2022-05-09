import { getMap } from "../../hooks/useMap";
import Renderer from "../../types/Renderer";
import Sprite from "../../types/Sprite";
import GraphicsContext from "../GraphicsContext";

export default class ElemRenderer implements Renderer {
    _spriteCache: { [key: string]: Sprite } = {};

    getSprite(type: string) {
        if (!this._spriteCache[type]) {
            const sprite = new Sprite();
            sprite.loadType(type);
            this._spriteCache[type] = sprite;
        }
        return this._spriteCache[type];
    }

    render(ctx: GraphicsContext) {
        ctx.setFillColor("#fff");
        ctx.drawText(ctx.cam.zoom.toString(), { x: 0, y: 0 }, 0.5);

        const map = getMap();
        const elements = map.elements;
        for (const element of elements) {
            const sprite = this.getSprite(element.type);
            const pos = { x: element.x, y: element.y };
            const scale = { x: element.xScale, y: element.yScale };

            ctx.drawSprite(sprite, pos, scale, element.rotation);
        }
    }
}