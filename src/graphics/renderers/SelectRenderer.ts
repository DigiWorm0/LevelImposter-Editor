import { getElem } from "../../hooks/useElement";
import { getMap, setMap } from "../../hooks/useMap";
import { getSelectedElemIDs, setSelectedElemIDs } from "../../hooks/useSelection";
import LIElement from "../../types/LIElement";
import Renderer from "../../types/Renderer";
import Vector2 from "../../types/Vector2";
import GraphicsContext from "../GraphicsContext";

export default class SelectRenderer implements Renderer {
    dragOffsets?: Vector2[];

    render(ctx: GraphicsContext) {
        const map = getMap();
        const elements = map.elemIDs.map(id => getElem(id));

        // Get elements under mouse cursor
        const mouseScreen = ctx.input.mousePos;
        const mouseWorld = ctx.cam.screenToWorld(mouseScreen);
        const elementsUnderMouse = elements.filter(element => {
            const sprite = ctx.getSprite(element.type);
            const posWorld = {
                x: element.x,
                y: element.y
            };
            const sizeWorld = {
                x: sprite.w * sprite.scale * element.xScale,
                y: sprite.h * sprite.scale * element.yScale
            };
            const rotation = element.rotation;

            const relativeMousePos = this._rotateVector2({ x: mouseWorld.x - posWorld.x, y: mouseWorld.y - posWorld.y }, -rotation);

            return relativeMousePos.x >= -sizeWorld.x / 2 &&
                relativeMousePos.x <= sizeWorld.x / 2 &&
                relativeMousePos.y >= -sizeWorld.y / 2 &&
                relativeMousePos.y <= sizeWorld.y / 2;
        });

        let selctedElements = getSelectedElemIDs().map(id => getElem(id));
        if (ctx.input.leftMouse) {
            if (!this.dragOffsets) {
                selctedElements = elementsUnderMouse.length > 0 ? [elementsUnderMouse[0]] : [];
                setSelectedElemIDs(selctedElements.map(element => element.id));
                this.dragOffsets = selctedElements.map(element => ({ x: element.x - mouseWorld.x, y: element.y - mouseWorld.y }));
            } else {
                this.dragOffsets.forEach((offset, i) => {
                    selctedElements[i].x = mouseWorld.x + offset.x;
                    selctedElements[i].y = mouseWorld.y + offset.y;
                });
            }
        } else if (this.dragOffsets) {
            setMap(map);
            this.dragOffsets = undefined;
        }

        // Delete Button
        if (ctx.input.getKey("delete")) {
            if (selctedElements.length > 0) {
                const newElemIDs = elements.filter(element => !selctedElements.includes(element)).map(element => element.id);
                setMap({ ...map, elemIDs: newElemIDs });
            }
        }


        ctx.setLineWidth(1);
        ctx.setColor("red");
        this.drawRectAroundElements(ctx, ...elementsUnderMouse);

        ctx.setColor("green");
        this.drawRectAroundElements(ctx, ...selctedElements);


    }

    _rotateVector2(vector: Vector2, angle: number) {
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);
        const x = vector.x * cos - vector.y * sin;
        const y = vector.x * sin + vector.y * cos;
        return { x, y };
    }

    drawRectAroundElements(ctx: GraphicsContext, ...elements: LIElement[]) {
        for (const element of elements) {
            const sprite = ctx.getSprite(element.type);
            const pos = { x: element.x, y: element.y };
            const size = { x: sprite.w * sprite.scale * element.xScale, y: sprite.h * sprite.scale * element.yScale };
            const rotation = element.rotation;

            ctx.drawRect(pos, size, rotation);
        }
    }
}