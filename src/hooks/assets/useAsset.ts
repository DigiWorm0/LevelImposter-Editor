import {useAtomValue} from "jotai";
import {MaybeGUID} from "@/types/common/GUID";
import {assetsAtomFamily} from "@editor/state/assetsStore";

// Hooks
export default function useAsset(id: MaybeGUID) {
    return useAtomValue(assetsAtomFamily(id));
}