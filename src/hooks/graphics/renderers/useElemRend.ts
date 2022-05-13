import React from 'react';
import { useElements } from '../../db/useElement';
import useMap from '../../db/useMap';
import GraphicsContext from '../GraphicsContext';

export default function useElemRend(ctx: GraphicsContext) {
    const [map] = useMap();
    const [mapElements] = useElements(map.elemIDs);

    

    for (const element of mapElements) {
        const sprite = ctx.getSprite(element.type);
        const pos = { x: element.x, y: element.y };
        const scale = { x: element.xScale, y: element.yScale };

        ctx.drawSprite(sprite, pos, scale, element.rotation);
    }
}
