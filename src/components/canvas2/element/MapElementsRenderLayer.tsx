import React from "react";
import {IRenderLayer} from "pixi.js";
import useElementIDs from "../../../hooks/elements/useElementIDs";
import {getMapElementRef} from "@/hooks/canvas/useMapElementRef";

/**
 * By default, zIndex of elements is local to their parent's container instead of global.
 * This uses Pixi.js `RenderLayer` to fix this by manually assigning render order of all `MapElement` components.
 */
export default function MapElementsRenderLayer() {
    const elementIDs = useElementIDs();
    const renderLayerRef = React.useRef<IRenderLayer>(null);

    React.useEffect(() => {
        if (!renderLayerRef.current) return;

        // Add each map element to the render layer
        for (let i = 0; i < elementIDs.length; i++) {

            // Get map element reference
            const elementID = elementIDs[i];
            const mapElementRef = getMapElementRef(elementID);
            if (!mapElementRef?.current)
                continue;

            // Attach to render layer
            renderLayerRef.current.attach(mapElementRef.current);
        }

        // Sort all children manually based on zIndex
        // Do this AFTER attaching all elements to avoid multiple sorts
        renderLayerRef.current.sortRenderLayerChildren();

        // Detach all map elements from the render layer on unmount
        return () => renderLayerRef.current?.detachAll();
    }, [elementIDs]);

    return (
        <pixiRenderLayer ref={renderLayerRef}/>
    );
}