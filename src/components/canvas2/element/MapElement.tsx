import React from "react";
import {MaybeGUID} from "../../../types/generic/GUID";
import useElement from "../../../hooks/elements/useElements";
import usePixiAsset from "../../../hooks/canvas/usePixiAsset";
import {useIsSelectedElem, useSetSelectedElemID} from "../../../hooks/elements/useSelectedElem";
import {useElementChildIDs} from "../../../hooks/elements/useElementChildIDs";
import getGlobalZFromLocalZ from "../../../utils/canvas/getGlobalZFromLocalZ";
import {UNITY_SCALE} from "../../../types/generic/Constants";
import useElementOpacity from "../../../hooks/canvas/useElementOpacity";
import {useIsSelectedCollider} from "../../../hooks/elements/colliders/useSelectedCollider";
import useEmbed from "../../../hooks/embed/useEmbed";
import degToRad from "../../../utils/canvas/degToRad";
import useStartDrag from "../../../hooks/canvas/drag/useStartDrag";
import useDragMove from "../../../hooks/canvas/drag/useDragMove";
import useStopDrag from "../../../hooks/canvas/drag/useStopDrag";
import {Container} from "pixi.js";
import MapElementSelectionOutline from "./MapElementSelectionOutline";

export interface MapElementProps {
    elementID: MaybeGUID;
}

export default function MapElement(props: MapElementProps) {
    const [isHovering, setIsHovering] = React.useState(false);
    const containerRef = React.useRef<Container>(null);
    const childElementIDs = useElementChildIDs(props.elementID);
    const setSelectedID = useSetSelectedElemID();
    const isSelected = useIsSelectedElem(props.elementID);
    const [elem] = useElement(props.elementID);
    const sprite = usePixiAsset(props.elementID);
    const opacity = useElementOpacity(props.elementID);

    const startDrag = useStartDrag();
    const runDragMove = useDragMove();
    const runStopDrag = useStopDrag();

    const isColliderSelected = useIsSelectedCollider();
    const isEmbedded = useEmbed();
    const isVisible = elem?.properties.isVisible ?? true;

    if (!elem)
        return null;
    return (
        <pixiContainer
            ref={containerRef}

            cullable={true}

            x={elem.x * UNITY_SCALE}
            y={-elem.y * UNITY_SCALE}
            rotation={-degToRad(elem.rotation)}
            scale={{x: elem.xScale, y: elem.yScale}}
            zIndex={-getGlobalZFromLocalZ(elem.z, elem.y)}
        >
            <MapElementSelectionOutline
                isSelected={isSelected}
                isHovering={isHovering}
                sprite={sprite}
            />
            <pixiSprite
                anchor={0.5}
                x={0}
                y={0}
                texture={sprite}
                alpha={opacity}
                cursor={elem.properties.isLocked ? "default" : "pointer"}

                eventMode={!isColliderSelected &&
                !isEmbedded &&
                isVisible ? "static" : "none"}

                onPointerDown={(e: PointerEvent) => {
                    // Only allow left mouse button (right-clicks are for viewport controls)
                    if (e.button !== 0)
                        return;

                    e.stopPropagation();
                    e.preventDefault();

                    // Select the element
                    setSelectedID(props.elementID);

                    if (elem.properties.isLocked)
                        return;

                    // Start dragging the element if it's not locked
                    startDrag({
                        mouseX: e.clientX,
                        mouseY: e.clientY,
                        elementID: props.elementID,
                        target: containerRef.current!
                    });
                }}
                onGlobalPointerMove={(e: PointerEvent) => {
                    runDragMove({
                        mouseX: e.clientX,
                        mouseY: e.clientY,
                        elementID: props.elementID
                    });
                }}
                onPointerUp={() => {
                    runStopDrag();
                }}
                onPointerUpOutside={() => {
                    runStopDrag();
                }}
                onMouseEnter={() => {
                    if (!elem.properties.isLocked)
                        setIsHovering(true);
                }}
                onMouseLeave={() => {
                    setIsHovering(false);
                }}
            />

            {childElementIDs.map((id) => (
                <MapElement
                    key={id}
                    elementID={id}
                />
            ))}
        </pixiContainer>
    );
}