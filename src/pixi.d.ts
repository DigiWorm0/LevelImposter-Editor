import {type PixiReactElementProps} from "@pixi/react";
import {type Application} from "pixi.js";

declare module "@pixi/react" {
    interface PixiElements {
        viewport: PixiReactElementProps<typeof Viewport>;
    }
}

declare global {
    namespace React {
        namespace JSX {
            interface IntrinsicElements extends PixiElements {
                pixiViewportWrapper: PropsWithChildren<PixiReactElementProps<ViewportWrapper>> & {
                    app: Application;
                };
            }
        }
    }
}