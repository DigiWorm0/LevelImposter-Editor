import { Box } from '@mui/system';
import React from 'react';
import useGraphics from '../hooks/useGraphics';

export default function Canvas() {
    const [screenSize, setSize] = React.useState({ x: window.innerWidth, y: window.innerHeight });
    const canvas = React.useRef<HTMLCanvasElement>(null);
    const container = React.useRef<HTMLDivElement>(null);
    const graphics = useGraphics(canvas);

    React.useEffect(() => {
        const onResize = () => {
            setSize({ x: window.innerWidth, y: window.innerHeight });
        }
        window.addEventListener('resize', onResize);
        return (() => {
            window.removeEventListener('resize', onResize);
        });
    }, [screenSize]);

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
                width={screenSize.x}
                height={screenSize.y}
            />

        </Box>

    );
}