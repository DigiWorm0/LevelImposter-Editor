import {atomFamily} from "jotai/utils";
import {atom} from "jotai";
import {elementTypeCountAtomFamily} from "@/hooks/elements/useElementTypeCount";

export const elementTypeExistsAtomFamily = atomFamily((type: string) => atom(get => {
    return get(elementTypeCountAtomFamily(type)) > 0;
}));