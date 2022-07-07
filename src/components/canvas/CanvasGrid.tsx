import { Group, Line, Shape } from "react-konva";
import React from "react";

const GRID_SPACING = 100;
const GRID_SIZE = 20;

export default function CanvasGrid() {
    return (
        <Group>
            <Shape
                sceneFunc={(ctx, shape) => {
                    ctx.beginPath();
                    for (let x = -(GRID_SIZE * GRID_SPACING); x < (GRID_SIZE * GRID_SPACING); x += GRID_SPACING) {
                        ctx.moveTo(x, -(GRID_SIZE * GRID_SPACING));
                        ctx.lineTo(x, (GRID_SIZE * GRID_SPACING));
                    }
                    for (let y = -(GRID_SIZE * GRID_SPACING); y < (GRID_SIZE * GRID_SPACING); y += GRID_SPACING) {
                        ctx.moveTo(-(GRID_SIZE * GRID_SPACING), y);
                        ctx.lineTo((GRID_SIZE * GRID_SPACING), y);
                    }
                    ctx.fillStrokeShape(shape);
                }}
                stroke="gray"
                strokeWidth={1}
            />
            <Line
                points={[0, -GRID_SIZE * GRID_SPACING, 0, (GRID_SIZE * GRID_SPACING)]}
                stroke="red"
                strokeWidth={2} />

            <Line
                points={[-(GRID_SIZE * GRID_SPACING), 0, (GRID_SIZE * GRID_SPACING), 0]}
                stroke="blue"
                strokeWidth={2} />
        </Group>

    );
}