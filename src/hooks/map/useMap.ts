import {atom, useAtom, useAtomValue, useSetAtom} from "jotai";
import {focusAtom} from "jotai-optics";
import {DEFAULT_MAP} from "../../types/amongus/Constants";

// Atoms
export const mapAtom = atom({...DEFAULT_MAP});
export const mapIDAtom = focusAtom(mapAtom, (optic) => optic.prop("id"));
export const mapNameAtom = focusAtom(mapAtom, (optic) => optic.prop("name"));
export const mapDescriptionAtom = focusAtom(mapAtom, (optic) => optic.prop("description"));
export const mapIsPublicAtom = focusAtom(mapAtom, (optic) => optic.prop("isPublic"));
export const mapTargetAtom = focusAtom(mapAtom, (optic) => optic.prop("mapTarget"));
export const mapAuthorNameAtom = focusAtom(mapAtom, (optic) => optic.prop("authorName"));
export const mapPropsAtom = focusAtom(mapAtom, (optic) => optic.prop("properties"));
export const elementsAtom = focusAtom(mapAtom, (optic) => optic.prop("elements"));
export const spritesAtlasesAtom = focusAtom(mapAtom, (optic) => optic.prop("spriteAtlases"));

// Hooks
export default function useMap() {
    return useAtom(mapAtom);
}

export function useSetMap() {
    return useSetAtom(mapAtom);
}

export function useMapValue() {
    return useAtomValue(mapAtom);
}

export function useMapID() {
    return useAtomValue(mapIDAtom);
}

export function useMapName() {
    return useAtom(mapNameAtom);
}

export function useMapTarget() {
    return useAtom(mapTargetAtom);
}

export function useMapDescription() {
    return useAtom(mapDescriptionAtom);
}

export function useMapIsPublic() {
    return useAtom(mapIsPublicAtom);
}

export function useMapAuthorName() {
    return useAtom(mapAuthorNameAtom);
}

export function useMapProperties() {
    return useAtom(mapPropsAtom);
}

export function useElements() {
    return useAtom(elementsAtom);
}