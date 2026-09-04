import {Assets, Texture} from "pixi.js";
import {docPropertiesAtom} from "@editor/document/documentStore";
import cachedAtomFamily from "@shared/atomics/cachedAtomFamily";

export const textureFromURLAtomFamily = cachedAtomFamily(async (url: string | undefined, get) => {
    try {
        // If the URL is undefined, return null
        if (!url)
            return null;

        // Check if the asset is a DDS format by
        // finding an equivalent map asset and checking its type
        // const mapAsset = get(assetAtURLAtom(url));
        const isDDS = false; //mapAsset?.type === "image/dds";
        // TODO: FIX ME!!!

        // Load the asset from the URL
        const texture = await Assets.load({
            src: url,
            loadParser: isDDS ? "loadDDS" : "loadTextures"
        }) as Texture | null;
        if (!texture)
            return null;

        // Flip the texture vertically if it's a DDS format (using UV coordinates)
        if (isDDS) {
            // @ts-expect-error Manually editing texture UVs to fix DDS flipping issue
            texture.uvs = {
                x0: 0, y0: 1,
                x1: 1, y1: 1,
                x2: 1, y2: 0,
                x3: 0, y3: 0
            };
        }

        // If the map is pixel-art, set the texture's scale mode to NEAREST
        const {pixelArtMode} = get(docPropertiesAtom);
        if (pixelArtMode)
            texture.source.scaleMode = "nearest";

        return texture as Texture;
    } catch (error) {
        console.warn(`Failed to load texture from URL: ${url}`, error);
        return null;
    }
});