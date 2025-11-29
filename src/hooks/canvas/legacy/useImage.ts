import {atomFamily, unwrap} from "jotai/utils";
import {atom, useAtomValue} from "jotai";
import getImageFromURL from "../../../utils/common/getImageFromURL";

export const imageAtomFamily = atomFamily((url: string) => {
    const imageAtom = atom(() => getImageFromURL(url));
    imageAtom.debugLabel = `useImageAtomFamily(${url})`;
    return imageAtom;
}, (a, b) => a === b);

export default function useImage(url: string) {
    return useAtomValue(unwrap(imageAtomFamily(url), prev => prev));
}