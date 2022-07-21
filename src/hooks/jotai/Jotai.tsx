import { atom } from "jotai";
import { focusAtom } from "jotai/optics";
import { atomFamily, atomWithReset, atomWithStorage, splitAtom } from 'jotai/utils';
import GUID, { MaybeGUID } from "../../types/generic/GUID";
import { MaybeLICollider } from "../../types/li/LICollider";
import LIElement, { MaybeLIElement } from "../../types/li/LIElement";
import LIMap from "../../types/li/LIMap";
import { MAP_FORMAT_VER } from "../../types/li/LIMetadata";
import LISettings from "../../types/li/LISettings";
import { DEFAULT_GUID } from "../generateGUID";

// Defaults
export const DEFAULT_MAP: LIMap = {
    v: MAP_FORMAT_VER,
    id: DEFAULT_GUID,
    name: "New Map",
    description: "",
    isPublic: false,
    isVerified: false,
    authorID: "",
    authorName: "",
    elements: [],
    properties: {},
};
export const DEFAULT_SETTINGS: LISettings = {
    isDarkMode: true,
    isGridVisible: true,
    isAxisVisible: true,
};
export const PROVIDER_SCOPE = "main";

// Map
export const mapAtom = atomWithReset(DEFAULT_MAP);
export const mapNameAtom = focusAtom(mapAtom, (optic) => optic.prop("name"));
export const elementsAtom = focusAtom(mapAtom, (optic) => optic.prop("elements"));
export const elementIDsAtom = atom((get) => {
    return get(elementsAtom).map((e) => e.id);
});
export const elementFamilyAtom = atomFamily((id: MaybeGUID) => {
    const elemAtom = atom(
        (get) => {
            const elements = get(elementsAtom);
            return elements.find((elem) => elem.id === id);
        },
        (get, set, elem: MaybeLIElement) => {
            const elements = get(elementsAtom);
            const index = elements.findIndex((e) => e.id === elem?.id);
            if (index >= 0 && elem) {
                elements[index] = elem;
                set(elementsAtom, [...elements]);
            }
        }
    );
    elemAtom.debugLabel = `elementFamilyAtom(${id})`;
    return elemAtom;
}, (a, b) => a === b);

// Element Helpers
export const removeElementAtom = atom(null, (get, set, id: MaybeGUID) => {
    elementFamilyAtom.remove(id);
    set(elementsAtom, get(elementsAtom).filter((elem) => elem.id !== id));
});
export const addElementAtom = atom(null, (get, set, elem: LIElement) => {
    set(elementsAtom, [...get(elementsAtom), elem]);
});

// Selected Element
export const selectedElemIDAtom = atom<MaybeGUID>(undefined);
export const selectedElemAtom = atom(
    (get) => {
        const id = get(selectedElemIDAtom);
        const elemAtom = elementFamilyAtom(id);
        const elem = get(elemAtom);
        return elem;
    },
    (get, set, elem: MaybeLIElement) => {
        const elements = get(elementsAtom);
        const index = elements.findIndex((e) => e.id === elem?.id);
        if (index >= 0 && elem) {
            elements[index] = elem;
            set(elementsAtom, [...elements]);
        }
    }
);

// Selected Collider
export const selectedColliderIDAtom = atom<MaybeGUID>(undefined);
export const selectedColliderAtom = atom(
    (get) => {
        const selectedElem = get(selectedElemAtom);
        const selectedColliderID = get(selectedColliderIDAtom);
        const selectedCollider = selectedElem?.properties.colliders?.find(
            (collider) => collider.id === selectedColliderID
        );
        return selectedCollider;
    },
    (get, set, collider: MaybeLICollider) => {
        const selectedElem = get(selectedElemAtom);
        const colliders = selectedElem?.properties.colliders;
        const index = colliders?.findIndex((c) => c.id === collider?.id);
        if (index != undefined && index >= 0 && colliders != undefined && collider != undefined) {
            colliders[index] = collider;
            set(selectedElemAtom, selectedElem);
        }
    }
);
export const isSelectedColliderAtom = atom(
    (get) => {
        return get(selectedColliderIDAtom) != undefined;
    }
);

// Selection Helpers
export const isSelectedElemFamily = atomFamily((id: MaybeGUID) => atom((get) => get(selectedElemIDAtom) === id));
export const selectElemAtom = atom(null, (get, set, elem: MaybeLIElement) => {
    if (elem)
        set(selectedElemIDAtom, elem.id);
    else
        set(selectedElemIDAtom, undefined);
});

// Vents
export const ventsAtom = atom<LIElement[]>((get) => {
    const elements = get(elementsAtom);
    return elements.filter(element => element.type.startsWith("util-vent"));
});
export const selectedVentConnectionsAtom = atom((get) => {
    const selectedElem = get(selectedElemAtom);
    const vents = get(ventsAtom);
    if (!selectedElem)
        return [];
    const leftVent = vents.find(e => e.id === selectedElem.properties.leftVent);
    const middleVent = vents.find(e => e.id === selectedElem.properties.middleVent);
    const rightVent = vents.find(e => e.id === selectedElem.properties.rightVent);
    return [leftVent, middleVent, rightVent];
});
export const settingsAtom = atomWithStorage<LISettings>("settings", DEFAULT_SETTINGS);

// Mouse
export const mouseXAtom = atom(0);
export const mouseYAtom = atom(0);

// Debug Labels
mapAtom.debugLabel = "map";
mapNameAtom.debugLabel = "mapName";
elementsAtom.debugLabel = "elements";
elementIDsAtom.debugLabel = "elementIDs";
selectedElemIDAtom.debugLabel = "selectedElemID";
selectedElemAtom.debugLabel = "selectedElem";
selectedColliderIDAtom.debugLabel = "selectedColliderID";
selectedColliderAtom.debugLabel = "selectedCollider";
isSelectedColliderAtom.debugLabel = "isSelectedCollider";
selectElemAtom.debugLabel = "selectElem";
ventsAtom.debugLabel = "vents";
selectedVentConnectionsAtom.debugLabel = "selectedVentConnections";
settingsAtom.debugLabel = "settings";
mouseXAtom.debugLabel = "mouseX";
mouseYAtom.debugLabel = "mouseY";