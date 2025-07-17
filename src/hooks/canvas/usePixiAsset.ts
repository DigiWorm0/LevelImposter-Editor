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
        return await Assets.load({
            src: asset.url,
            loadParser: asset.type === "image/dds" ? "loadDDS" : "loadTextures",
        });
    });
});

export default function usePixiAsset(elementID: MaybeGUID) {
    return useAtomValue(unwrap(pixiAssetAtomFamily(elementID)));
}