import {useTick} from "@pixi/react";
import {animDurationAtom} from "./useAnimDuration";
import {selectedElementPropAtom} from "../../../hooks/elements/useSelectedElemProperty";
import primaryStore from "@shared/store";
import {animatorsPlayheadAtom, isAnimatorsPlayingAtom} from "@editor/animators/animatorPlaybackStore";
import {pauseAnimators} from "@editor/animators/setPlaybackState";

const isAnimLoopingAtom = selectedElementPropAtom("triggerLoop");

export default function usePlayheadTicker() {

    useTick((ticker) => {
        // Check if animation is playing
        const isPlaying = primaryStore.get(isAnimatorsPlayingAtom);
        if (!isPlaying)
            return;

        // Get playhead
        const playhead = primaryStore.get(animatorsPlayheadAtom) + (ticker.deltaMS / 1000);

        // Stop the playback if we reached the end (and not looping)
        const isLooping = primaryStore.get(isAnimLoopingAtom);
        const duration = primaryStore.get(animDurationAtom);
        if (playhead >= duration && !isLooping) {
            pauseAnimators();
            return;
        }

        // Increment playhead
        primaryStore.set(animatorsPlayheadAtom, playhead % duration);
    });
}