import usePlayAnim from "./usePlayAnim";
import React from "react";

export default function useAnimationPlayback() {
    // const setPlayhead = useSetPlayhead();
    const [isPlaying] = usePlayAnim();

    React.useEffect(() => {
        if (isPlaying) {

            // TODO: Fix me
            // const loopAtom = selectedElementPropAtom("triggerLoop");
            //
            // let startT = primaryStore.get(playheadAtom);
            // if (startT >= primaryStore.get(animDurationAtom))
            //     startT = 0;
            // const anim = new Konva.Animation((frame) => {
            //     if (!frame)
            //         return;
            //
            //     // Update Values
            //     const loop = primaryStore.get(loopAtom);
            //     const duration = primaryStore.get(animDurationAtom);
            //
            //     // Get the current time
            //     const t = frame.time / 1000 + startT;
            //
            //     if (t >= duration && !loop) {
            //         setPlayhead(duration);
            //         setIsPlaying(false);
            //         anim.stop();
            //         return;
            //     }
            //
            //     setPlayhead(t % duration);
            // });
            //
            // // Start Animation
            // anim.start();
            //
            // // Stop Animation when unmounting
            // return () => {
            //     anim.stop();
            // };
        }
    }, [isPlaying]);
}