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

    // Calculate spacing between grid lines
    const gridSpacing = props.cellSize * props.sizeStep;

    // Ensure grid covers entire area
    const actualGridSize = props.gridSize + gridSpacing;

    // Snap to the closest viewport offset
    const gridX = Math.floor(props.left / gridSpacing) * gridSpacing;
    const gridY = Math.floor(props.top / gridSpacing) * gridSpacing;

    return (
        <pixiGraphics
            eventMode={"none"}
            x={gridX}
            y={gridY}
            draw={(g) => {
                g.clear();

                const {alpha} = props;

                // Draw horizontal lines
                for (let x = 0; x <= actualGridSize; x += gridSpacing) {
                    g.moveTo(x, 0)
                        .lineTo(x, actualGridSize)
                        .stroke({color: 0x5F6B7C, alpha, width: 1 / props.scale});
                }

                // Draw vertical lines
                for (let y = 0; y <= actualGridSize; y += gridSpacing) {
                    g.moveTo(0, y)
                        .lineTo(actualGridSize, y)
                        .stroke({color: 0x5F6B7C, alpha, width: 1 / props.scale});
                }
            }}
        />
    );
}