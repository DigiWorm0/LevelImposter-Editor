import { getElem } from "../../hooks/useElement";
import { getMap } from "../../hooks/useMap";
import Renderer from "../../types/Renderer";
import GraphicsContext from "../GraphicsContext";

export default class ElemRenderer implements Renderer {

    render(ctx: GraphicsContext) {
        const map = getMap();
        const elements = map.elemIDs.map(elemID => getElem(elemID));

        // Render in order of z-index
        elements.sort((a, b) => b.z - a.z);
        for (const element of elements) {
            const sprite = ctx.getSprite(element.type);
            const pos = { x: element.x, y: element.y };
            const scale = { x: element.xScale, y: element.yScale };

            ctx.drawSprite(sprite, pos, scale, element.rotation);
        }
    }
}