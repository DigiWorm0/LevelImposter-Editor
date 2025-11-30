import {atomFamily} from "jotai/utils";
import {MaybeGUID} from "../../../types/common/GUID";
import {atom, useAtomValue} from "jotai";
import {Application, Sprite} from "pixi.js";
import {elementSpriteAtomFamily} from "./useElementSprite";

const app = new Application();

export const elementAsImageBlobAtom = atomFamily((id: MaybeGUID) => {
    return atom(async (get) => {

        // Get the PIXI texture
        const texture = await get(elementSpriteAtomFamily(id));
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

        // Render the sprite to a blob
        return new Promise<Blob | null>((resolve) => {
            const canvas = app.renderer.extract.canvas(app.stage);
            if (!canvas.toBlob)
                return null;

            canvas.toBlob((blob) => {
                resolve(blob);
            });
        });
    });
});

export default function useElementAsImageBlob(id: MaybeGUID) {
    return useAtomValue(elementAsImageBlobAtom(id));
}