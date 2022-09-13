import { Shape } from "react-konva";
import { useSelectedColliderIDValue } from "../../hooks/jotai/useSelectedCollider";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";
import { useSettingsValue } from "../../hooks/jotai/useSettings";
import { UNITY_SCALE } from "../../types/generic/Constants";

export default function ColliderPreview() {
    const elem = useSelectedElemValue();
    const selectedColliderID = useSelectedColliderIDValue();
    const settings = useSettingsValue();

    if (!elem
        || !elem.properties.colliders
        || settings.colliderPreview === false)
        return null;

    return (
        <>
            {elem.properties.colliders.map((collider) => {
                return (
                    <Shape
                        key={collider.id}
                        sceneFunc={(ctx, shape) => {
                            if (collider.points.length <= 0)
                                return;

                            ctx.beginPath();

                            const initialPoint = collider.points[0];
                            ctx.moveTo(initialPoint.x * UNITY_SCALE, initialPoint.y * UNITY_SCALE);
                            collider.points.forEach((p, _) => {
                                ctx.lineTo(p.x * UNITY_SCALE, p.y * UNITY_SCALE);
                            })

                            if (collider.isSolid)
                                ctx.closePath();
                            ctx.fillStrokeShape(shape);
                        }}
                        fill={collider.isSolid ? (collider.blocksLight ? "#ff000022" : "#00ff0022") : "transparent"}
                        stroke={collider.blocksLight ? "red" : "green"}
                        strokeWidth={selectedColliderID === undefined ? 2 : 1}
                        listening={false}
                    />
                )
            })}
        </>
    );
}