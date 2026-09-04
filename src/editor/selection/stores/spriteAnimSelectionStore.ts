import {atom} from "jotai";
import {MaybeGUID} from "@shared/types/GUID";

export const selectedSpriteAnimIDAtom = atom<MaybeGUID>(undefined);
export const selectedSpriteAnimTypeAtom = atom<string | undefined>(undefined);