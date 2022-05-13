import React from 'react';
import { useElements } from '../../db/useElement';
import useMap from '../../db/useMap';
import GraphicsContext from '../GraphicsContext';

const LINE_WIDTH = 1;
const LINE_COLOR = "#888";
const X_AXIS_COLOR = "#0096ff";
const Y_AXIS_COLOR = "#ff0000";
const GRID_SIZE = 100;

export default function useElemRend(ctx: GraphicsContext) {
    ctx.setColor(LINE_COLOR);
    ctx.setLineWidth(LINE_WIDTH);

    for (let x = -GRID_SIZE; x < GRID_SIZE; x++) {
        ctx.drawLine(
            { x: x, y: -GRID_SIZE },
            { x: x, y: GRID_SIZE }
        );
    }

    for (let y = -GRID_SIZE; y < GRID_SIZE; y++) {
        ctx.drawLine(
            { x: -GRID_SIZE, y: y },
            { x: GRID_SIZE, y: y }
        );
    }

    ctx.setColor(X_AXIS_COLOR);
    ctx.drawLine(
        { x: 0, y: -GRID_SIZE },
        { x: 0, y: GRID_SIZE }
    );

    ctx.setColor(Y_AXIS_COLOR);
    ctx.drawLine(
        { x: -GRID_SIZE, y: 0 },
        { x: GRID_SIZE, y: 0 }
    );
}
