import {atomFamily} from "jotai/utils";
import {MaybeGUID} from "../../../types/generic/GUID";
import {atom, useAtomValue} from "jotai";
import {spriteAtomFamily} from "./useSprite";
import {Application, Sprite} from "pixi.js";

const app = new Application();

export const spriteAsPngAtomFamily = atomFamily((id: MaybeGUID) => {
    return atom(async (get) => {

        // Get the PIXI texture
        const texture = await get(spriteAtomFamily(id));
        if (!texture)
            return null;

        // Initialize the PIXI application if it hasn't been initialized
        if (!app.renderer || !app.renderer.extract)
            await app.init({backgroundAlpha: 0});

        // Resize the application renderer to the texture size
        app.renderer.resize(texture.width, texture.height);

        // Create a new sprite from the texture
        const sprite = new Sprite(texture);
        sprite.anchor.set(0.5, 0.5);
        sprite.x = texture.width / 2;
        sprite.y = texture.height / 2;
        app.stage.addChild(sprite);

        // Render the sprite to an HTMLImageElement
        return await app.renderer.extract.image(app.stage);
    });
});

export default function useSpriteAsImage(id: MaybeGUID) {
    return useAtomValue(spriteAsPngAtomFamily(id));
}