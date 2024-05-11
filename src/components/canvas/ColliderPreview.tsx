import { Shape } from "react-konva";
import { useSelectedElemValue } from "../../hooks/map/elements/useSelectedElem";
import { useSettingsValue } from "../../hooks/useSettings";
import useAdjustPoint from "../../hooks/canvas/useAdjustPoint";

export default function ColliderPreview() {
    const elem = useSelectedElemValue();
    const settings = useSettingsValue();
    const { relativeToAbsolute } = useAdjustPoint();

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
            })}
        </>
    );
}