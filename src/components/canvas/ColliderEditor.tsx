import { Line, Rect } from "react-konva";
import { useSetMouseCursor } from "../../hooks/input/useMouseCursor";
import useSelectedCollider, { useInsertPointAtMouse } from "../../hooks/jotai/useSelectedCollider";
import { useSettingsValue } from "../../hooks/jotai/useSettings";

const UNITY_SCALE = 100;
const RECT_SIZE = 12;

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
                const p2 = collider.points[(index + 1) % collider.points.length];

                return (
                    <Line
                        key={collider.id + "-" + index}
                        points={[p.x * UNITY_SCALE, p.y * UNITY_SCALE, p2.x * UNITY_SCALE, p2.y * UNITY_SCALE]}
                        stroke={collider.blocksLight ? "red" : "green"}
                        strokeWidth={6}
                        closed={collider.isSolid}
                        onMouseDown={() => {
                            insertPointAtMouse(index + 1);
                        }}
                    />
                )
            })}

            {collider.points.map((p, index) => (
                <Rect
                    key={index}
                    x={p.x * UNITY_SCALE - RECT_SIZE / 2}
                    y={p.y * UNITY_SCALE - RECT_SIZE / 2}
                    width={RECT_SIZE}
                    height={RECT_SIZE}
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
                        p.x = (e.target.x() + RECT_SIZE / 2) / UNITY_SCALE;
                        p.y = (e.target.y() + RECT_SIZE / 2) / UNITY_SCALE;
                    }}
                    onDragEnd={() => {
                        setCollider({ ...collider });
                    }}
                    draggable
                />
            ))}
        </>
    );
}