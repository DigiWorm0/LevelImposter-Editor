import { Group, Line, Rect, Shape } from "react-konva";
import React from "react";
import useSettings from "../../hooks/useSettings";

const GRID_SPACING = 100;
const GRID_SIZE = 25;

export default function CanvasGrid() {
    const [settings] = useSettings();

    return (
        <Group name="canvas-grid">
            {settings.isGridVisible && (
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
            )}
            {settings.isAxisVisible && (
                <>
                    <Line
                        points={[0, -GRID_SIZE * GRID_SPACING, 0, (GRID_SIZE * GRID_SPACING)]}
                        stroke="red"
                        strokeWidth={2} />

                    <Line
                        points={[-(GRID_SIZE * GRID_SPACING), 0, (GRID_SIZE * GRID_SPACING), 0]}
                        stroke="blue"
                        strokeWidth={2} />
                </>
            )}

            <Rect
                x={-GRID_SIZE * GRID_SPACING}
                y={-GRID_SIZE * GRID_SPACING}
                width={GRID_SIZE * GRID_SPACING * 2}
                height={GRID_SIZE * GRID_SPACING * 2}
                fill={"transparent"}
                stroke={"white"}
            />
        </Group>

    );
}