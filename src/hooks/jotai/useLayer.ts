import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { focusAtom } from "jotai/optics";
import { MaybeGUID } from "../../types/generic/GUID";
import { MaybeLILayer } from "../../types/li/LILayer";
import { elementsAtom, mapAtom, mapPropsAtom } from "./useMap";

// Atoms
export const layersAtom = focusAtom(mapPropsAtom, (optic) => optic.prop("layers"));
export const selectedLayerIDAtom = atom<MaybeGUID>(undefined);
export const selectedLayerAtom = atom(
    (get) => {
        const layers = get(layersAtom);
        const id = get(selectedLayerIDAtom);
        const layer = layers?.find((layer) => layer.id === id);
        return layer;
    },
    (get, set, layer: MaybeLILayer) => {
        const layers = get(layersAtom);
        if (layers === undefined)
            return;
        const index = layers.findIndex((l) => l.id === layer?.id);
        if (index >= 0 && layer) {
            layers[index] = { ...layer };
            set(mapAtom, { ...get(mapAtom), layers });
        }
    }
);
export const isSelectedLayerAtom = atom(
    (get) => {
        return get(selectedLayerIDAtom) != undefined;
    }
);
export const layerElementIDsAtom = atom(
    (get) => {
        const elements = get(elementsAtom);
        const layer = get(selectedLayerAtom);
        if (layer === undefined)
            return elements?.map((element) => element.id);
        return elements.filter((element) => element.properties.layer === layer.id).map((element) => element.id);
    }
);

// Debug
selectedLayerIDAtom.debugLabel = "selectedLayerIDAtom";
selectedLayerAtom.debugLabel = "selectedLayerAtom";
isSelectedLayerAtom.debugLabel = "isSelectedLayerAtom";

// Hooks
export function useLayers() {
    return useAtom(layersAtom);
}
export function useLayersValue() {
    return useAtomValue(layersAtom);
}
export function useSetLayers() {
    return useSetAtom(layersAtom);
}

export function useSelectedLayerID() {
    return useAtom(selectedLayerIDAtom);
}
export function useSetSelectedLayerID() {
    return useSetAtom(selectedLayerIDAtom);
}
export function useSelectedLayerIDValue() {
    return useAtomValue(selectedLayerIDAtom);
}

export default function useSelectedLayer() {
    return useAtom(selectedLayerAtom);
}
export function useSetSelectedLayer() {
    return useSetAtom(selectedLayerAtom);
}
export function useSelectedLayerValue() {
    return useAtomValue(selectedLayerAtom);
}
export function useIsSelectedLayer() {
    return useAtomValue(isSelectedLayerAtom);
}

export function useLayerElementIDs() {
    return useAtomValue(layerElementIDsAtom);
}