import { Rect, Shape } from "react-konva";
import { useSetMouseCursor } from "../../hooks/jotai/useMouse";
import useSelectedCollider, { useInsertPointAtMouse } from "../../hooks/jotai/useSelectedCollider";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";
import { useSettingsValue } from "../../hooks/jotai/useSettings";
import { COLLIDER_RECT_SIZE, DEFAULT_GRID_SNAP_RESOLUTION, MAX_DECIMAL_PLACES, UNITY_SCALE } from "../../types/generic/Constants";


export default function ColliderEditor() {
    const elem = useSelectedElemValue();
    const [collider, setCollider] = useSelectedCollider();
    const setMouseCursor = useSetMouseCursor();
    const insertPointAtMouse = useInsertPointAtMouse();
    const settings = useSettingsValue();

    if (!collider
        || collider.points.length <= 0)
        return null;

    const gridSnapResolution = settings.gridSnapResolution === undefined ? DEFAULT_GRID_SNAP_RESOLUTION : settings.gridSnapResolution;
    const snapOffset = (px: number, py: number) => {
        if (!elem)
            return { x: px, y: py };

        const pointX = (px + COLLIDER_RECT_SIZE / 2) / UNITY_SCALE;
        const pointY = (py + COLLIDER_RECT_SIZE / 2) / UNITY_SCALE;
        const snappedX = Math.round((elem.x + pointX) / gridSnapResolution) * gridSnapResolution;
        const snappedY = Math.round((elem.y - pointY) / gridSnapResolution) * gridSnapResolution;

        return {
            x: (snappedX - elem.x) * UNITY_SCALE - COLLIDER_RECT_SIZE / 2,
            y: (elem.y - snappedY) * UNITY_SCALE - COLLIDER_RECT_SIZE / 2
        }
    }

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
                        if (settings.isGridSnapEnabled != false) {
                            e.target.position(snapOffset(e.target.x(), e.target.y()));
                        }
                        p.x = +((e.target.x() + COLLIDER_RECT_SIZE / 2) / UNITY_SCALE).toFixed(MAX_DECIMAL_PLACES);
                        p.y = +((e.target.y() + COLLIDER_RECT_SIZE / 2) / UNITY_SCALE).toFixed(MAX_DECIMAL_PLACES);
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