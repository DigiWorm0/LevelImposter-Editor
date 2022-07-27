import { Line } from "react-konva";
import { useSelectedColliderIDValue } from "../../hooks/jotai/useSelectedCollider";
import { useSelectedElemValue } from "../../hooks/jotai/useSelectedElem";
import Point from "../../types/generic/Point";

const UNITY_SCALE = 100;

export default function ColliderRender() {
    const elem = useSelectedElemValue();
    const selectedColliderID = useSelectedColliderIDValue();

    if (!elem
        || !elem.properties.colliders)
        return null;

    return (
        <>
            {elem.properties.colliders.map((collider) => {
                const points = collider.points.reduce((prev: number[], cur: Point) => { prev.push(cur.x * UNITY_SCALE, cur.y * UNITY_SCALE); return prev; }, [] as number[]);
                return (
                    <Line
                        key={collider.id}
                        points={points}
                        fill={collider.isSolid ? (collider.blocksLight ? "#ff000022" : "#00ff0022") : "transparent"}
                        stroke={collider.blocksLight ? "red" : "green"}
                        strokeWidth={selectedColliderID === undefined ? 2 : 1}
                        closed={collider.isSolid}
                        listening={false}
                    />
                )
            })}
        </>
    );
}