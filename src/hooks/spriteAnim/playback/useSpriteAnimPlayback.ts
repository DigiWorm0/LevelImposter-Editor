import React, {RefObject} from "react";
import primaryStore from "../../primaryStore";
import {useApplication, useTick} from "@pixi/react";
import useSpriteAnimPlaying from "./useSpriteAnimPlaying";
import {Sprite} from "pixi.js";
import useSelectedSpriteAnim from "../useSelectedSpriteAnim";
import {spriteAtomFamily} from "../../sprites/useSprite";
import {unwrap} from "jotai/utils";
import spriteAnimEventEmitter from "../../../utils/spriteAnim/spriteAnimEventEmitter";
import GUID from "../../../types/common/GUID";

export default function useSpriteAnimPlayback(
    spriteRef: RefObject<Sprite | null>
) {
    const app = useApplication();
    const [animation] = useSelectedSpriteAnim();
    const [isPlaying, setIsPlaying] = useSpriteAnimPlaying();

    const frameTimeRef = React.useRef(0);
    const frameRef = React.useRef(0);

    const setSpriteFromID = (spriteID: GUID) => {
        const spriteTexture = primaryStore.get(unwrap(spriteAtomFamily(spriteID)));
        if (spriteRef.current && spriteTexture)
            spriteRef.current.texture = spriteTexture;
    };

    const loop = animation?.loop ?? true;

    useTick((ticker) => {
        if (spriteRef.current) {
            // Resize sprite to application (maintain aspect ratio)
            const appWidth = app.app.renderer.width;
            const appHeight = app.app.renderer.height;

            const spriteWidth = spriteRef.current.texture.width;
            const spriteHeight = spriteRef.current.texture.height;

            const scale = Math.min(appWidth / spriteWidth, appHeight / spriteHeight);
            spriteRef.current.scale.set(scale, scale);

            // Center sprite
            spriteRef.current.x = (appWidth - (spriteWidth * scale)) / 2;
            spriteRef.current.y = (appHeight - (spriteHeight * scale)) / 2;
        }

        // Abort if no animation or not playing
        if (!animation || !isPlaying)
            return;

        // Increment frame time
        frameTimeRef.current += ticker.deltaMS;


        // Check if frame is in bounds
        let shouldUpdateFrame = false;
        if (frameRef.current < 0 || frameRef.current >= animation.frames.length) {
            frameRef.current = 0;
            frameTimeRef.current = 0;
            shouldUpdateFrame = true;
        }

        // Check if it's time to advance the frame
        let frame = animation.frames[frameRef.current];
        if (frameTimeRef.current > frame.delay) {

            // Advance to next frame
            frameTimeRef.current = 0;
            frameRef.current = frameRef.current + 1;

            // Check for stopping
            const isAtEnd = frameRef.current >= animation.frames.length;
            if (isAtEnd && !loop) {
                setIsPlaying(false);
                frameRef.current = -1;
                return;
            } else if (isAtEnd && loop) {
                frameRef.current = 0;
            }

            shouldUpdateFrame = true;
        }

        // Update sprite if needed
        if (shouldUpdateFrame) {
            frame = animation.frames[frameRef.current];
            setSpriteFromID(frame.spriteID);
        }
    });

    React.useEffect(() => {
        const onStop = () => {

            // Reset frame counters
            frameRef.current = 0;
            frameTimeRef.current = 0;

            // Reset sprite to first frame
            if (animation && animation.frames.length > 0) {
                const firstFrame = animation.frames[0];
                setSpriteFromID(firstFrame.spriteID);
            }
        };

        spriteAnimEventEmitter.on("stopPlayback", onStop);
        return () => {
            spriteAnimEventEmitter.off("stopPlayback", onStop);
        };
    });
}