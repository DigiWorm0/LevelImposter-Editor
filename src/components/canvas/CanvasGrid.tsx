import { Group, Line, Shape } from "react-konva";
import { useSettingsValue } from "../../hooks/useSettings";
import React from "react";
import Konva from "konva";

export default function CanvasGrid() {
    const { isGridVisible, gridSize, gridSpacing } = useSettingsValue();
    const groupRef = React.useRef<Konva.Group>(null);


    if (!isGridVisible)
        return null;
    return (
        <Group listening={false} ref={groupRef}>
            <Shape
                sceneFunc={(ctx, shape) => {
                    ctx.beginPath();
                    for (let x = -(gridSize * gridSpacing); x < (gridSize * gridSpacing); x += gridSpacing) {
                        ctx.moveTo(x, -(gridSize * gridSpacing));
                        ctx.lineTo(x, (gridSize * gridSpacing));
                    }
                    for (let y = -(gridSize * gridSpacing); y < (gridSize * gridSpacing); y += gridSpacing) {
                        ctx.moveTo(-(gridSize * gridSpacing), y);
                        ctx.lineTo((gridSize * gridSpacing), y);
                    }
                    ctx.fillStrokeShape(shape);
                }}
                stroke="#5F6B7C"
                strokeWidth={1}
            />
            <Line
                points={[0, -gridSize * gridSpacing, 0, (gridSize * gridSpacing)]}
                stroke="#B83211"
                strokeWidth={2}
            />
            <Line
                points={[-(gridSize * gridSpacing), 0, (gridSize * gridSpacing), 0]}
                stroke="#215DB0"
                strokeWidth={2}
            />
        </Group>

    );
}