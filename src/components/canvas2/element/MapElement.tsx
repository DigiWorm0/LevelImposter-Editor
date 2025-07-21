import React from "react";
import {MaybeGUID} from "../../../types/generic/GUID";
import useElement from "../../../hooks/elements/useElements";
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
import MapElementSelectionOutline from "./MapElementSelectionOutline";
import useSelectElementID from "../../../hooks/selection/useSelectElementID";
import useMapElementRef from "../../../hooks/canvas/useMapElementRef";
import useIsElementSelected from "../../../hooks/elements/useIsElementSelected";
import useElementSprite from "../../../hooks/canvas/sprite/useElementSprite";

export interface MapElementProps {
    elementID: MaybeGUID;
}


export default function MapElement(props: MapElementProps) {
    const [isHovering, setIsHovering] = React.useState(false);
    const childElementIDs = useElementChildIDs(props.elementID);
    const isSelected = useIsElementSelected(props.elementID);
    const [elem] = useElement(props.elementID);
    const sprite = useElementSprite(props.elementID);
    const opacity = useElementOpacity(props.elementID);
    const selectElementID = useSelectElementID();
    const containerRef = useMapElementRef(props.elementID);

    const startDrag = useStartDrag();
    const runDragMove = useDragMove();
    const runStopDrag = useStopDrag();

    const isColliderSelected = useIsSelectedCollider();
    const isEmbedded = useEmbed();
    const isVisible = elem?.properties.isVisible ?? true;

    // Check if sprite is loaded
    if (!sprite || sprite.destroyed)
        return null;
    if (!elem || !props.elementID)
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
                    // Only allow left mouse button (right-clicks are for viewport controls only)
                    if (e.button !== 0)
                        return;

                    // Only allow mouse pointer type (touch/pens are for viewport controls only)
                    if (e.pointerType !== "mouse")
                        return;

                    // Prevent default behavior and stop propagation
                    e.stopPropagation();
                    e.preventDefault();

                    // Start dragging the element if it's not locked
                    startDrag({
                        elementID: elem.id,
                        mouseX: e.clientX,
                        mouseY: e.clientY,
                        onDragStart: () => {
                            selectElementID({
                                id: props.elementID,
                                operation: e.ctrlKey || e.metaKey || e.shiftKey || isSelected ? "add" : "set"
                            });
                        },
                        onClick: () => {
                            selectElementID({
                                id: props.elementID,
                                operation: e.ctrlKey || e.metaKey ? "toggle" :
                                    e.shiftKey ? "add" : "set"
                            });
                        }
                    });
                }}
                onGlobalPointerMove={(e: PointerEvent) => {
                    runDragMove({mouseX: e.clientX, mouseY: e.clientY});
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

            {/*<MapElementOverlays*/}
            {/*    elementID={props.elementID}*/}
            {/*/>*/}
        </pixiContainer>
    );
}