import {MaybeGUID} from "../../../types/common/GUID";
import RoomOverlay from "../overlays/RoomOverlay";
import ConsoleOverlay from "../overlays/ConsoleOverlay";
import CameraOverlay from "../overlays/CameraOverlay";
import DisplayOverlay from "../overlays/DisplayOverlay";
import LadderOverlay from "../overlays/LadderOverlay";
import ConnectionsOverlay from "../overlays/connections/ConnectionsOverlay";
import SporeOverlay from "../overlays/SporeOverlay";
import React from "react";
import useIsElementSelected from "../../../hooks/elements/useIsElementSelected";
import useMapElementRef from "../../../hooks/canvas/useMapElementRef";
import PlayerZOverlay from "../overlays/PlayerZOverlay";
import PlatformPathOverlay from "../overlays/PlatformPathOverlay";
import SpawnOverlay from "../overlays/SpawnOverlay";
import MinimapOverlay from "../overlays/MinimapOverlay";
import FloatingPathOverlay from "../overlays/FloatingPathOverlay";
import ColliderOverlay from "../overlays/colliders/ColliderOverlay";
import ColliderEditorOverlay from "../overlays/colliders/ColliderEditorOverlay";
import {useTick} from "@pixi/react";
import {Container} from "pixi.js";
import SelectionOutlineOverlay from "../overlays/SelectionOutlineOverlay";
import useScreenToWorld from "../../../hooks/canvas/useScreenToWorld";
import StarfieldAreaOverlay from "../overlays/StarfieldAreaOverlay";

interface MapElementOverlaysProps {
    elementID: MaybeGUID;
}

export default function MapElementOverlays(props: MapElementOverlaysProps) {
    const isSelected = useIsElementSelected(props.elementID);
    const elementRef = useMapElementRef(props.elementID);
    const containerRef = React.useRef<Container>(null);
    const screenToWorld = useScreenToWorld();

    useTick(() => {
        if (!containerRef.current ||
            !elementRef.current)
            return;

        // Get the screen position of the map element
        const elementPosition = elementRef.current.getGlobalPosition();

        // Convert the element position from screen to world coordinates
        const worldPosition = screenToWorld(elementPosition);

        // Copy the position from the element to the container
        // This ensures that overlays match position, but not rotation or scale
        containerRef.current.position.set(worldPosition.x, worldPosition.y);
    });

    // Check if the element exists and has an ID
    if (!props.elementID)
        return null;

    // Apply local rotation and scale
    return (
        <pixiContainer
            ref={containerRef}
            zIndex={1000}
        >

            {isSelected && <ConsoleOverlay elementID={props.elementID}/>}
            {isSelected && <CameraOverlay elementID={props.elementID}/>}
            {isSelected && <DisplayOverlay elementID={props.elementID}/>}
            {isSelected && <LadderOverlay elementID={props.elementID}/>}
            {isSelected && <PlatformPathOverlay elementID={props.elementID}/>}
            {isSelected && <ConnectionsOverlay elementID={props.elementID}/>}
            {isSelected && <SporeOverlay elementID={props.elementID}/>}
            {isSelected && <PlayerZOverlay elementID={props.elementID}/>}
            {isSelected && <SpawnOverlay elementID={props.elementID}/>}
            {isSelected && <MinimapOverlay elementID={props.elementID}/>}
            {isSelected && <FloatingPathOverlay elementID={props.elementID}/>}
            {isSelected && <ColliderOverlay elementID={props.elementID}/>}
            {isSelected && <StarfieldAreaOverlay elementID={props.elementID}/>}

            <RoomOverlay elementID={props.elementID}/>
            <SelectionOutlineOverlay elementID={props.elementID}/>

            {isSelected && <ColliderEditorOverlay/>}
        </pixiContainer>
    );
}