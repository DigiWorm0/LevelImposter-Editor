import React from "react";
import GUID from "@shared/types/GUID";
import {Container} from "pixi.js";
import useAnimationPlayback from "../../timeline/hooks/useAnimationPlayback";
import useIsAnimTarget from "../../timeline/hooks/useIsAnimTarget";
import StaticMapElement from "../element/StaticMapElement";
import {useAtomValue} from "jotai";
import {settingsAtom} from "@editor/settings/settingsStore";

export interface AnimationOverlayProps {
    elementID: GUID;
}

export default function AnimationOverlay(props: AnimationOverlayProps) {
    const isAnimTarget = useIsAnimTarget(props.elementID);
    const {animPreview} = useAtomValue(settingsAtom);
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