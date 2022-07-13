import { Shape } from "react-konva";
import useElement, { getElement } from "../../hooks/useElement";
import GUID from "../../types/generic/GUID";

const UNITY_SCALE = 100;

export default function VentConnections(props: { elementID: GUID }) {
    const [elem] = useElement(props.elementID);

    return (
        <Shape
            sceneFunc={(ctx, shape) => {
                const drawToVent = (targetID: GUID | undefined) => {
                    if (!targetID)
                        return;
                    const target = getElement(targetID);
                    ctx.moveTo(elem.x * UNITY_SCALE, -elem.y * UNITY_SCALE);
                    ctx.lineTo(target.x * UNITY_SCALE, -target.y * UNITY_SCALE);
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