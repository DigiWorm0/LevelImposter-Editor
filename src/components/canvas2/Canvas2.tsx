import {Application, extend} from "@pixi/react";
import {Container, CullerPlugin, extensions, Graphics, Sprite} from "pixi.js";
import React from "react";
import useWindowSize from "../../hooks/canvas/useWindowSize";
import "../../pixi.d.ts";
import CanvasViewport from "./CanvasViewport";
import CanvasGrid from "./grid/CanvasGrid";
import MapElementsRenderer from "./element/MapElementsRenderer";

// Pass used pixi components to the pixi-react renderer
extend({
    Container,
    Graphics,
    Sprite,
});

// Allow viewport culling to improve performance
extensions.add(CullerPlugin);

export default function Canvas2() {
    const [windowWidth, windowHeight] = useWindowSize();

    return (
        <Application
            width={windowWidth}
            height={windowHeight}
            backgroundAlpha={0}
        >
            <CanvasViewport
                disableOnContextMenu={true}
            >
                <pixiContainer
                    sortableChildren={true}
                    cullableChildren={true}
                    cullable={true}
                >
                    <MapElementsRenderer/>
                </pixiContainer>

                <CanvasGrid/>
            </CanvasViewport>

        </Application>
    );
}