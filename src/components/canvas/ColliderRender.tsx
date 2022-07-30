import { Shape } from "react-konva";
import { useSelectedColliderIDValue } from "../../hooks/jotai/useSelectedCollider";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";
import { UNITY_SCALE } from "../../types/generic/Constants";

export default function ColliderRender() {
    const elem = useSelectedElemValue();
    const selectedColliderID = useSelectedColliderIDValue();

    if (!elem
        || !elem.properties.colliders)
        return null;

    return (
        <>
            {elem.properties.colliders.map((collider) => {
                return (
                    <Shape
                        key={collider.id}
                        sceneFunc={(ctx, shape) => {
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