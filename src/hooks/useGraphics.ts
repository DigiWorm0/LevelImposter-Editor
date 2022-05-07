import React from 'react';
import { Graphics } from '../graphics/Graphics';
import Renderer from '../types/Renderer';

export default function useGraphics(ref: React.RefObject<HTMLCanvasElement>) {
    const [graphics, setGraphics] = React.useState<Graphics>();

    React.useEffect(() => {
        if (ref.current) {
            setGraphics(new Graphics(ref.current));
        }
    }, [ref]);

    return graphics;
}
