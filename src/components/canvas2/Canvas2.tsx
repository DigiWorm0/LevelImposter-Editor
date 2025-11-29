import {Application, extend} from "@pixi/react";
import {BitmapText, Container, CullerPlugin, extensions, Graphics, Sprite, Text} from "pixi.js";
import React from "react";
import "../../pixi.d.ts";
import CanvasViewport from "./CanvasViewport";
import CanvasGrid from "./grid/CanvasGrid";
import MapElementsRenderer from "./element/MapElementsRenderer";
import DeselectBackground from "./DeselectBackground";
import "pixi.js/dds";
import MapElementOverlaysRenderer from "./element/MapElementOverlaysRenderer";

// Pass used pixi components to the pixi-react renderer
extend({
    Container,
    Graphics,
    Sprite,
    Text,
    BitmapText
});

// Allow viewport culling to improve performance
extensions.add(CullerPlugin);

export default function Canvas2() {

    return (
        <Application
            resizeTo={window}
            backgroundAlpha={0}
            antialias={true}
        >
            <CanvasViewport
                disableOnContextMenu={true}
            >
                <DeselectBackground/>
                <MapElementsRenderer/>
                <MapElementOverlaysRenderer/>
                <CanvasGrid/>
            </CanvasViewport>

        </Application>
    );
}