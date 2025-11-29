import {MaybeGUID} from "../../types/common/GUID";
import {atom, useSetAtom} from "jotai";
import {elementAtomFamily} from "../elements/useElements";
import {viewportAtom} from "./useViewport";
import {UNITY_SCALE} from "../../types/amongus/Constants";
import {Ticker} from "pixi.js";

const ticker = new Ticker();
ticker.autoStart = true;

const ANIM_DURATION = 20;

export const jumpToElementAtom = atom(null, (get, _set, elementID: MaybeGUID) => {

    // By default, jump to (0,0)
    let elementPosition = {x: 0, y: 0};

    // Get the element
    if (elementID !== undefined) {
        const element = get(elementAtomFamily(elementID));
        if (!element)
            return;

        elementPosition = {x: element.x, y: element.y};
    }

    // Get the viewport
    const viewport = get(viewportAtom);
    if (!viewport)
        return;

    // Get Start/End Position
    const startPosition = viewport.center;
    const endPosition = {x: elementPosition.x * UNITY_SCALE, y: -elementPosition.y * UNITY_SCALE};

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

    // Move the viewport to the element's position
    // TODO: Animate me

});

export default function useJumpToElement() {
    return useSetAtom(jumpToElementAtom);
}