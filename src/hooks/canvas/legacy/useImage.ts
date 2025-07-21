import {atomFamily, unwrap} from "jotai/utils";
import {atom, useAtomValue} from "jotai";

export const imageAtomFamily = atomFamily((url: string) => {
    const imageAtom = atom(() => {
        return new Promise<HTMLImageElement>((resolve) => {
            const img = new window.Image();
            img.src = url;
            img.onload = () => resolve(img);

            // We don't care about errors here
            //img.onerror = console.error;
        });
    });
    imageAtom.debugLabel = `useImageAtomFamily(${url})`;
    return imageAtom;
}, (a, b) => a === b);

export default function useImage(url: string) {
    return useAtomValue(unwrap(imageAtomFamily(url), prev => prev));
}