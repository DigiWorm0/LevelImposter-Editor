import { Rect } from "react-konva";
import useColliderEditing from "../../hooks/useColliderEditing";
import useElement from "../../hooks/useElement";
import GUID from "../../types/generic/GUID";

const UNITY_SCALE = 100;
const RECT_SIZE = 12;

export default function ColliderEditor(props: { elementID: GUID }) {
    const [elem, setElement] = useElement(props.elementID);
    const [colliderID] = useColliderEditing();

    const collider = elem.properties.colliders?.find(c => c.id === colliderID);
    if (!collider || collider.points.length <= 0)
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