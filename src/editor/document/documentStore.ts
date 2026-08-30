import {atom} from "jotai";
import {createNewMapDocument} from "@editor/document/types/DefaultMapDocument";
import {MapDocument} from "@editor/document/types/MapDocument";

export const documentAtom = atom<MapDocument>(createNewMapDocument());
export const isDocSavedAtom = atom(true);

// Computed Atoms
export const docNameAtom = atom((get) => get(documentAtom).name);
export const docElementsAtom = atom((get) => get(documentAtom).elements);
export const docSpriteAtlasesAtom = atom((get) => get(documentAtom).spriteAtlases);
export const docPropertiesAtom = atom((get) => get(documentAtom).properties);