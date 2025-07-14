import getElemVisibility, {ElemVisibility} from "../../utils/map/getMapVisibility";
import {useIsSelectedElem} from "../elements/useSelectedElem";
import {useIsSelectedCollider} from "../elements/colliders/useSelectedCollider";
import {useSettingsValue} from "../useSettings";
import useElement from "../elements/useElements";
import {useSelectedElemPropValue} from "../elements/useSelectedElemProperty";
import {MaybeGUID} from "../../types/generic/GUID";

const SECONDARY_RENDER_TYPES = [
    "util-starfield",
    "util-blankscroll",
    "util-blankfloat"
];

export default function useElementOpacity(elementID: MaybeGUID): number {
    const isColliderSelected = useIsSelectedCollider();
    const isSelected = useIsSelectedElem(elementID);
    const {invisibleOpacity} = useSettingsValue();
    const [elem] = useElement(elementID);
    const animTargets = useSelectedElemPropValue("animTargets");

    if (!elem || elem.type === "util-layer")
        return 0;

    const isAnimTarget = animTargets?.some(t => t.id === elementID);
    const elemVisibility = getElemVisibility(elem);
    const isVisible = elem.properties.isVisible ?? true;
    return (isAnimTarget ? 0.5 : 1) * // If Element is Anim Target
        (isColliderSelected ? 0.5 : 1) * // If Collider is Selected
        (isVisible ? 1 : (isSelected ? invisibleOpacity : 0)) * // If Element is Visible
        (elemVisibility === ElemVisibility.Visible || isSelected ? 1 : invisibleOpacity) * // If Element is Visible in Current Layer
        (SECONDARY_RENDER_TYPES.includes(elem.type) && isSelected ? invisibleOpacity : 1); // If Element has Secondary Render
}