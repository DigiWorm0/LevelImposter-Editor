import { Point } from "electron";
import { Line, Rect } from "react-konva";
import { useSetMouseCursor } from "../../hooks/input/useMouseCursor";
import { useSelectedColliderIDValue } from "../../hooks/jotai/useSelectedCollider";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import { useSettingsValue } from "../../hooks/jotai/useSettings";

const UNITY_SCALE = 100;
const RECT_SIZE = 12;

export default function ColliderEditor() {
    const [elem, setElement] = useSelectedElem();
    const colliderID = useSelectedColliderIDValue();
    const setMouseCursor = useSetMouseCursor();
    const settings = useSettingsValue();

    const collider = elem?.properties.colliders?.find(c => c.id === colliderID);
    const points = collider?.points.reduce((prev: number[], cur: Point) => { prev.push(cur.x * UNITY_SCALE, cur.y * UNITY_SCALE); return prev; }, [] as number[]);
    const updateColliders = () => {
        if (elem?.properties.colliders)
            setElement({ ...elem, properties: { ...elem.properties, colliders: [...elem.properties.colliders] } });
    }

    if (!collider
        || !elem
        || collider.points.length <= 0)
        return null;

    return (
        <>
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
                        updateColliders();
                    }}
                    draggable
                />
            ))}

            <Line
                points={points}
                fill={collider.isSolid ? (collider.blocksLight ? "#ff000066" : "#00ff0044") : "transparent"}
                stroke={collider.blocksLight ? "red" : "green"}
                strokeWidth={6}
                closed={collider.isSolid}
                onClick={() => {
                    console.log("B");
                }}
                listening={false}
            />
        </>
    );
}