import { Line } from "react-konva";
import { useSelectedColliderValue } from "../../hooks/jotai/useSelectedCollider";
import Point from "../../types/generic/Point";

const UNITY_SCALE = 100;

export default function ColliderRender() {
    const collider = useSelectedColliderValue();

    if (!collider
        || collider.points.length <= 0)
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