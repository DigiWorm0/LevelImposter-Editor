import {useSetPlayhead} from "./usePlayhead";
import usePlayAnim from "./usePlayAnim";
import React from "react";
import useAnimDuration from "./useAnimDuration";
import useLoopAnim from "./useLoopAnim";

export default function useAnimationPlayback() {
    const setPlayhead = useSetPlayhead();
    const [isPlaying, setIsPlaying] = usePlayAnim();
    const [loop] = useLoopAnim();
    const duration = useAnimDuration();

    React.useEffect(() => {
        if (isPlaying) {
            let _isPlaying = true;
            const startTime = Date.now();

            const render = () => {
                // If we're not playing, stop the loop
                if (!_isPlaying)
                    return;

                // Get the current time
                const currentTime = Date.now();
                let elapsedTime = currentTime - startTime; // ms
                elapsedTime /= 1000; // ms -> s

                // Check if we've reached the end
                if (elapsedTime >= duration && !loop) {
                    setPlayhead(duration);
                    setIsPlaying(false);
                    _isPlaying = false;
                    return;
                }

                // Set the playhead
                setPlayhead(elapsedTime % duration);

                // Request the next frame
                requestAnimationFrame(render);
            };

            requestAnimationFrame(render);

            return () => {
                _isPlaying = false;
            };
        }
    }, [isPlaying, duration, loop]);
}