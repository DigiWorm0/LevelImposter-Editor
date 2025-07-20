import {atomFamily, unwrap} from "jotai/utils";
import {atom, useAtomValue} from "jotai";
import {Assets} from "pixi.js";
import {spriteURLAtomFamily} from "./sprite/useSpriteURL";
import {MaybeGUID} from "../../types/generic/GUID";
import {mapAssetsAtomFamily} from "../assets/useMapAsset";
import {elementFamilyAtom} from "../elements/useElements";

export const pixiAssetAtomFamily = atomFamily((id: MaybeGUID) => {
    return atom(async (get) => {
        const elem = get(elementFamilyAtom(id));
        const asset = get(mapAssetsAtomFamily(elem?.properties.spriteID));

        // Check if the asset is found
        if (!asset?.url)
            return await Assets.load(get(spriteURLAtomFamily(id)));

        // Otherwise, load the asset from the URL
        const texture = await Assets.load({
            src: asset.url,
            loadParser: asset.type === "image/ddsFormat" ? "loadDDS" : "loadTextures"
        });
        if (!texture)
            return null;

        // Flip the texture vertically if it's a DDS format (using UV coordinates)
        if (asset.type === "image/ddsFormat") {
            texture.uvs = {
                x0: 0, y0: 1,
                x1: 1, y1: 1,
                x2: 1, y2: 0,
                x3: 0, y3: 0
            };
        }
        return texture;
    });
});

export default function usePixiAsset(elementID: MaybeGUID) {
    return useAtomValue(unwrap(pixiAssetAtomFamily(elementID)));
}