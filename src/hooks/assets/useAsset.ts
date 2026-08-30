import {useAtomValue} from "jotai";
import {MaybeGUID} from "@/shared/types/GUID";
import {assetsAtomFamily} from "@editor/assets/assetsStore";

// Hooks
export default function useAsset(id: MaybeGUID) {
    return useAtomValue(assetsAtomFamily(id));
}