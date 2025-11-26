import React from "react";
import GUID from "../../../types/common/GUID";
import {useElementValue} from "../../../hooks/elements/useElements";
import {useSettingsValue} from "../../../hooks/useSettings";
import useElementSprite from "../../../hooks/canvas/sprite/useElementSprite";
import {Sprite} from "pixi.js";
import useAnimationPlayback from "../../../hooks/timeline/useAnimationPlayback";

export interface AnimationOverlayProps {
    elementID: GUID;
}

export default function AnimationOverlay(props: AnimationOverlayProps) {
    const element = useElementValue(props.elementID);
    const sprite = useElementSprite(props.elementID);
    const {animPreview} = useSettingsValue();
    const ref = React.useRef<Sprite>(null);
    useAnimationPlayback(props.elementID, ref);

    if (!element ||
        !sprite ||
        sprite.destroyed ||
        !animPreview)
        return null;
    return (
        <pixiSprite
            ref={ref}
            texture={sprite}
            anchor={0.5}
            eventMode={"none"}
        />
    );
}