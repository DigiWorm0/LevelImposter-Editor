import React from "react";
import {IRenderLayer} from "pixi.js";
import {atom, useSetAtom} from "jotai";

export const mapElementsRenderLayerRefAtom = atom<IRenderLayer | null>(null);

/**
 * By default, zIndex of elements is local to their parent's container instead of global.
 * This uses Pixi.js `RenderLayer` to fix this by manually assigning render order of all `MapElement` components.
 */
export default function MapElementsRenderLayer() {
    const setMapElementsRenderLayerRef = useSetAtom(mapElementsRenderLayerRefAtom);

    return (
        <pixiRenderLayer
            ref={(r) => setMapElementsRenderLayerRef(r)}
            sortableChildren={true}
        />
    );
}