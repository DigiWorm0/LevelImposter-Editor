import React from "react";
import GUID from "@shared/types/GUID";
import {useSettingsValue} from "@/hooks/useSettings";
import {Container} from "pixi.js";
import useAnimationPlayback from "../../../hooks/timeline/useAnimationPlayback";
import useIsAnimTarget from "../../../hooks/timeline/useIsAnimTarget";
import StaticMapElement from "../element/StaticMapElement";

export interface AnimationOverlayProps {
    elementID: GUID;
}

export default function AnimationOverlay(props: AnimationOverlayProps) {
    const isAnimTarget = useIsAnimTarget(props.elementID);
    const {animPreview} = useSettingsValue();
    const containerRef = React.useRef<Container>(null);
    useAnimationPlayback(props.elementID, containerRef);

    if (!isAnimTarget ||
        !animPreview)
        return null;
    return (
        <StaticMapElement
            disableTransformation
            containerRef={containerRef}
            elementID={props.elementID}
        />
    );
}