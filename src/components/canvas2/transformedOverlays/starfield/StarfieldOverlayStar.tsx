import React, {useRef} from "react";
import {useElementValue} from "../../../../hooks/elements/useElements";
import useElementSprite from "../../../../hooks/sprites/useElementSprite";
import {Sprite} from "pixi.js";
import {
    DEFAULT_STARFIELD_HEIGHT,
    DEFAULT_STARFIELD_LENGTH,
    DEFAULT_STARFIELD_MAXSPEED,
    DEFAULT_STARFIELD_MINSPEED,
    UNITY_SCALE
} from "../../../../types/amongus/Constants";
import {useTick} from "@pixi/react";
import {StarfieldOverlayProps} from "./StarfieldOverlay";

export default function StarfieldOverlayStar(props: StarfieldOverlayProps) {
    const element = useElementValue(props.elementID);
    const sprite = useElementSprite(props.elementID);
    const spriteRef = useRef<Sprite>(null);

    // Get Properties
    const height = element?.properties.starfieldHeight ?? DEFAULT_STARFIELD_HEIGHT;
    const length = element?.properties.starfieldLength ?? DEFAULT_STARFIELD_LENGTH;
    const minSpeed = element?.properties.starfieldMinSpeed ?? DEFAULT_STARFIELD_MINSPEED;
    const maxSpeed = element?.properties.starfieldMaxSpeed ?? DEFAULT_STARFIELD_MAXSPEED;

    // Save speed/position between re-renders
    const starState = React.useRef({
        x: Math.random() * length,
        y: Math.random() * height - height / 2,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed
    });
    let {x, y, speed} = starState.current;

    // Update position on each tick
    useTick(({deltaTime}) => {
        if (!spriteRef.current)
            return;

        // Update the star's position
        x += speed * deltaTime * 0.01;

        // If the star goes beyond the length, reset its position and speed
        if (x > length) {
            x = 0;
            y = Math.random() * height - height / 2;
            speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
        }

        // Save to the ref for the next tick
        starState.current = {x, y, speed};

        // Update the sprite position
        spriteRef.current.x = -x * UNITY_SCALE;
        spriteRef.current.y = y * UNITY_SCALE;
    });


    if (!sprite || sprite.destroyed)
        return null;
    return (
        <pixiSprite
            ref={spriteRef}
            texture={sprite}
            eventMode={"none"}
            anchor={0.5}
            x={x * UNITY_SCALE}
            y={y * UNITY_SCALE}
        />
    );
}