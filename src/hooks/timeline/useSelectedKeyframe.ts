import {atom, useAtom} from "jotai";
import GUID from "../../types/generic/GUID";
import LIAnimPropertyType from "../../types/li/LIAnimPropertyType";

export interface SelectedKeyframe {
    targetID: GUID;
    property: LIAnimPropertyType;
    keyframeID: number;
}

export const selectedKeyframeAtom = atom<SelectedKeyframe | undefined>(undefined);

export default function useSelectedKeyframe() {
    return useAtom(selectedKeyframeAtom);
}