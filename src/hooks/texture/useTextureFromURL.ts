import {atomFamily, unwrap} from "jotai/utils";
import {atom, useAtomValue} from "jotai";
import {Assets, Texture} from "pixi.js";
import {assetAtURLAtom} from "../assets/useAssetAtURL";
import {mapPropsAtom} from "../map/useMap";

export const textureFromURLAtomFamily = atomFamily((url: string | undefined) => {
    return atom(async (get) => {

        try {
            // If the URL is undefined, return null
            if (!url)
                return null;

            // Check if the asset is a DDS format by
            // finding an equivalent map asset and checking its type
            let isDDS = false;
            if (url.startsWith("blob:") || url.startsWith("data:")) {
                const mapAsset = get(assetAtURLAtom(url));
                isDDS = mapAsset?.type === "image/dds";
            }

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
            const {pixelArtMode} = get(mapPropsAtom);
            if (pixelArtMode)
                texture.source.scaleMode = "nearest";

            return texture as Texture;
        } catch (error) {
            console.warn(`Failed to load texture from URL: ${url}`, error);
            return null;
        }
    });
});

export default function useTextureFromURL(url: string | undefined) {
    return useAtomValue(unwrap(textureFromURLAtomFamily(url)));
}