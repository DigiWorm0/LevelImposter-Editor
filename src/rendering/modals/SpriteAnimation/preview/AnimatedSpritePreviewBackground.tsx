import React from "react";
import drawAlphaGrid from "../../../canvas2/utils/drawAlphaGrid";

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