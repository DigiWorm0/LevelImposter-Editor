import { Box } from '@mui/system';
import React from 'react';
import useGraphics from '../hooks/useGraphics';

export default function Canvas() {
    const canvas = React.useRef<HTMLCanvasElement>(null);
    const container = React.useRef<HTMLDivElement>(null);
    useGraphics(canvas);

    return (
        <Box
            ref={container}
            component="main"
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                overflow: "hidden",
            }}>

            <canvas
                ref={canvas}
                className="canvas"
                width={container.current?.clientWidth}
                height={container.current?.clientHeight}
            />

        </Box>

    );
}