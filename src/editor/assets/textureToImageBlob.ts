import {Application, Sprite, Texture} from "pixi.js";

const app = new Application();

export const textureToImageBlob = async (texture: Texture) => {
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
    return await new Promise<Blob | null>((resolve) => {
        const canvas = app.renderer.extract.canvas(app.stage);
        if (!canvas.toBlob)
            return null;

        canvas.toBlob((blob) => resolve(blob));

        // Clean up the stage for the next render
        app.stage.removeChild(sprite);
    });
};