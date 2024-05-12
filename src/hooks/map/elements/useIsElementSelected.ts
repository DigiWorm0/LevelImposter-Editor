import { atom, useAtomValue } from "jotai";
import { selectedElementAtom } from "./useSelectedElem";

export const isElementSelectedAtom = atom((get) => {
    return get(selectedElementAtom) !== undefined;
});
isElementSelectedAtom.debugLabel = "isElementSelectedAtom";

export default function useIsElementSelected() {
    return useAtomValue(isElementSelectedAtom);
}