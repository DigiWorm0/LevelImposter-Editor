import { Group, Line, Shape } from "react-konva";
import { useSettingsValue } from "../../hooks/useSettings";
import { DEFAULT_GRID_SIZE, GRID_SPACING } from "../../types/generic/Constants";


export default function CanvasGrid() {
    const settings = useSettingsValue();

    const isVisible = settings.isGridVisible === undefined ? true : settings.isGridVisible;
    const gridSize = settings.gridSize === undefined ? DEFAULT_GRID_SIZE : settings.gridSize;

    return (
        <Group name="canvas-grid" listening={false}>
            {isVisible && (
                <>
                    <Shape
                        sceneFunc={(ctx, shape) => {
                            ctx.beginPath();
                            for (let x = -(gridSize * GRID_SPACING); x < (gridSize * GRID_SPACING); x += GRID_SPACING) {
                                ctx.moveTo(x, -(gridSize * GRID_SPACING));
                                ctx.lineTo(x, (gridSize * GRID_SPACING));
                            }
                            for (let y = -(gridSize * GRID_SPACING); y < (gridSize * GRID_SPACING); y += GRID_SPACING) {
                                ctx.moveTo(-(gridSize * GRID_SPACING), y);
                                ctx.lineTo((gridSize * GRID_SPACING), y);
                            }
                            ctx.fillStrokeShape(shape);
                        }}
                        stroke="#5F6B7C"
                        strokeWidth={1}
                    />
                    <Line
                        points={[0, -gridSize * GRID_SPACING, 0, (gridSize * GRID_SPACING)]}
                        stroke="#B83211"
                        strokeWidth={2} />

                    <Line
                        points={[-(gridSize * GRID_SPACING), 0, (gridSize * GRID_SPACING), 0]}
                        stroke="#215DB0"
                        strokeWidth={2} />
                </>
            )}
        </Group>

    );
}