import {atom, useAtom} from "jotai";
import {MaybeGUID} from "@/shared/types/GUID";

export const draggingElementIDAtom = atom<MaybeGUID>(undefined);

export default function useDraggingElementID() {
    return useAtom(draggingElementIDAtom);
}
