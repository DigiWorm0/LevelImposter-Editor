import {atom} from "jotai";
import {MaybeGUID} from "@/types/common/GUID";

export const selectedSpriteAnimIDAtom = atom<MaybeGUID>(undefined);