import { atomFamily } from "jotai/utils";
import { atom, useAtom, useAtomValue } from "jotai";
import { getI18n } from "react-i18next";

export const searchQueryAtom = atom("");
export const isTypeVisibleInSearch = atomFamily((type: string) => {
    return atom((get) => {
        const searchQuery = get(searchQueryAtom).toLowerCase();
        const typeName = getI18n().t(`au.${type}`).toLowerCase();
        return type.includes(searchQuery) || typeName.includes(searchQuery);
    });
});

export function useSearchQuery() {
    return useAtom(searchQueryAtom);
}

export default function useIsTypeVisibleInSearch(type: string) {
    return useAtomValue(isTypeVisibleInSearch(type));
}