import { atom, useAtom } from "jotai";
import GUID from "../../../types/common/GUID";

export const publishTargetAtom = atom<GUID | null>(null);

export default function usePublishTarget() {
    return useAtom(publishTargetAtom);
}