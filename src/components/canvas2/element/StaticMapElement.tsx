import {MaybeGUID} from "@/shared/types/GUID";
import useElementSprite from "../../../hooks/sprites/useElementSprite";
import React from "react";
import {useElementChildIDs} from "@/hooks/elements/useElementChildIDs";
import {UNITY_SCALE} from "@/types/amongus/Constants";
import getGlobalZFromLocalZ from "../../../utils/canvas/getGlobalZFromLocalZ";
import degToRad from "@shared/math/degToRad";
import {Container} from "pixi.js";
import {useElement} from "@/hooks/elements/useElement";

export interface StaticMapElementProps {
    containerRef?: React.RefObject<Container | null>;
    elementID: MaybeGUID;
    disableTransformation?: boolean;
}

export default function StaticMapElement(props: StaticMapElementProps) {
    const sprite = useElementSprite(props.elementID);
    const element = useElement(props.elementID);
    const childElementIDs = useElementChildIDs(props.elementID);

    if (!sprite || sprite.destroyed)
        return null;
    if (!element || !props.elementID)
        return null;

    return (
        <pixiContainer
            ref={props.containerRef}
            x={props.disableTransformation ? 0 : element.x * UNITY_SCALE}
            y={props.disableTransformation ? 0 : -element.y * UNITY_SCALE}
            zIndex={props.disableTransformation ? 0 : -getGlobalZFromLocalZ(element.z, element.y)}
            scale={{
                x: props.disableTransformation ? 1 : element.xScale,
                y: props.disableTransformation ? 1 : element.yScale
            }}
            rotation={props.disableTransformation ? 0 : -degToRad(element.rotation)}
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