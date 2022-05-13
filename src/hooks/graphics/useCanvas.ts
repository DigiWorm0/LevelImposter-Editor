import React from 'react';
import { Graphics } from '../../graphics/Graphics';
import useGraphics from './useGraphics';

export default function useCanvas(ref: React.RefObject<HTMLCanvasElement>) {
    const graphics = useGraphics(ref);
    const elemRenderer = useElemRenderer(graphics);
}
