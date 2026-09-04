import useElementSprite from "../hooks/texture/useElementSprite";
import React from "react";
import {MaybeGUID} from "@/shared/types/GUID";
import {PixiReactElementProps} from "@pixi/react";
import {Sprite} from "pixi.js";
import useSpriteAnimPlayback from "./useSpriteAnimPlayback";

export interface MapElementSpriteProps extends PixiReactElementProps<typeof Sprite> {
    elementID: MaybeGUID;
    shouldAnimate?: boolean;
}

export default function MapElementAnimatedSprite(props: MapElementSpriteProps) {
    const sprite = useElementSprite(props.elementID);
    const spriteRef = React.useRef<Sprite>(null);
    useSpriteAnimPlayback(spriteRef);

    if (!sprite)
        return null;
    return (
        <pixiSprite
            ref={spriteRef}
            texture={sprite}

            {...props}
        />
    );
}