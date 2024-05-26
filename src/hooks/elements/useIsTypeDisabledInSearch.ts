import { atom, useAtomValue } from "jotai";
import { SINGLE_TYPES } from "../../types/generic/Constants";
import { elementsAtom } from "../map/useMap";
import { atomFamily } from "jotai/utils";

export const isTypeDisabledInSearch = atomFamily((type: string) => {
    return atom((get) => {
        if (!SINGLE_TYPES.includes(type))
            return false;

        const elements = get(elementsAtom);
        return elements.some((elem) => elem.type === type);

    });
});

export default function useIsTypeDisabledInSearch(type: string) {
    return useAtomValue(isTypeDisabledInSearch(type));
}