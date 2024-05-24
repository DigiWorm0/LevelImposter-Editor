import { useAtomValue } from "jotai";
import { focusAtom } from "jotai-optics";
import { mapAtom } from "../useMap";

// Map Asset Family
export const mapAssetsAtom = focusAtom(mapAtom, (optic) => optic.prop("assets"));

// Hooks
export default function useMapAssetsValue() {
    return useAtomValue(mapAssetsAtom);
}