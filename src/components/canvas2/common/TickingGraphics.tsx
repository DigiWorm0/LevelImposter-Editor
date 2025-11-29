import React from "react";
import {Graphics} from "pixi.js";
import {useTick} from "@pixi/react";

export interface TickingGraphicsProps {
    /**
     * Function to draw on the Graphics object.
     * Ran once per animation frame.
     * @param g The PIXI Graphics object to draw on.
     */
    draw: (g: Graphics) => void;
}

/**
 * A PIXI Graphics component that updates its drawing on each animation frame.
 */
export default function TickingGraphics(props: TickingGraphicsProps) {
    const graphicsRef = React.useRef<Graphics>(new Graphics());

    // Update the graphics on each tick
    useTick(() => {
        if (!graphicsRef.current)
            return;
        graphicsRef.current.clear();
        props.draw(graphicsRef.current);
    });

    return (
        <pixiGraphics
            ref={graphicsRef}
            draw={props.draw}
            eventMode={"none"}
        />
    );
}