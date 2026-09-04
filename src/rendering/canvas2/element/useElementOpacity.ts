import getElementVisibility, {ElemVisibility} from "@editor/document/elements/types/getElementVisibility";
import {useSelectedElemPropValue} from "../../../hooks/elements/useSelectedElemProperty";
import {MaybeGUID} from "@shared/types/GUID";
import useIsElementSelected from "../../../hooks/elements/useIsElementSelected";
import {Color} from "pixi.js";
import {useElement} from "@editor/document/elements/useElement";
import {useAtomValue} from "jotai";
import {isColliderSelectedAtom} from "@editor/selection/stores/colliderSelectionStore";
import {settingsAtom} from "@editor/settings/settingsStore";

const SECONDARY_RENDER_TYPES = [
    "util-starfield",
    "util-blankscroll",
    "util-blankfloat"
];

export default function useElementOpacity(elementID: MaybeGUID): number {
    const isColliderSelected = useAtomValue(isColliderSelectedAtom);
    const isSelected = useIsElementSelected(elementID);
    const {invisibleOpacity} = useAtomValue(settingsAtom);
    const elem = useElement(elementID);
    const animTargets = useSelectedElemPropValue("animTargets");

    if (!elem)
        return 0;

    const elemColorOpacity = new Color(elem.properties.color).alpha;
    const isAnimTarget = animTargets?.some(t => t.id === elementID);
    const elemVisibility = getElementVisibility(elem);
    const isVisible = elem.properties.isVisible ?? true;
    return elemColorOpacity * // The base opacity from the element color
        (isAnimTarget ? 0.5 : 1) * // If Element is Anim Target
        (isColliderSelected ? 0.5 : 1) * // If Collider is Selected
        (isVisible ? 1 : (isSelected ? invisibleOpacity : 0)) * // If Element is Visible
        (elemVisibility === ElemVisibility.Visible || isSelected ? 1 : invisibleOpacity) * // If Element is Visible in Current Layer
        (SECONDARY_RENDER_TYPES.includes(elem.type) && isSelected ? invisibleOpacity : 1); // If Element has Secondary Render
}