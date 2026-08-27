import {atom, useAtom} from "jotai";
import {MaybeGUID} from "@/types/common/GUID";

export const draggingElementIDAtom = atom<MaybeGUID>(undefined);

export default function useDraggingElementID() {
    return useAtom(draggingElementIDAtom);
}
