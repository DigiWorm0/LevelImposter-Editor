import makeElementTypeFilter from "../makeElementTypeFilter";
import {SINGLE_TYPES} from "@/types/amongus/Constants";
import {elementTypeExistsAtomFamily} from "@/hooks/elementTypes/useElementTypeExists";

const SingleElementOnlyFilter = makeElementTypeFilter((type, get) => {
    if (!SINGLE_TYPES.includes(type))
        return true;

    return !get(elementTypeExistsAtomFamily(type));
});

export default SingleElementOnlyFilter;