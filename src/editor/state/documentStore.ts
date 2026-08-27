import {atom} from "jotai";
import {focusAtom} from "jotai-optics";
import {DEFAULT_MAP} from "../../types/amongus/Constants";
import {atomFamily} from "jotai/utils";
import {MaybeGUID} from "../../types/common/GUID";

export const mapAtom = atom({...DEFAULT_MAP});

// Computed Atoms
export const mapIDAtom = focusAtom(mapAtom, (optic) => optic.prop("id"));
export const mapNameAtom = focusAtom(mapAtom, (optic) => optic.prop("name"));
export const mapDescriptionAtom = focusAtom(mapAtom, (optic) => optic.prop("description"));
export const mapIsPublicAtom = focusAtom(mapAtom, (optic) => optic.prop("isPublic"));
export const mapTargetAtom = focusAtom(mapAtom, (optic) => optic.prop("mapTarget"));
export const mapAuthorNameAtom = focusAtom(mapAtom, (optic) => optic.prop("authorName"));
export const mapPropsAtom = focusAtom(mapAtom, (optic) => optic.prop("properties"));
export const allElementsAtom = atom((get) => get(mapAtom).elements);
export const spritesAtlasesAtom = focusAtom(mapAtom, (optic) => optic.prop("spriteAtlases"));

export const elementAtomFamily = atomFamily((id: MaybeGUID) => atom((get) => {
    const allElements = get(allElementsAtom);
    return allElements.find((elem) => elem.id === id);
}));