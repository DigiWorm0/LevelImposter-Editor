import GUID from "@shared/types/GUID";
import {useSettingsValue} from "@/hooks/useSettings";
import {UNITY_SCALE} from "@/types/amongus/Constants";
import {Container, Graphics} from "pixi.js";
import LICollider from "../../../../types/li/LICollider";
import useMapElementRef from "../../../../hooks/canvas/useMapElementRef";
import {RefObject} from "react";
import getOffsetFromElement from "../../../../utils/canvas/getOffsetFromElement";
import TickingGraphics from "../../common/TickingGraphics";
import {useAtomValue} from "jotai";
import {selectedColliderIDAtom} from "@editor/selection/stores/colliderSelectionStore";
import {useElement} from "@/hooks/elements/useElement";

export interface ColliderOverlayProps {
    elementID: GUID;
}

export function drawColliderStroke(
    g: Graphics,
    collider?: LICollider,
    mapElementRef?: RefObject<Container | null>,
    strokeWidth: number = 2,
    closePath: boolean = false) {

    // Check if the collider is defined
    if (!collider)
        return;

    // Check if the map element is defined
    if (!mapElementRef?.current)
        return;

    // Don't draw if there are no points in the collider
    if (collider.points.length <= 0)
        return;

    // Mark the start of the path
    g.beginPath();

    // Go to the first point in the collider
    const initialPoint = collider.points[0];
    const initialWorldPoint = getOffsetFromElement(mapElementRef.current, {
        x: initialPoint.x * -UNITY_SCALE,
        y: initialPoint.y * -UNITY_SCALE
    });

    g.moveTo(initialWorldPoint.x, initialWorldPoint.y);

    // Draw lines to each point in the collider
    collider.points.forEach(p => {
        const worldPoint = getOffsetFromElement(mapElementRef.current, {
            x: p.x * -UNITY_SCALE,
            y: p.y * -UNITY_SCALE
        });

        g.lineTo(worldPoint.x, worldPoint.y);
    });

    // Close the path if specified
    if (closePath)
        g.closePath();

    // Apply stroke style
    g.stroke({
        color: collider.blocksLight ? "#ff0000" : "#00ff00",
        width: strokeWidth,
        alignment: 0.5
    });
}

export function drawColliderFill(
    g: Graphics,
    collider?: LICollider) {
    // Check if the collider is defined
    if (!collider)
        return;

    // Don't fill if the collider is not solid
    if (!collider.isSolid)
        return;

    // Don't draw if there are no points in the collider
    if (collider.points.length <= 0)
        return;

    // Fill the collider with a semi-transparent color
    g.fill({
        color: collider.blocksLight ? "#ff0000" : "#00ff00",
        alpha: 0.25
    });
    g.closePath();
}

export default function ColliderOverlay(props: ColliderOverlayProps) {
    const element = useElement(props.elementID);
    const {colliderPreview} = useSettingsValue();
    const selectedColliderID = useAtomValue(selectedColliderIDAtom);
    const mapElementRef = useMapElementRef(props.elementID);

    if (!colliderPreview)
        return null;
    if (!element)
        return null;
    return element.properties.colliders?.map((collider) => (
        <TickingGraphics
            key={collider.id}
            draw={(g) => {

                // Don't draw if the collider is selected
                // See: ColliderEditorOverlay.tsx
                if (collider.id === selectedColliderID)
                    return;

                // Draw the collider edges
                drawColliderStroke(g, collider, mapElementRef);

                // Solid colliders are filled with a semi-transparent color
                if (collider.isSolid)
                    drawColliderFill(g, collider);
            }}
        />
    ));
}