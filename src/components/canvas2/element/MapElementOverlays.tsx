import {MaybeGUID} from "../../../types/common/GUID";
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
import ColliderOverlay from "../overlays/colliders/ColliderOverlay";
import AnimationOverlay from "../overlays/AnimationOverlay";
import StarfieldOverlay from "../overlays/starfield/StarfieldOverlay";
import ColliderEditorOverlay from "../overlays/colliders/ColliderEditorOverlay";
import {useTick} from "@pixi/react";
import {Container} from "pixi.js";
import SelectionOutlineOverlay from "../overlays/SelectionOutlineOverlay";

interface MapElementOverlaysProps {
    elementID: MaybeGUID;
}

export default function MapElementOverlays(props: MapElementOverlaysProps) {
    const isSelected = useIsElementSelected(props.elementID);
    const viewport = useViewport();
    const elementRef = useMapElementRef(props.elementID);
    const containerRef = React.useRef<Container>(null);

    useTick(() => {
        if (!containerRef.current ||
            !elementRef.current ||
            !viewport)
            return;

        // Get the global position of the viewport and the map element
        const viewportPosition = viewport.getGlobalPosition();
        const elementPosition = elementRef.current.getGlobalPosition();

        // Copy the position from the element to the container
        // This ensures that overlays match position, but not rotation or scale
        containerRef.current.position.set(
            (elementPosition.x - viewportPosition.x) / viewport.scale.x,
            (elementPosition.y - viewportPosition.y) / viewport.scale.y);
    });

    // Check if the element exists and has an ID
    if (!props.elementID)
        return null;

    // const viewportPosition = viewport.getGlobalPosition();
    // const elementPosition = elementRef.current.getGlobalPosition();

    // Apply local rotation and scale
    return (
        <pixiContainer
            ref={containerRef}
            zIndex={1000}
            // x={(elementPosition.x - viewportPosition.x) / viewport.scale.x}
            // y={(elementPosition.y - viewportPosition.y) / viewport.scale.y}
        >

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

            <RoomOverlay elementID={props.elementID}/>
            <AnimationOverlay elementID={props.elementID}/>
            <SelectionOutlineOverlay elementID={props.elementID}/>

            {isSelected && <ColliderEditorOverlay/>}
        </pixiContainer>
    );
}