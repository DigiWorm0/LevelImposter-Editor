import React from 'react';
import useGraphics from '../hooks/useGraphics';

export default function Canvas() {
    const canvas = React.useRef<HTMLCanvasElement>(null);
    const graphics = useGraphics(canvas);

    return (
        <canvas
            ref={canvas}
            className="canvas"
            width={window.innerWidth}
            height={window.innerHeight}
        />
    );
}