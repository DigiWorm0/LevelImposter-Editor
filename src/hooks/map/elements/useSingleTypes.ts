import { atom, useAtomValue } from "jotai";
import { elementsAtom } from "../useMap";
import { SINGLE_TYPES } from "../../../types/generic/Constants";

export const hideTypesAtom = atom((get) => {
    const elements = get(elementsAtom);
    return SINGLE_TYPES.filter((type) => elements.some((elem) => elem.type === type));
});

export default function useHiddenTypes() {
    return useAtomValue(hideTypesAtom);
}