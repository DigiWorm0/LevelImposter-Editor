import {atom} from "jotai";
import {MaybeGUID} from "@shared/types/GUID";

// TODO: Implement scenes
export const currentSceneIDAtom = atom<MaybeGUID>(undefined);