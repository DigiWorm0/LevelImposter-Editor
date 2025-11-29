import {atom, useAtom} from "jotai";

export const selectedColliderPointIndexesAtom = atom<number[]>([]);

export default function useSelectedColliderPointIndexes() {
    return useAtom(selectedColliderPointIndexesAtom);
}