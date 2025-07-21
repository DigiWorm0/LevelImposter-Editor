import {atomFamily, unwrap} from "jotai/utils";
import {atom, useAtomValue} from "jotai";
import {MaybeGUID} from "../../../types/generic/GUID";
import {spriteURLAtomFamily} from "./useSpriteURL";
import {spriteAtomFamily} from "./useSprite";

export const elementSpriteAtomFamily = atomFamily((id: MaybeGUID) => {
    return atom((get) => {
        const spriteURL = get(spriteURLAtomFamily(id));
        return get(spriteAtomFamily(spriteURL));
    });
});

export default function useElementSprite(id: MaybeGUID) {
    return useAtomValue(unwrap(elementSpriteAtomFamily(id)));
}