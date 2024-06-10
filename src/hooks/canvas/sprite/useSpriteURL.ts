import { atom, useAtomValue } from "jotai";
import { atomFamily } from "jotai/utils";
import AUElementDB from "../../../types/db/AUElementDB";
import { MaybeGUID } from "../../../types/generic/GUID";
import { mapAssetsAtomFamily } from "../../assets/useMapAsset";
import { elementFamilyAtom } from "../../elements/useElements";

// TODO: Put this in constants
const DEFAULT_URL = "/sprites/util-unknown.png";

export const spriteURLAtomFamily = atomFamily((id: MaybeGUID) => {
    return atom(get => {
        const elem = get(elementFamilyAtom(id));
        const asset = get(mapAssetsAtomFamily(elem?.properties.spriteID));

        // If asset is found, return asset URL
        const assetURL = asset?.url;
        if (assetURL)
            return assetURL;

        // If strings is valid, return strings URL
        if (elem && AUElementDB.includes(elem.type))
            return `/sprites/${elem.type}.png`;

        // Otherwise, return default URL
        return DEFAULT_URL;
    });
});

export default function useSpriteURL(elementID: MaybeGUID) {
    return useAtomValue(spriteURLAtomFamily(elementID));
}