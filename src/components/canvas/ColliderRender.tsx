import { Line, Shape } from "react-konva";
import useColliderEditing from "../../hooks/useColliderEditing";
import useElement from "../../hooks/useElement";
import GUID from "../../types/generic/GUID";
import Point from "../../types/generic/Point";

const UNITY_SCALE = 100;

export default function ColliderRender(props: { elementID: GUID }) {
    const [elem] = useElement(props.elementID);
    const [colliderID] = useColliderEditing();

    const collider = elem.properties.colliders?.find(c => c.id === colliderID);
    if (!collider || collider.points.length <= 0)
        return null;
    const points = collider.points.reduce((prev: number[], cur: Point) => { prev.push(cur.x * UNITY_SCALE, cur.y * UNITY_SCALE); return prev; }, [] as number[]);

    return (
        <>
            <Line
                points={points}
                fill={collider.isSolid ? (collider.blocksLight ? "#ff000066" : "#00ff0044") : "transparent"}
                stroke={collider.blocksLight ? "red" : "green"}
                strokeWidth={4}
                closed={collider.isSolid}
                onClick={() => {
                    console.log("B");
                }}
            />
        </>
    );
}