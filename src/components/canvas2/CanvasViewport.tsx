import React, {PropsWithChildren} from "react";
import {extend, useApplication} from "@pixi/react";
import {type IViewportOptions, Viewport as BaseViewport} from "pixi-viewport";
import {Application} from "pixi.js";
import {viewportAtom} from "../../hooks/canvas/useViewport";
import primaryStore from "../../hooks/primaryStore";

type ViewportProps = Omit<IViewportOptions, "events">;

class ViewportWrapper extends BaseViewport {
    constructor(options: ViewportProps & { app: Application }) {
        const {app} = options;
        super({...options, events: app.renderer.events});

        // Configure viewport options
        this
            .drag({
                mouseButtons: "right",
            })
            .pinch()
            .wheel()
            .decelerate({
                friction: 0.85
            });

        // Start in center of the screen
        this.left = -window.innerWidth / 2;
        this.top = -window.innerHeight / 2;

        // Handle resize events
        app.renderer.on("resize", () => {
            this.resize(app.renderer.width, app.renderer.height);
        });

        // Set initial viewport state from primary store
        primaryStore.set(viewportAtom, this);
    }
}

extend({ViewportWrapper});

export default function CanvasViewport(props: PropsWithChildren<ViewportProps>) {
    const {app} = useApplication();

    return (
        app?.renderer && (
            <pixiViewportWrapper app={app} {...props} />
        )
    );
}
