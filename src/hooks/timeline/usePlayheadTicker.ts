import {isAnimPlayingAtom} from "./useIsAnimPlaying";
import {useTick} from "@pixi/react";
import {playheadAtom} from "./usePlayhead";
import {animDurationAtom} from "./useAnimDuration";
import {selectedElementPropAtom} from "../elements/useSelectedElemProperty";
import primaryStore from "@/shared/store";

const isAnimLoopingAtom = selectedElementPropAtom("triggerLoop");

export default function usePlayheadTicker() {

    useTick((ticker) => {
        // Check if animation is playing
        const isPlaying = primaryStore.get(isAnimPlayingAtom);
        if (!isPlaying)
            return;

        // Get playhead
        const playhead = primaryStore.get(playheadAtom) + (ticker.deltaMS / 1000);

        // Stop the playback if we reached the end (and not looping)
        const isLooping = primaryStore.get(isAnimLoopingAtom);
        const duration = primaryStore.get(animDurationAtom);
        if (playhead >= duration && !isLooping) {
            primaryStore.set(playheadAtom, duration);
            primaryStore.set(isAnimPlayingAtom, false);
            return;
        }

        // Increment playhead
        primaryStore.set(playheadAtom, playhead % duration);
    });
}