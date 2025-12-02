import {useAtomValue} from "jotai";
import {focusAtom} from "jotai-optics";
import {mapAtom} from "../map/useMap";

// Map Asset Family
export const mapAssetsAtom = focusAtom(mapAtom, (optic) => optic.prop("assets"));

// Hooks
export function useMapAssetsValue() {
    return useAtomValue(mapAssetsAtom);
}