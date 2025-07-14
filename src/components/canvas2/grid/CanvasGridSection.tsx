export interface CanvasGridSectionProps {
    gridSize: number;
    cellSize: number;

    top: number;
    left: number;
    sizeStep: number;

    alpha: number;
    scale: number;
}

export default function CanvasGridSection(props: CanvasGridSectionProps) {

    const gridSpacing = props.cellSize * props.sizeStep;
    const gridX = Math.floor(props.left / gridSpacing) * gridSpacing;
    const gridY = Math.floor(props.top / gridSpacing) * gridSpacing;

    return (
        <pixiGraphics
            x={gridX}
            y={gridY}
            draw={(g) => {
                g.clear();

                const {gridSize, alpha} = props;

                // Draw horizontal lines
                for (let x = 0; x < gridSize; x += gridSpacing) {
                    g.moveTo(x, 0)
                        .lineTo(x, gridSize)
                        .stroke({color: 0x5F6B7C, alpha, width: 1 / props.scale});
                }

                // Draw vertical lines
                for (let y = 0; y < gridSize; y += gridSpacing) {
                    g.moveTo(0, y)
                        .lineTo(gridSize, y)
                        .stroke({color: 0x5F6B7C, alpha, width: 1 / props.scale});
                }
            }}
        />
    )
}