import React from "react";
import drawAlphaGrid from "../../../../utils/canvas/drawAlphaGrid";

export interface AnimatedSpritePreviewBackgroundProps {
    size: number;
    cellSize: number;
}

export default function AnimatedSpritePreviewBackground(props: AnimatedSpritePreviewBackgroundProps) {
    const {size, cellSize} = props;

    const actualCellSize = Math.round(cellSize);

    return (
        <pixiGraphics draw={(g) => drawAlphaGrid(g, size, size, actualCellSize)}/>
    );
}