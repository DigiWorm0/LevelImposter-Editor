import {atom} from "jotai";
import {MaybeGUID} from "@/types/common/GUID";

// TODO: Implement scenes
export const currentSceneIDAtom = atom<MaybeGUID>(undefined);