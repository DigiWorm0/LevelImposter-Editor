import {atom, useAtomValue} from "jotai";
import {atomFamily, unwrap} from "jotai/utils";
import {MaybeGUID} from "@shared/types/GUID";
import {spriteAtomFamily} from "./useSprite";
import {Application, Container, Graphics, Sprite} from "pixi.js";
import drawAlphaGrid from "@/rendering/canvas2/utils/drawAlphaGrid";

const MAX_THUMBNAIL_SIZE = 128;

let applicationPromise: Promise<Application> | undefined;

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
        if (!applicationPromise) {
            const app = new Application();
            applicationPromise = app.init({
                width: MAX_THUMBNAIL_SIZE,
                height: MAX_THUMBNAIL_SIZE,
                backgroundAlpha: 0,
            }).then(() => app).catch(error => {
                applicationPromise = undefined;
                throw error;
            });
        }
        const app = await applicationPromise;

        // Each request owns its render target, so concurrent thumbnails cannot clear it.
        const thumbnail = new Container();

        // Add transparency checkerboard background
        const graphics = new Graphics();
        drawAlphaGrid(graphics, width, height, 10);
        thumbnail.addChild(graphics);

        // Create sprite
        const sprite = new Sprite(spriteTexture);
        sprite.setSize(width, height);
        thumbnail.addChild(sprite);

        try {
            const src = await app.renderer.extract.base64(thumbnail);
            return {src, width, height};
        } finally {
            thumbnail.destroy({children: true});
        }
    });
});

export default function useSpriteThumbnail(spriteID: MaybeGUID) {
    return useAtomValue(unwrap(spriteThumbnailAtomFamily(spriteID)));
}
