import {atomFamily} from "jotai/utils";
import {atom, Getter} from "jotai";

/**
 * Creates an atom family that simply caches the output of the update function for each id.
 * @param update - A function that takes an id and a getter, and returns the output for that id.
 * @returns An atom family that caches the output of the update function for each id.
 */
export default function cachedAtomFamily<TID, TOutput>(
    update: (id: TID, getter: Getter) => TOutput
) {
    return atomFamily((id: TID) => atom((get) => update(id, get)));
}