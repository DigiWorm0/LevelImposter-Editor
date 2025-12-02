import {atom, useAtom} from "jotai";
import {MaybeGUID} from "../../types/common/GUID";

export const selectedSpriteAnimIDAtom = atom<MaybeGUID>(undefined);

export default function useSelectedSpriteAnimID() {
    return useAtom(selectedSpriteAnimIDAtom);
}