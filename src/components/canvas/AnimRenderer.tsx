import React from "react";
import {useSettingsValue} from "../../hooks/useSettings";
import {useElementValue} from "../../hooks/elements/useElements";
import useSprite from "../../hooks/canvas/sprite/useSprite";
import GUID from "../../types/generic/GUID";
import useAnimTarget from "../../hooks/timeline/useAnimTarget";
import Konva from "konva";
import {Group, Image} from "react-konva";
import useAnimPropertyValue from "../../hooks/timeline/useAnimPropertyValue";
import {UNITY_SCALE} from "../../types/generic/Constants";

export interface AnimRendererProps {
    id: GUID;
}

export default function AnimRenderer(props: AnimRendererProps) {
    const {animPreview} = useSettingsValue();
    const [animTarget] = useAnimTarget(props.id);
    const animTargetElem = useElementValue(animTarget?.id);
    const sprite = useSprite(animTarget?.id);
    const imageRef = React.useRef<Konva.Group | null>(null);

    // Transform Values
    const [x] = useAnimPropertyValue({targetID: props.id, property: "x"});
    const [y] = useAnimPropertyValue({targetID: props.id, property: "y"});
    const [rotation] = useAnimPropertyValue({targetID: props.id, property: "rotation"});
    const [scaleX] = useAnimPropertyValue({targetID: props.id, property: "xScale"});
    const [scaleY] = useAnimPropertyValue({targetID: props.id, property: "yScale"});

    const w = (sprite?.width ?? 0) * (animTargetElem?.xScale ?? 1);
    const h = (sprite?.height ?? 0) * (animTargetElem?.yScale ?? 1);
    
    if (!animTarget || !sprite || !animPreview)
        return null;
    if (!animPreview)
        return null;
    return (
        <Group
            x={(x ?? 0) * UNITY_SCALE}
            y={-(y ?? 0) * UNITY_SCALE}
            rotation={rotation ?? 0}
            scaleX={scaleX ?? 1}
            scaleY={scaleY ?? 1}
            ref={imageRef}
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
        </Group>
    );
}