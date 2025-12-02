import {atom, useAtomValue} from "jotai";
import {atomFamily, unwrap} from "jotai/utils";
import {MaybeGUID} from "../../types/common/GUID";
import {spriteAtomFamily} from "./useSprite";
import {Application, Sprite} from "pixi.js";

const MAX_THUMBNAIL_SIZE = 128;

let app: Application | null = null;

export const spriteThumbnailAtomFamily = atomFamily((spriteID: MaybeGUID) => {
    return atom(async (get) => {

        // Get sprite data
        const spriteTexture = await get(spriteAtomFamily(spriteID));
        if (!spriteTexture)
            return undefined;

        // Calculate size, keeping aspect ratio
        let width = spriteTexture.width;
        let height = spriteTexture.height;
        const aspectRatio = spriteTexture.width / spriteTexture.height;

        // Keep width within `MAX_THUMBNAIL_SIZE`
        if (width > height) {
            if (width > MAX_THUMBNAIL_SIZE) {
                width = MAX_THUMBNAIL_SIZE;
                height = width / aspectRatio;
            }
        } else {
            if (height > MAX_THUMBNAIL_SIZE) {
                height = MAX_THUMBNAIL_SIZE;
                width = height * aspectRatio;
            }
        }

        // Initialize PIXI application if not already done
        if (!app || !app.renderer) {
            app = new Application();
            await app.init({
                width: MAX_THUMBNAIL_SIZE,
                height: MAX_THUMBNAIL_SIZE,
                backgroundAlpha: 0,
                preserveDrawingBuffer: true,
            });
        }

        // Reset stage
        app.renderer.resize(width, height);

        // Create sprite
        const sprite = new Sprite(spriteTexture);
        sprite.setSize(width, height);

        app.stage.removeChildren();
        app.stage.addChild(sprite);

        // Render once
        app.renderer.render(app.stage);

        // Get thumbnail as data URL
        const thumbnailURL = await app.renderer.extract.base64(app.stage);

        // Clean up
        sprite.destroy();

        return {
            src: thumbnailURL,
            width,
            height,
        };
    });
});

export default function useSpriteThumbnail(spriteID: MaybeGUID) {
    return useAtomValue(unwrap(spriteThumbnailAtomFamily(spriteID)));
}