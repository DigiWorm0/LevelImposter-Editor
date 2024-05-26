import { atom, useAtom } from "jotai/index";
import { MaybeGUID } from "../../types/generic/GUID";

export const draggingElementIDAtom = atom<MaybeGUID>(undefined);

export default function useDraggingElementID() {
    return useAtom(draggingElementIDAtom);
}
