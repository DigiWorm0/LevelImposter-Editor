import { Shape } from "react-konva";
import { useSettingsValue } from "../../hooks/useSettings";
import useAdjustPoint from "../../hooks/canvas/useAdjustPoint";
import { useSelectedElemPropValue } from "../../hooks/map/elements/useSelectedElemProperty";
import LICollider from "../../types/li/LICollider";

export default function ColliderPreview() {
    const colliders = useSelectedElemPropValue<LICollider[]>("colliders");
    const { colliderPreview } = useSettingsValue();
    const { relativeToAbsolute } = useAdjustPoint();

    if (!colliderPreview)
        return null;
    if (!colliders)
        return null;

    return colliders.map((collider) => {
        return (
            <Shape
                key={collider.id}
                sceneFunc={(ctx, shape) => {
                    if (collider.points.length <= 0)
                        return;

                    ctx.beginPath();

                    const initialPoint = relativeToAbsolute(collider.points[0]);
                    ctx.moveTo(initialPoint.x, initialPoint.y);
                    collider.points.forEach((p, _) => {
                        const point = relativeToAbsolute(p);
                        ctx.lineTo(point.x, point.y);
                    })

                    if (collider.isSolid)
                        ctx.closePath();
                    ctx.fillStrokeShape(shape);
                }}
                fill={collider.isSolid ? (collider.blocksLight ? "#ff000022" : "#00ff0022") : "transparent"}
                stroke={collider.blocksLight ? "red" : "green"}
                strokeWidth={1}
                listening={false}
            />
        )
    });
}