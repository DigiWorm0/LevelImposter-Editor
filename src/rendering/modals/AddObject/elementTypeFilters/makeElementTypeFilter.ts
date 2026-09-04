import {Atom, atom, Getter} from "jotai";
import {atomFamily} from "jotai/utils";
import {AtomFamily} from "jotai/vanilla/utils/atomFamily";

export type ElementTypeFilter = AtomFamily<string, Atom<boolean>>;

/**
 * Makes an atom for checking if an element type is enabled.
 * @param getTypeEnabled Function that takes an element type and a Jotai getter, and returns whether the type is enabled.
 * @returns An atom family that creates atoms for checking if specific element types are enabled.
 */
export default function makeElementTypeFilter(
    getTypeEnabled: (type: string, get: Getter) => boolean
): ElementTypeFilter {
    return atomFamily((type: string) =>
        atom((get) => getTypeEnabled(type, get))
    );
}