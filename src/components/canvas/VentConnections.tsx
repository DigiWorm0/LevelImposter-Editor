import { Shape } from "react-konva";
import useElement from "../../hooks/useElement";
import GUID from "../../types/generic/GUID";
import LIElement from "../../types/li/LIElement";

const UNITY_SCALE = 100;

export default function VentConnections(props: { elementID: GUID }) {
    const [elem] = useElement(props.elementID);
    const [leftVent] = useElement(elem.properties.leftVent);
    const [middleVent] = useElement(elem.properties.middleVent);
    const [rightVent] = useElement(elem.properties.rightVent);

    return (
        <Shape
            sceneFunc={(ctx, shape) => {
                const drawToVent = (target: LIElement) => {
                    ctx.moveTo(elem.x * UNITY_SCALE, -elem.y * UNITY_SCALE);
                    ctx.lineTo(target.x * UNITY_SCALE, -target.y * UNITY_SCALE);
                }

                ctx.beginPath();
                elem.properties.leftVent && drawToVent(leftVent);
                elem.properties.middleVent && drawToVent(middleVent);
                elem.properties.rightVent && drawToVent(rightVent);
                ctx.closePath();
                ctx.fillStrokeShape(shape);

            }}
            stroke="green"
            strokeWidth={1}
        />
    );
}