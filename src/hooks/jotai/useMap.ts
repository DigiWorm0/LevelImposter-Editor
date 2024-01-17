import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { focusAtom } from "jotai-optics";
import { atomWithReset, useResetAtom } from "jotai/utils";
import { MAP_FORMAT_VER } from "../../types/generic/Constants";
import LIMap from "../../types/li/LIMap";
import { DEFAULT_GUID } from "../utils/generateGUID";

const DEFAULT_MAP: LIMap = {
    v: MAP_FORMAT_VER,
    id: DEFAULT_GUID,
    name: "New Map",
    description: "",
    isPublic: false,
    isVerified: false,
    authorID: "",
    authorName: "",
    createdAt: -1,
    likeCount: 0,
    elements: [],
    assets: [],
    properties: {},
    thumbnailURL: null,
    remixOf: null,
};

// Atoms
export const mapAtom = atomWithReset(DEFAULT_MAP);
export const mapIDAtom = focusAtom(mapAtom, (optic) => optic.prop("id"));
export const mapNameAtom = focusAtom(mapAtom, (optic) => optic.prop("name"));
export const mapDescriptionAtom = focusAtom(mapAtom, (optic) => optic.prop("description"));
export const mapIsPublicAtom = focusAtom(mapAtom, (optic) => optic.prop("isPublic"));
export const mapAuthorNameAtom = focusAtom(mapAtom, (optic) => optic.prop("authorName"));
export const mapPropsAtom = focusAtom(mapAtom, (optic) => optic.prop("properties"));
export const elementsAtom = focusAtom(mapAtom, (optic) => optic.prop("elements"));
export const elementIDsAtom = atom((get) => {
    return get(elementsAtom).map((e) => e.id);
});

// Debug
mapAtom.debugLabel = "mapAtom";
mapNameAtom.debugLabel = "mapNameAtom";
mapDescriptionAtom.debugLabel = "mapDescriptionAtom";
mapIsPublicAtom.debugLabel = "mapIsPublicAtom";
mapAuthorNameAtom.debugLabel = "mapAuthorNameAtom";
mapPropsAtom.debugLabel = "mapPropsAtom";
elementsAtom.debugLabel = "elementsAtom";
elementIDsAtom.debugLabel = "elementIDsAtom";

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

export function useMapReset() {
    return useResetAtom(mapAtom);
}

export function useElementIDs() {
    return useAtomValue(elementIDsAtom);
}

export function useElements() {
    return useAtom(elementsAtom);
}