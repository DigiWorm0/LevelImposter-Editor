import React from "react";

export interface AnimatedSpritePreviewBackgroundProps {
    size: number;
    cellSize: number;
}

export default function AnimatedSpritePreviewBackground(props: AnimatedSpritePreviewBackgroundProps) {
    const {size, cellSize} = props;

    const actualCellSize = Math.round(cellSize);

    return (
        <pixiGraphics
            draw={(g) => {
                g.clear();

                for (let x = 0; x < size; x += actualCellSize) {
                    for (let y = 0; y < size; y += actualCellSize) {
                        const isEvenCell = ((x / actualCellSize) + (y / actualCellSize)) % 2 === 0;
                        g.rect(x, y, actualCellSize, actualCellSize)
                            .fill(isEvenCell ? 0x444444 : 0x555555)
                            .closePath();
                    }
                }
            }}
        />
    );
}