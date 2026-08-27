import {atomFamily} from "jotai/utils";
import {MaybeGUID} from "@/types/common/GUID";
import {atom, useAtomValue} from "jotai";
import getElemVisibility from "../../utils/map/getMapVisibility";

import {elementAtomFamily} from "@editor/state/documentStore";

export const elementVisibilityAtomFamily = atomFamily((id: MaybeGUID) => {
    return atom((get) => {
        const element = get(elementAtomFamily(id));
        return getElemVisibility(element);
    });
});

export default function useElementVisibility(id: MaybeGUID) {
    return useAtomValue(elementVisibilityAtomFamily(id));
}