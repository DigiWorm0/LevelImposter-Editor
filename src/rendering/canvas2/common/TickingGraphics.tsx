import React from "react";
import {Graphics, Ticker} from "pixi.js";
import {useTick} from "@pixi/react";

export interface TickingGraphicsProps {
    /**
     * Function to draw on the Graphics object.
     * Ran once per animation frame.
     * @param g The PIXI Graphics object to draw on.
     * @param ticker The PIXI Ticker object.
     */
    draw: (g: Graphics, ticker?: Ticker) => void;

    /**
     * Whether the graphics object is cullable (not rendered when outside the viewport).
     * @default false
     */
    cullable?: boolean;
}

/**
 * A PIXI Graphics component that updates its drawing on each animation frame.
 */
export default function TickingGraphics(props: TickingGraphicsProps) {
    const graphicsRef = React.useRef<Graphics>(new Graphics());

    // Update the graphics on each tick
    useTick((ticker) => {
        if (!graphicsRef.current)
            return;
        graphicsRef.current.clear();
        props.draw(graphicsRef.current, ticker);
    });

    return (
        <pixiGraphics
            ref={graphicsRef}
            draw={props.draw}
            eventMode={"none"}
            cullable={props.cullable}
        />
    );
}