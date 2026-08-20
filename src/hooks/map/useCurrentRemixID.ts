import {atom, useAtom} from "jotai";
import GUID from "../../types/common/GUID";

export const currentRemixIDAtom = atom<GUID | null>(null);

export default function useCurrentRemixID() {
    return useAtom(currentRemixIDAtom);
}