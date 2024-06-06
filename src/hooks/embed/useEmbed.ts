import { atom, useAtomValue } from "jotai";

export const isEmbeddedAtom = atom(() => {
    const params = new URLSearchParams(window.location.search);
    return params.has("embed");
});
isEmbeddedAtom.debugLabel = "isEmbeddedAtom";


export default function useEmbed() {
    return useAtomValue(isEmbeddedAtom);
}