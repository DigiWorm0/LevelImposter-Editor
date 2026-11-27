import GUID from "@/shared/types/GUID";
import LIAnimPropertyType from "@/map-format/LIAnimPropertyType";
import {atom} from "jotai";

export interface SelectedKeyframe {
    targetID: GUID;
    property: LIAnimPropertyType;
    keyframeID: number;
}

export const selectedKeyframeAtom = atom<SelectedKeyframe | undefined>(undefined);