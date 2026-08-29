import {atomFamily} from "jotai/utils";
import {MaybeGUID} from "@/types/common/GUID";
import {atom, useAtomValue} from "jotai";
import getElemVisibility from "../../utils/map/getMapVisibility";
import {elementAtomFamily} from "@editor/state/documentStore";

export const elementVisibilityAtomFamily = atomFamily(
    (id: MaybeGUID) => atom((get) =>
        getElemVisibility(get(elementAtomFamily(id)))
    )
);

export default function useElementVisibility(id: MaybeGUID) {
    return useAtomValue(elementVisibilityAtomFamily(id));
}