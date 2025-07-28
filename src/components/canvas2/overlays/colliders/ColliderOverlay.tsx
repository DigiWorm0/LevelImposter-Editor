import GUID from "../../../../types/common/GUID";
import {useElementValue} from "../../../../hooks/elements/useElements";
import {useSettingsValue} from "../../../../hooks/useSettings";
import {UNITY_SCALE} from "../../../../types/amongus/Constants";
import {useSelectedColliderID} from "../../../../hooks/elements/colliders/useSelectedCollider";
import {Graphics} from "pixi.js";
import LICollider from "../../../../types/li/LICollider";

export interface ColliderOverlayProps {
    elementID: GUID;
}

export function drawColliderStroke(
    g: Graphics,
    collider?: LICollider,
    strokeWidth: number = 2) {

    // Check if the collider is defined
    if (!collider)
        return;

    // Don't draw if there are no points in the collider
    if (collider.points.length <= 0)
        return;

    // Mark the start of the path
    g.beginPath();

    // Go to the first point in the collider
    const initialPoint = collider.points[0];
    g.moveTo(initialPoint.x * UNITY_SCALE, initialPoint.y * UNITY_SCALE);

    // Draw lines to each point in the collider
    collider.points.forEach(p => g.lineTo(p.x * UNITY_SCALE, p.y * UNITY_SCALE));

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
    const element = useElementValue(props.elementID);
    const {colliderPreview} = useSettingsValue();
    const [selectedColliderID] = useSelectedColliderID();

    if (!colliderPreview)
        return null;
    if (!element)
        return null;
    return element.properties.colliders?.map((collider) => (
        <pixiGraphics
            key={collider.id}
            eventMode={"none"}
            draw={(g) => {

                // Reset the graphics context
                g.clear();

                // Don't draw if the collider is selected
                // See: ColliderEditorOverlay.tsx
                if (collider.id === selectedColliderID)
                    return;

                // Draw the collider edges
                drawColliderStroke(g, collider);

                // Solid colliders are filled with a semi-transparent color
                if (collider.isSolid)
                    drawColliderFill(g, collider);
            }}
        />
    ));
}