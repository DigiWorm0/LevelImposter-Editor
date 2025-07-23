import GUID from "../../../../types/common/GUID";
import {useElementValue} from "../../../../hooks/elements/useElements";
import {useSettingsValue} from "../../../../hooks/useSettings";
import {UNITY_SCALE} from "../../../../types/amongus/Constants";

export interface ColliderOverlayProps {
    elementID: GUID;
}

export default function ColliderOverlay(props: ColliderOverlayProps) {
    const element = useElementValue(props.elementID);
    const {colliderPreview} = useSettingsValue();

    if (!colliderPreview)
        return null;
    if (!element)
        return null;
    return element.properties.colliders?.map((collider) => (
        <pixiGraphics
            key={collider.id}
            eventMode={"none"}
            draw={(g) => {
                // Don't draw if there are no points in the collider
                if (collider.points.length <= 0)
                    return;

                // Reset the graphics context
                g.clear();
                g.beginPath();

                // Draw the collider shape
                const initialPoint = collider.points[0];
                g.moveTo(initialPoint.x * UNITY_SCALE, initialPoint.y * UNITY_SCALE);
                collider.points.forEach(p => g.lineTo(p.x * UNITY_SCALE, p.y * UNITY_SCALE));

                // Color line along the collider
                const color = collider.blocksLight ? "#ff0000" : "#00ff00";
                g.stroke({color, width: 2, alignment: 0.5});

                // Solid colliders are filled with a semi-transparent color
                if (collider.isSolid) {
                    g.fill({color, alpha: 0.25});
                    g.closePath();
                }
            }}
        />
    ));
}