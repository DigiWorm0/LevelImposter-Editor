import {atomFamily} from "jotai/utils";
import GUID from "../../types/generic/GUID";
import {atom, useAtomValue} from "jotai";
import getElemVisibility, {ElemVisibility} from "../../utils/map/getMapVisibility";
import {isAnimatingAtomFamily} from "../elements/useIsAnimating";
import {isSelectedColliderAtom} from "../elements/colliders/useSelectedCollider";
import {elementFamilyAtom} from "../elements/useElements";
import {isSelectedElemFamily} from "../elements/useSelectedElem";
import {settingsAtom} from "../useSettings";

const SECONDARY_RENDER_TYPES = [
    "util-starfield",
    "util-blankscroll",
    "util-blankfloat"
];

export const mapElementOpacityAtom = atomFamily((id: GUID) => {

    return atom((get) => {
        const elem = get(elementFamilyAtom(id));
        if (!elem)
            return 0;

        const isAnimating = get(isAnimatingAtomFamily(id));
        const isColliderSelected = get(isSelectedColliderAtom);
        const isVisible = elem.properties.isVisible ?? true;
        const elemVisibility = getElemVisibility(elem);
        const isSelected = get(isSelectedElemFamily(id));
        const isSecondaryRenderer = SECONDARY_RENDER_TYPES.includes(elem.type);

        const {invisibleOpacity} = get(settingsAtom);

        return (isAnimating ? 0.5 : 1) * // If Element is Anim Target
            (isColliderSelected ? 0.5 : 1) * // If Collider is Selected
            (isVisible ? 1 : (isSelected ? invisibleOpacity : 0)) * // If Element is Visible
            (elemVisibility === ElemVisibility.Visible || isSelected ? 1 : invisibleOpacity) * // If Element is Visible in Current Layer
            (isSecondaryRenderer && isSelected ? invisibleOpacity : 1); // If Element has Secondary Render

    });
});

export default function useMapElementOpacity(id: GUID) {
    return useAtomValue(mapElementOpacityAtom(id));
}