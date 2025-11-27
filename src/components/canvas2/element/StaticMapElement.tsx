import {MaybeGUID} from "../../../types/common/GUID";
import useElementSprite from "../../../hooks/canvas/sprite/useElementSprite";
import {useElementValue} from "../../../hooks/elements/useElements";
import React from "react";
import {useElementChildIDs} from "../../../hooks/elements/useElementChildIDs";
import {UNITY_SCALE} from "../../../types/amongus/Constants";
import getGlobalZFromLocalZ from "../../../utils/canvas/getGlobalZFromLocalZ";
import degToRad from "../../../utils/common/degToRad";
import {Container} from "pixi.js";

export interface StaticMapElementProps {
    containerRef?: React.RefObject<Container | null>;
    elementID: MaybeGUID;
}

export default function StaticMapElement(props: StaticMapElementProps) {
    const sprite = useElementSprite(props.elementID);
    const element = useElementValue(props.elementID);
    const childElementIDs = useElementChildIDs(props.elementID);

    if (!sprite || sprite.destroyed)
        return null;
    if (!element || !props.elementID)
        return null;

    return (
        <pixiContainer
            ref={props.containerRef}
            x={element.x * UNITY_SCALE}
            y={-element.y * UNITY_SCALE}
            zIndex={-getGlobalZFromLocalZ(element.z, element.y)}
            scale={{
                x: element.xScale,
                y: element.yScale
            }}
            rotation={-degToRad(element.rotation)}
        >
            <pixiSprite
                anchor={0.5}
                x={0}
                y={0}
                texture={sprite}
                eventMode={"none"}
            />

            {childElementIDs.map(childID => (
                <StaticMapElement
                    key={childID}
                    elementID={childID}
                />
            ))}
        </pixiContainer>
    );
}