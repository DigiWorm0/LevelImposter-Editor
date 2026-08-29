import {atom} from "jotai";
import {atomWithStorage} from "jotai/utils";

export const buildLogAtom = atom<string[]>([]);
export const enabledBuildOptionIDs = atomWithStorage<string[]>("enabledOptimizeOptionIDs", []);
export const isBuildRunningAtom = atom(false);
