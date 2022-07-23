import { Rect } from "react-konva";
import { useSetMouseCursor } from "../../hooks/jotai/useMouseCursor";
import { useSelectedColliderID } from "../../hooks/jotai/useSelectedCollider";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";

const UNITY_SCALE = 100;
const RECT_SIZE = 12;

export default function ColliderEditor() {
    const [elem, setElement] = useSelectedElem();
    const [colliderID] = useSelectedColliderID();
    const setMouseCursor = useSetMouseCursor();

    const collider = elem?.properties.colliders?.find(c => c.id === colliderID);
    if (!collider
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
                        p.x = (e.target.x() + RECT_SIZE / 2) / UNITY_SCALE;
                        p.y = (e.target.y() + RECT_SIZE / 2) / UNITY_SCALE;
                    }}
                    onDragEnd={() => {
                        setElement(elem);
                    }}
                    draggable
                />
            ))}
        </>
    );
}