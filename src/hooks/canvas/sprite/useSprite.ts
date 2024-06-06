import { MaybeGUID } from "../../../types/generic/GUID";
import { spriteURLAtomFamily } from "./useSpriteURL";
import { atomFamily, unwrap } from "jotai/utils";
import { atom, useAtomValue } from "jotai";
import { imageAtomFamily } from "./useImage";

export const spriteAtomFamily = atomFamily((id: MaybeGUID) => {
    return atom((get) => {
        const spriteURL = get(spriteURLAtomFamily(id));
        return get(imageAtomFamily(spriteURL));
    });
});

export default function useSprite(elementID: MaybeGUID) {
    return useAtomValue(unwrap(spriteAtomFamily(elementID)));
}