import { atom, useAtomValue } from "jotai";
import { SINGLE_TYPES } from "../../types/generic/Constants";
import { elementsAtom } from "../map/useMap";

export const hideTypesAtom = atom((get) => {
    const elements = get(elementsAtom);
    return SINGLE_TYPES.filter((type) => elements.some((elem) => elem.type === type));
});

export default function useHiddenTypes() {
    return useAtomValue(hideTypesAtom);
}