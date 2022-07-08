import React from "react";
import { Shape } from "react-konva";
import useColliderEditing from "../../hooks/useColliderEditing";
import useElement, { getElement } from "../../hooks/useElement";
import GUID from "../../types/generic/GUID";

const UNITY_SCALE = 100;

export default function ColliderRender(props: { elementID: GUID }) {
    const [elem] = useElement(props.elementID);
    const [colliderID] = useColliderEditing();

    const collider = elem.properties.colliders?.find(c => c.id === colliderID);

    if (!collider || collider.points.length <= 0)
        return null;

    return (
        <Shape
            sceneFunc={(ctx, shape) => {
                ctx.beginPath();
                ctx.moveTo(collider.points[0].x * UNITY_SCALE, collider.points[0].y * UNITY_SCALE);
                for (let i = 1; i < collider.points.length; i++) {
                    ctx.lineTo(collider.points[i].x * UNITY_SCALE, collider.points[i].y * UNITY_SCALE);
                }
                if (collider.isSolid)
                    ctx.closePath();
                ctx.fillStrokeShape(shape);
            }}
            fill={collider.isSolid ? "#ff000066" : "transparent"}
            stroke="red"
            strokeWidth={10}
        />
    );
}