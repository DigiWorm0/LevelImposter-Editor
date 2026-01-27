import {atom, useAtomValue} from "jotai";
import {atomFamily} from "jotai/utils";
import {ElementTypeFilter} from "./makeElementTypeFilter";
import SingleElementOnlyFilter from "./elementTypeFilters/SingleElementOnlyFilter";
import LobbyTargetFilter from "./elementTypeFilters/LobbyTargetFilter";
import GameTargetFilter from "./elementTypeFilters/GameTargetFilter";

const ElementTypeFilters: ElementTypeFilter[] = [
    SingleElementOnlyFilter,
    LobbyTargetFilter,
    GameTargetFilter
];

export const isTypeDisabledInSearch = atomFamily((type: string) => {

    // AtomFamily[] >>> Atom[]
    const filterAtoms = ElementTypeFilters.map((filter) => filter(type));

    return atom((get) => {
        // If any filter says the type is disabled, then it is disabled
        return filterAtoms.some((filterAtom) => !get(filterAtom));
    });
});

export default function useIsTypeDisabledInSearch(type: string) {
    return useAtomValue(isTypeDisabledInSearch(type));
}