import {useAtomValue} from "jotai";
import {atomFamily, unwrap} from "jotai/utils";
import {textureFromURLAtomFamily} from "./useTextureFromURL";

export const textureOfTypeAtomFamily = atomFamily((type?: string) => {
    if (type === "undefined" || !type)
        return textureFromURLAtomFamily(undefined);
    return textureFromURLAtomFamily(`/sprites/${type}.png`);
});

export default function useTextureOfType(type?: string) {
    return useAtomValue(unwrap(textureOfTypeAtomFamily(type)));
}