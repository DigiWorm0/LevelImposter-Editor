import { Rect, Shape } from "react-konva";
import { useSetMouseCursor } from "../../hooks/input/useMouseCursor";
import useSelectedCollider, { useInsertPointAtMouse } from "../../hooks/jotai/useSelectedCollider";
import { useSettingsValue } from "../../hooks/jotai/useSettings";
import { COLLIDER_RECT_SIZE, UNITY_SCALE } from "../../types/generic/Constants";


export default function ColliderEditor() {
    const [collider, setCollider] = useSelectedCollider();
    const setMouseCursor = useSetMouseCursor();
    const insertPointAtMouse = useInsertPointAtMouse();
    const settings = useSettingsValue();


    if (!collider
        || collider.points.length <= 0)
        return null;

    return (
        <>
            {collider.points.map((p, index) => {
                let pointIndex = (index + 1) % collider.points.length;
                if (pointIndex == 0 && !collider.isSolid)
                    pointIndex = index;
                const p2 = collider.points[pointIndex];

                return (
                    <Shape
                        key={collider.id + "-" + index}
                        sceneFunc={(ctx, shape) => {
                            ctx.beginPath();
                            ctx.moveTo(p.x * UNITY_SCALE, p.y * UNITY_SCALE);
                            ctx.lineTo(p2.x * UNITY_SCALE, p2.y * UNITY_SCALE);
                            ctx.fillStrokeShape(shape);
                        }}
                        onMouseEnter={() => setMouseCursor("pointer")}
                        onMouseLeave={() => setMouseCursor("default")}
                        stroke={collider.blocksLight ? "red" : "green"}
                        strokeWidth={5}
                        onMouseDown={() => {
                            insertPointAtMouse(index + 1);
                        }}
                    />
                )
            })}

            {collider.points.map((p, index) => (
                <Rect
                    key={collider.id + "-" + index}
                    x={p.x * UNITY_SCALE - COLLIDER_RECT_SIZE / 2}
                    y={p.y * UNITY_SCALE - COLLIDER_RECT_SIZE / 2}
                    width={COLLIDER_RECT_SIZE}
                    height={COLLIDER_RECT_SIZE}
                    strokeWidth={1}
                    fill={"blue"}
                    stroke={"white"}
                    onMouseDown={(e) => {
                        if (e.evt.button === 2) {
                            collider.points.splice(index, 1);
                            setCollider({ ...collider });
                        }
                    }}
                    onMouseEnter={(e) => {
                        setMouseCursor("pointer");
                    }}
                    onMouseLeave={(e) => {
                        setMouseCursor("default");
                    }}
                    onDragMove={(e) => {
                        if (settings.isGridSnapEnabled) {
                            e.target.position({
                                x: Math.round(e.target.x() / UNITY_SCALE / settings.gridSnapResolution) * UNITY_SCALE * settings.gridSnapResolution,
                                y: Math.round(e.target.y() / UNITY_SCALE / settings.gridSnapResolution) * UNITY_SCALE * settings.gridSnapResolution
                            })
                        }
                        p.x = (e.target.x() + COLLIDER_RECT_SIZE / 2) / UNITY_SCALE;
                        p.y = (e.target.y() + COLLIDER_RECT_SIZE / 2) / UNITY_SCALE;
                    }}
                    onDragEnd={() => {
                        setCollider({ ...collider, points: collider.points.map((p) => ({ ...p })) });
                    }}
                    draggable
                />
            ))}
        </>
    );
}