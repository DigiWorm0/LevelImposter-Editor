import React from "react";
import useViewportPosition from "../../hooks/canvas/useViewportPosition";
import {deselectAll} from "../../editor/selection/deselectAll";

export default function DeselectBackground() {
    const viewport = useViewportPosition();

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
            onClick={() => deselectAll()}
        />
    );
}