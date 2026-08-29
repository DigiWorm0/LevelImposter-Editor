import store from "@/shared/store";
import {animatorsPlayheadAtom, isAnimatorsPlayingAtom} from "@editor/animators/animatorPlaybackStore";
import {animDurationAtom} from "@/hooks/timeline/useAnimDuration";

export const setPlaybackState = (isPlaying: boolean, t: number) => {
    setAnimatorsPlaying(isPlaying);
    store.set(animatorsPlayheadAtom, Math.max(0, t));
};

export const setAnimatorsPlaying = (isPlaying: boolean) => {

    // Restart playhead if we are already at the end of the timeline
    if (isPlaying) {
        const playhead = store.get(animatorsPlayheadAtom);
        const duration = store.get(animDurationAtom);
        if (playhead >= duration)
            store.set(animatorsPlayheadAtom, 0);
    }

    store.set(isAnimatorsPlayingAtom, isPlaying);
};

export const playAnimators = () => setAnimatorsPlaying(true);
export const pauseAnimators = () => setAnimatorsPlaying(false);
export const toggleAnimators = () => {
    const isPlaying = store.get(isAnimatorsPlayingAtom);
    setAnimatorsPlaying(!isPlaying);
};
export const stopAnimators = () => {
    pauseAnimators();
    store.set(animatorsPlayheadAtom, 0);
};