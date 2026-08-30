import {atom} from "jotai";
import {MaybeGUID} from "@/shared/types/GUID";

export const selectedSpriteAnimIDAtom = atom<MaybeGUID>(undefined);