import React from 'react';
import GraphicsCtx from './GraphicsContext';

export default function useGraphics(ref: React.RefObject<HTMLCanvasElement>) {
    const [graphics, setGraphics] = React.useState(undefined as GraphicsCtx | undefined);

    React.useEffect(() => {
        if (ref.current) {
            setGraphics(new GraphicsCtx(ref.current));
        }
    }, [ref]);

    return graphics;
}
