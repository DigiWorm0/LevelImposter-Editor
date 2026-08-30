import {atomFamily} from "jotai/utils";
import {MaybeGUID} from "@/shared/types/GUID";
import {atom} from "jotai";
import {spriteAtomFamily} from "../sprites/useSprite";
import {textureToImageBlob} from "@editor/assets/textureToImageBlob";

export const mapAssetAsImageBlobAtomFamily = atomFamily((id: MaybeGUID) => atom(async (get) => {
    const texture = await get(spriteAtomFamily(id));
    if (!texture)
        return null;

    return await textureToImageBlob(texture);
}));