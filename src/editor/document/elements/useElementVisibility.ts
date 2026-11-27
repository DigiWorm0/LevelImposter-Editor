import {atomFamily} from "jotai/utils";
import {MaybeGUID} from "@/shared/types/GUID";
import {atom, useAtomValue} from "jotai";
import getElementVisibility from "@editor/document/elements/types/getElementVisibility";

import {elementAtomFamily} from "@editor/document/elements/useElement";

export const elementVisibilityAtomFamily = atomFamily(
    (id: MaybeGUID) => atom((get) =>
        getElementVisibility(get(elementAtomFamily(id)))
    )
);

export default function useElementVisibility(id: MaybeGUID) {
    return useAtomValue(elementVisibilityAtomFamily(id));
}