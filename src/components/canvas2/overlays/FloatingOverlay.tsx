import React from "react";
import GUID from "../../../types/common/GUID";
import {useElementValue} from "../../../hooks/elements/useElements";
import {DEFAULT_FLOATING_HEIGHT, DEFAULT_FLOATING_SPEED, UNITY_SCALE} from "../../../types/amongus/Constants";
import useElementSprite from "../../../hooks/canvas/sprite/useElementSprite";
import {useTick} from "@pixi/react";
import {Sprite} from "pixi.js";

export interface FloatingOverlayProps {
    elementID: GUID;
}

export default function FloatingOverlay(props: FloatingOverlayProps) {
    const element = useElementValue(props.elementID);
    const sprite = useElementSprite(props.elementID);
    const spriteRef = React.useRef<Sprite>(null);

    const height = element?.properties.floatingHeight ?? DEFAULT_FLOATING_HEIGHT;
    const speed = element?.properties.floatingSpeed ?? DEFAULT_FLOATING_SPEED;

    useTick(() => {
        if (!spriteRef.current)
            return;

        // Calculate the new position based on the sine wave
        const t = new Date().getTime() / 1000;
        const y = -(Math.sin(t * speed) + 1) * height / 2;

        // Update the sprite position
        spriteRef.current.y = y * UNITY_SCALE;
    });

    if (!sprite || sprite.destroyed)
        return null;
    if (!element || element.type !== "util-blankfloat")
        return null;
    return (
        <>
            <pixiSprite
                ref={spriteRef}
                texture={sprite}
                eventMode={"none"}
                x={0}
                y={0}
                anchor={0.5}
            />
            <pixiGraphics
                eventMode={"none"}
                draw={(g) => {
                    g.clear();

                    g.beginPath();
                    g.moveTo(0, 0)
                        .lineTo(0, -height * UNITY_SCALE)
                        .stroke({color: 0xffaa00, width: 4, alignment: 0.5});
                    g.closePath();
                    g.stroke();
                }}
            />
        </>
    );
}