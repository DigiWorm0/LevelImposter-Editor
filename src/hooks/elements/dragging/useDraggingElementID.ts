import {atom, useAtom} from "jotai/esm";
import {MaybeGUID} from "@/types/common/GUID";

export const draggingElementIDAtom = atom<MaybeGUID>(undefined);

export default function useDraggingElementID() {
    return useAtom(draggingElementIDAtom);
}
