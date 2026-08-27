import {MaybeGUID} from "@/types/common/GUID";
import {atom, useSetAtom} from "jotai";
import {viewportAtom} from "./useViewport";
import {Ticker} from "pixi.js";
import {getMapElementRef} from "./useMapElementRef";
import screenToWorld from "./useScreenToWorld";

const ticker = new Ticker();
ticker.autoStart = true;

const ANIM_DURATION = 20;

export const jumpToElementAtom = atom(null, (get, _set, elementID: MaybeGUID) => {

    // By default, jump to (0,0)
    let elementPosition = {x: 0, y: 0};

    // Get the element
    if (elementID !== undefined) {
        const mapElementRef = getMapElementRef(elementID);
        if (!mapElementRef.current)
            return;

        const screenPos = mapElementRef.current.getGlobalPosition();
        elementPosition = screenToWorld(screenPos);
    }

    // Get the viewport
    const viewport = get(viewportAtom);
    if (!viewport)
        return;

    // Get Start/End Position
    const startPosition = viewport.center;
    const endPosition = elementPosition;

    // Animate the viewport to the element's position
    let t = 0;
    const animateToElement = () => {
        // Update time/progress
        t += ticker.deltaTime;
        const progress = t / ANIM_DURATION;

        // Curves the progress to make it look more natural
        const curvedProgress = progress < 0.5 ?
            2 * progress * progress :
            -1 + (4 - 2 * progress) * progress;

        // Animate Position
        viewport.moveCenter({
            x: startPosition.x + (endPosition.x - startPosition.x) * curvedProgress,
            y: startPosition.y + (endPosition.y - startPosition.y) * curvedProgress
        });

        // Ensure viewport position is updated by event listeners
        viewport.emit("moved", {viewport, type: "snap"});

        // Stop Animation
        if (progress >= 1)
            ticker.remove(animateToElement);
    };
    ticker.add(animateToElement);

});

export default function useJumpToElement() {
    return useSetAtom(jumpToElementAtom);
}