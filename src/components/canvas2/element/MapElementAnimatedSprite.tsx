import useElementSprite from "../../../hooks/canvas/sprite/useElementSprite";
import React from "react";
import {MaybeGUID} from "../../../types/common/GUID";
import useElement from "../../../hooks/elements/useElements";
import {PixiReactElementProps, useTick} from "@pixi/react";
import useSpriteAnimation from "../../../hooks/elements/animation/useSpriteAnimation";
import {Sprite} from "pixi.js";
import primaryStore from "../../../hooks/primaryStore";
import {spriteAtomFamily} from "../../../hooks/canvas/sprite/useSprite";
import {mapAssetsAtomFamily} from "../../../hooks/assets/useMapAsset";

export interface MapElementSpriteProps extends PixiReactElementProps<typeof Sprite> {
    elementID: MaybeGUID;
    shouldAnimate?: boolean;
}

export default function MapElementAnimatedSprite(props: MapElementSpriteProps) {
    const sprite = useElementSprite(props.elementID);
    const [element] = useElement(props.elementID);
    const [animation] = useSpriteAnimation(element?.properties.animationID);

    const frameRef = React.useRef(0);
    const frameTimeRef = React.useRef(0);
    const spriteRef = React.useRef<Sprite>(null);

    useTick((ticker) => {
        if (!animation || !props.shouldAnimate)
            return;

        // Increment frame time
        frameTimeRef.current += ticker.deltaMS;

        // Check if it's time to advance the frame
        let frame = animation.frames[frameRef.current];
        if (frameTimeRef.current > frame.delay) {

            // Advance to next frame
            frameTimeRef.current = 0;
            frameRef.current = (frameRef.current + 1) % animation.frames.length;
            frame = animation.frames[frameRef.current];

            // Get Asset
            const asset = primaryStore.get(mapAssetsAtomFamily(frame.spriteID));
            if (!asset)
                return;

            // Get Texture
            primaryStore.get(spriteAtomFamily(asset.url)).then((texture) => {
                if (spriteRef.current && texture)
                    spriteRef.current.texture = texture;
            });
        }
    });

    React.useEffect(() => {
        // Reset to first frame when "shouldAnimate" is disabled
        if (sprite && spriteRef.current && !props.shouldAnimate) {
            frameRef.current = 0;
            frameTimeRef.current = 0;
            spriteRef.current.texture = sprite;
        }
    }, [props.shouldAnimate, sprite]);

    if (!element || !sprite)
        return null;
    return (
        <pixiSprite
            ref={spriteRef}
            texture={sprite}

            {...props}
        />
    );
}