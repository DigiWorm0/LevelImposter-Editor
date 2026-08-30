import React from "react";
import GUID from "@shared/types/GUID";
import {DEFAULT_FLOATING_HEIGHT, DEFAULT_FLOATING_SPEED, UNITY_SCALE} from "@/types/amongus/Constants";
import useMapElementRef from "../../../hooks/canvas/useMapElementRef";
import StaticMapElement from "../element/StaticMapElement";
import {Container} from "pixi.js";
import {useTick} from "@pixi/react";
import {useElement} from "@/hooks/elements/useElement";

export interface FloatingOverlayProps {
    elementID: GUID;
}

export default function FloatingOverlay(props: FloatingOverlayProps) {
    const element = useElement(props.elementID);
    const containerRef = React.useRef<Container>(null);
    const mapElementRef = useMapElementRef(props.elementID);

    const height = element?.properties.floatingHeight ?? DEFAULT_FLOATING_HEIGHT;
    const speed = element?.properties.floatingSpeed ?? DEFAULT_FLOATING_SPEED;

    useTick(() => {
        if (!containerRef.current ||
            !mapElementRef.current)
            return;

        // Calculate the new position based on the sine wave
        const t = new Date().getTime() / 1000;
        const y = -(Math.sin(t * speed) + 1) * height / 2;

        // Get the element rotation

        // Update the sprite position
        containerRef.current.y = y * UNITY_SCALE;
    });

    if (!element || element.type !== "util-blankfloat")
        return null;
    return (
        <StaticMapElement
            containerRef={containerRef}
            elementID={props.elementID}
            disableTransformation
        />
    );
}