import {allElementsAtom} from "../../../editor/state/documentStore";
import makeElementTypeFilter from "../makeElementTypeFilter";
import {SINGLE_TYPES} from "../../../types/amongus/Constants";

const SingleElementOnlyFilter = makeElementTypeFilter((type, get) => {
    if (!SINGLE_TYPES.includes(type))
        return true;

    const elements = get(allElementsAtom);
    const elementExists = elements.some((elem) => elem.type === type);

    return !elementExists;
});

export default SingleElementOnlyFilter;