import React from "react";
import useDeselectAll from "../../hooks/map/useDeselectAll";
import useViewportPosition from "../../hooks/canvas/useViewportPosition";

export default function DeselectBackground() {
    const viewport = useViewportPosition();
    const deselectAll = useDeselectAll();

    return (

        <pixiGraphics
            interactive={true}
            x={viewport.left}
            y={viewport.top}
            draw={(g) => {
                g.clear();
                g.rect(0, 0, viewport.width, viewport.height)
                    .fill({color: 0x000000, alpha: 0});
            }}
            onClick={() => {
                deselectAll();
            }}
        />
    )
}