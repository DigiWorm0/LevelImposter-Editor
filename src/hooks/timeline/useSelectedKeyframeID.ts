import {atom, useAtom} from "jotai";
import {MaybeGUID} from "../../types/generic/GUID";

export const selectedKeyframeIDAtom = atom<MaybeGUID>(undefined);

export default function useSelectedKeyframeID() {
    return useAtom(selectedKeyframeIDAtom);
}