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
import useSelectElementID from "../../../hooks/selection/useSelectElementID";
import useMapElementRef from "../../../hooks/canvas/useMapElementRef";
import useIsElementSelected from "../../../hooks/elements/useIsElementSelected";
import useElementSprite from "../../../hooks/sprites/useElementSprite";
import Draggable from "../common/Draggable";
import {useSettingsValue} from "../../../hooks/useSettings";
import {getSelectOperationFromEvent} from "../../../utils/canvas/getSelectOperationFromEvent";
import mapElementEventEmitter from "../../../utils/canvas/mapElementEventEmitter";
import TransformedMapElementOverlays from "./TransformedMapElementOverlays";
import Spinner from "../common/Spinner";
import MapElementAnimatedSprite from "./MapElementAnimatedSprite";

export interface MapElementProps {
    elementID: MaybeGUID;
}

export default function MapElement(props: MapElementProps) {
    const {isGridSnapEnabled, gridSnapResolution} = useSettingsValue();
    const childElementIDs = useElementChildIDs(props.elementID);
    const isSelected = useIsElementSelected(props.elementID);
    const [element, setElement] = useElement(props.elementID);
    const sprite = useElementSprite(props.elementID);
    const opacity = useElementOpacity(props.elementID);
    const selectElementID = useSelectElementID();
    const containerRef = useMapElementRef(props.elementID);

    const isColliderSelected = useIsSelectedCollider();
    const isEmbedded = useEmbed();
    const isVisible = element?.properties.isVisible ?? true;

    const isListening = !isColliderSelected && !isEmbedded && isVisible;
    const isLocked = !isListening || element?.properties.isLocked;

    // Check if sprite is loaded
    if (!element || !props.elementID)
        return null;

    return (
        <Draggable
            id={props.elementID}
            x={element.x * UNITY_SCALE}
            y={-element.y * UNITY_SCALE}
            zIndex={-getGlobalZFromLocalZ(element.z, element.y)}
            xScale={element.xScale}
            yScale={element.yScale}
            rotation={-degToRad(element.rotation)}

            gridSnapResolution={isGridSnapEnabled ? gridSnapResolution * UNITY_SCALE : undefined}
            selected={isSelected}
            draggable={!isLocked}

            onClick={(e) => {
                selectElementID({
                    id: element.id,
                    operation: getSelectOperationFromEvent(e.pointerEvent)
                });
            }}

            onDragStart={(e) => {
                const isTarget = e.targetID === props.elementID;
                if (!isTarget)
                    return;
                selectElementID({
                    id: element.id,
                    operation: getSelectOperationFromEvent(e.pointerEvent, isSelected, true)
                });
            }}

            onDragEnd={(e) => {
                if (isLocked)
                    return;
                setElement({...element, x: e.x / UNITY_SCALE, y: -e.y / UNITY_SCALE});
            }}

            nonInteractableChildren={isVisible && childElementIDs.map(id => <MapElement key={id} elementID={id}/>)}
        >
            <pixiContainer ref={containerRef}>
                {sprite && (
                    <MapElementAnimatedSprite
                        elementID={props.elementID}
                        shouldAnimate={isSelected}

                        anchor={0.5}
                        x={0}
                        y={0}
                        alpha={opacity}
                        cursor={element.properties.isLocked ? "default" : "pointer"}

                        eventMode={isListening ? "static" : "none"}
                        onMouseEnter={() => mapElementEventEmitter.emit("mouseOver", element.id)}
                        onMouseLeave={() => mapElementEventEmitter.emit("mouseOut", element.id)}

                        cullable
                    />
                )}
                {!sprite && <Spinner/>}

                <TransformedMapElementOverlays elementID={props.elementID}/>
            </pixiContainer>
        </Draggable>
    );
}