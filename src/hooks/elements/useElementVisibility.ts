import { atomFamily } from "jotai/utils";
import { MaybeGUID } from "../../types/generic/GUID";
import { atom, useAtomValue } from "jotai";
import getElemVisibility from "../../utils/map/getMapVisibility";
import { elementFamilyAtom } from "./useElements";

export const elementVisibilityAtomFamily = atomFamily((id: MaybeGUID) => {
    return atom((get) => {
        const element = get(elementFamilyAtom(id));
        return getElemVisibility(element);
    });
});

export default function useElementVisibility(id: MaybeGUID) {
    return useAtomValue(elementVisibilityAtomFamily(id));
}