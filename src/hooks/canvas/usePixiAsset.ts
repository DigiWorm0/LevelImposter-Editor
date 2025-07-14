import {atomFamily, unwrap} from "jotai/utils";
import {atom, useAtomValue} from "jotai";
import {Assets} from "pixi.js";
import {spriteURLAtomFamily} from "./sprite/useSpriteURL";
import {MaybeGUID} from "../../types/generic/GUID";

export const pixiAssetAtomFamily = atomFamily((id: MaybeGUID) => {
    return atom(async (get) => {
        const spriteURL = get(spriteURLAtomFamily(id));

        // HACK: Pixi doesn't directly support loading from blob URLs due to regex issues
        // TODO: fix me
        if (spriteURL.startsWith("blob:"))
            return await Assets.load({
                src: spriteURL,
                format: "png",
                loadParser: "loadTextures",
            });

        return await Assets.load(spriteURL);
    });
});

export default function usePixiAsset(elementID: MaybeGUID) {
    return useAtomValue(unwrap(pixiAssetAtomFamily(elementID)));
}