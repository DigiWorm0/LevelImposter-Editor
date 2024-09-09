import React from "react";
import {useElementValue} from "../../hooks/elements/useElements";
import useSprite from "../../hooks/canvas/sprite/useSprite";
import GUID from "../../types/generic/GUID";
import {Group, Image} from "react-konva";
import {UNITY_SCALE} from "../../types/generic/Constants";
import {useElementChildIDs} from "../../hooks/elements/useElementChildIDs";

export interface AnimRendererProps {
    elementID: GUID;
}

export default function AnimChildRenderer(props: AnimRendererProps) {
    const element = useElementValue(props.elementID);
    const sprite = useSprite(props.elementID);
    const childIDs = useElementChildIDs(props.elementID);

    if (!element || !sprite)
        return null;

    const {x, y, rotation, xScale, yScale} = element;

    const w = (sprite?.width ?? 0) * xScale;
    const h = (sprite?.height ?? 0) * yScale;

    return (
        <Group
            x={(x ?? 0) * UNITY_SCALE}
            y={-(y ?? 0) * UNITY_SCALE}
            rotation={rotation ?? 0}
            scaleX={xScale}
            scaleY={yScale}
            listening={false}
        >
            <Image
                image={sprite}
                x={-w / 2}
                y={-h / 2}
                width={w}
                height={h}

                listening={false}
            />

            {childIDs.map((id) => (
                <AnimChildRenderer elementID={id} key={id}/>
            ))}
        </Group>
    );
}