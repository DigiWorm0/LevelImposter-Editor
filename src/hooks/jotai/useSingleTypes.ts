import { atom, useAtomValue } from "jotai";
import { elementsAtom } from "./useMap";

const SINGLE_TYPES = [
    "util-minimap",
    "util-spawn1",
    "util-spawn2",
    "util-platform",
    "sab-electric",
    "sab-oxygen1",
    "sab-oxygen2",
    "sab-comms",
    "sab-reactorleft",
    "sab-reactorright"
];

export const hideTypesAtom = atom((get) => {
    const elements = get(elementsAtom);
    return SINGLE_TYPES.filter((type) => elements.some((elem) => elem.type === type));
});

export default function useHiddenTypes() {
    return useAtomValue(hideTypesAtom);
}