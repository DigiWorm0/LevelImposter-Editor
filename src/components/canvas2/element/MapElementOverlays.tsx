import {MaybeGUID} from "../../../types/generic/GUID";
import RoomOverlay from "../overlays/RoomOverlay";
import ConsoleOverlay from "../overlays/ConsoleOverlay";
import CameraOverlay from "../overlays/CameraOverlay";
import DisplayOverlay from "../overlays/DisplayOverlay";
import LadderOverlay from "../overlays/LadderOverlay";
import ConnectionOverlay from "../overlays/ConnectionOverlay";
import SporeOverlay from "../overlays/SporeOverlay";
import React from "react";
import useIsElementSelected from "../../../hooks/elements/useIsElementSelected";
import useMapElementRef from "../../../hooks/canvas/useMapElementRef";
import useViewport from "../../../hooks/canvas/useViewport";
import PlayerZOverlay from "../overlays/PlayerZOverlay";
import PlatformOverlay from "../overlays/PlatformOverlay";
import SpawnOverlay from "../overlays/SpawnOverlay";
import MinimapOverlay from "../overlays/MinimapOverlay";
import FloatingOverlay from "../overlays/FloatingOverlay";
import ColliderOverlay from "../overlays/ColliderOverlay";
import AnimationOverlay from "../overlays/AnimationOverlay";
import StarfieldOverlay from "../overlays/starfield/StarfieldOverlay";

interface MapElementOverlaysProps {
    elementID: MaybeGUID;
}

export default function MapElementOverlays(props: MapElementOverlaysProps) {
    const isSelected = useIsElementSelected(props.elementID);
    const elementRef = useMapElementRef(props.elementID);
    const viewport = useViewport();

    // Check if the element exists and has an ID
    if (!props.elementID)
        return null;
    if (!elementRef.current || !viewport)
        return null;

    const viewportPosition = viewport.getGlobalPosition();
    const elementPosition = elementRef.current.getGlobalPosition();

    // Apply local rotation and scale
    return (
        <pixiContainer
            zIndex={1000}
            x={(elementPosition.x - viewportPosition.x) / viewport.scale.x}
            y={(elementPosition.y - viewportPosition.y) / viewport.scale.y}
        >
            <RoomOverlay elementID={props.elementID}/>
            <AnimationOverlay elementID={props.elementID}/>
            {isSelected && <ConsoleOverlay elementID={props.elementID}/>}
            {isSelected && <CameraOverlay elementID={props.elementID}/>}
            {isSelected && <DisplayOverlay elementID={props.elementID}/>}
            {isSelected && <LadderOverlay elementID={props.elementID}/>}
            {isSelected && <PlatformOverlay elementID={props.elementID}/>}
            {isSelected && <ConnectionOverlay elementID={props.elementID}/>}
            {isSelected && <SporeOverlay elementID={props.elementID}/>}
            {isSelected && <PlayerZOverlay elementID={props.elementID}/>}
            {isSelected && <SpawnOverlay elementID={props.elementID}/>}
            {isSelected && <MinimapOverlay elementID={props.elementID}/>}
            {isSelected && <FloatingOverlay elementID={props.elementID}/>}
            {isSelected && <ColliderOverlay elementID={props.elementID}/>}
            {isSelected && <StarfieldOverlay elementID={props.elementID}/>}
        </pixiContainer>
    );
}