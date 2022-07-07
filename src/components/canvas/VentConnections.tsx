import React from "react";
import { Group, Image, Rect, Shape } from "react-konva";
import useColliderEditing from "../../hooks/useColliderEditing";
import useElement, { getElement } from "../../hooks/useElement";
import useSelected from "../../hooks/useSelected";
import GUID from "../../types/generic/GUID";

const UNITY_SCALE = 100;

export default function VentConnections(props: { elementID: GUID }) {
    const [elem] = useElement(props.elementID);
    const [selectedID] = useSelected();

    const isSelected = selectedID === props.elementID;

    if (!elem.type.startsWith("util-vent") || !isSelected)
        return null;

    return (
        <Shape
            sceneFunc={(ctx, shape) => {
                const drawToVent = (vent: GUID | undefined) => {
                    if (vent) {
                        const ventElem = getElement(vent);
                        ctx.moveTo(0, 0);
                        ctx.lineTo(UNITY_SCALE * (ventElem?.x - elem.x), UNITY_SCALE * (ventElem?.y - elem.y));
                    }
                }

                ctx.beginPath();
                drawToVent(elem.properties.leftVent);
                drawToVent(elem.properties.middleVent);
                drawToVent(elem.properties.rightVent);
                ctx.closePath();
                ctx.fillStrokeShape(shape);

            }}
            stroke="green"
            strokeWidth={1}
        />
    );
}