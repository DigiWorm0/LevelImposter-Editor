import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { insertPointAtMouseAtom, isSelectedLayerAtom, layersAtom, selectedLayerAtom, selectedLayerIDAtom } from "./Jotai";

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

export function useInsertPointAtMouse() {
    return useSetAtom(insertPointAtMouseAtom);
}