import React from "react";
import {MaybeGUID} from "../../../types/common/GUID";
import useElement from "../../../hooks/elements/useElements";
import {useElementChildIDs} from "../../../hooks/elements/useElementChildIDs";
import getGlobalZFromLocalZ from "../../../utils/canvas/getGlobalZFromLocalZ";
import {UNITY_SCALE} from "../../../types/amongus/Constants";
import useElementOpacity from "../../../hooks/canvas/useElementOpacity";
import {useIsSelectedCollider} from "../../../hooks/elements/colliders/useSelectedCollider";
import useEmbed from "../../../hooks/embed/useEmbed";
import degToRad from "../../../utils/common/degToRad";
import MapElementSelectionOutline from "./MapElementSelectionOutline";
import useSelectElementID from "../../../hooks/selection/useSelectElementID";
import useMapElementRef from "../../../hooks/canvas/useMapElementRef";
import useIsElementSelected from "../../../hooks/elements/useIsElementSelected";
import useElementSprite from "../../../hooks/canvas/sprite/useElementSprite";
import Draggable from "../common/Draggable";
import {useSettingsValue} from "../../../hooks/useSettings";
import {mapElementsRenderLayerRefAtom} from "./MapElementsRenderLayer";
import {useAtomValue} from "jotai";

export interface MapElementProps {
    elementID: MaybeGUID;
}

function getSelectOperationFromEvent(e: PointerEvent) {
    if (e.metaKey || e.ctrlKey)
        return "toggle";
    if (e.shiftKey)
        return "add";
    return "set";
}

export default function MapElement(props: MapElementProps) {
    const {isGridSnapEnabled, gridSnapResolution} = useSettingsValue();
    const [isHovering, setIsHovering] = React.useState(false);
    const childElementIDs = useElementChildIDs(props.elementID);
    const isSelected = useIsElementSelected(props.elementID);
    const [element, setElement] = useElement(props.elementID);
    const sprite = useElementSprite(props.elementID);
    const opacity = useElementOpacity(props.elementID);
    const selectElementID = useSelectElementID();
    const containerRef = useMapElementRef(props.elementID);
    const mapElementsRenderLayerRef = useAtomValue(mapElementsRenderLayerRefAtom);

    const isColliderSelected = useIsSelectedCollider();
    const isEmbedded = useEmbed();
    const isVisible = element?.properties.isVisible ?? true;

    const isListening = !isColliderSelected && !isEmbedded && isVisible;
    const isLocked = !isListening || element?.properties.isLocked;

    React.useEffect(() => {
        console.log(props.elementID, containerRef.current, mapElementsRenderLayerRef);

        const container = containerRef.current;
        if (!container)
            return () => {
            };

        mapElementsRenderLayerRef?.attach(container);

        return () => {
            mapElementsRenderLayerRef?.detach(container);
        };
    }, [containerRef, mapElementsRenderLayerRef]);

    // Check if sprite is loaded
    if (!sprite || sprite.destroyed)
        return null;
    if (!element || !props.elementID)
        return null;

    return (
        <Draggable
            id={props.elementID}
            x={element.x * UNITY_SCALE}
            y={-element.y * UNITY_SCALE}

            gridSnapResolution={isGridSnapEnabled ? gridSnapResolution * UNITY_SCALE : undefined}
            selected={isSelected}
            draggable={!isLocked}

            onClick={(e) => {
                selectElementID({
                    id: element.id,
                    operation: getSelectOperationFromEvent(e)   // toggle, add, set, etc.
                });
            }}

            onDragStart={(e) => {
                const isTarget = e.targetID === props.elementID;
                if (!isTarget)
                    return;
                selectElementID({
                    id: element.id,
                    operation:
                        e.pointerEvent?.metaKey ||
                        e.pointerEvent?.ctrlKey ||
                        e.pointerEvent?.shiftKey ||
                        isSelected ? "add" : "set"
                });
            }}
            // onDragMove={(e) => {
            // }}
            onDragEnd={(e) => setElement({...element, x: e.x / UNITY_SCALE, y: -e.y / UNITY_SCALE})}
        >
            <pixiContainer
                ref={containerRef}
                rotation={-degToRad(element.rotation)}
                scale={{x: element.xScale, y: element.yScale}}
                zIndex={-getGlobalZFromLocalZ(element.z, element.y)}
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
                    cursor={element.properties.isLocked ? "default" : "pointer"}

                    eventMode={isListening ? "static" : "none"}
                    onMouseEnter={() => {
                        if (!element.properties.isLocked)
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
        </Draggable>
    );
}