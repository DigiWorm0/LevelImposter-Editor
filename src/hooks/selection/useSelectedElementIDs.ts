import GUID from "../../types/common/GUID";
import {atom, useAtom} from "jotai";

export const selectedElementIDsAtom = atom<GUID[]>([]);

export default function useSelectedElementIDs() {
    return useAtom(selectedElementIDsAtom);
}