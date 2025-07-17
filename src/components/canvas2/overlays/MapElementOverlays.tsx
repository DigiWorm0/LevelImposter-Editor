import {MaybeGUID} from "../../../types/generic/GUID";
import RoomOverlay from "./RoomOverlay";
import ConsoleOverlay from "./ConsoleOverlay";
import CameraOverlay from "./CameraOverlay";
import DisplayOverlay from "./DisplayOverlay";
import LadderOverlay from "./LadderOverlay";
import ConnectionOverlay from "./ConnectionOverlay";
import SporeOverlay from "./SporeOverlay";
import React from "react";
import useIsElementSelected from "../../../hooks/elements/useIsElementSelected";
import useMapElementRef from "../../../hooks/canvas/useMapElementRef";
import useViewport from "../../../hooks/canvas/useViewport";

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
            {isSelected && <ConsoleOverlay elementID={props.elementID}/>}
            {isSelected && <CameraOverlay elementID={props.elementID}/>}
            {isSelected && <DisplayOverlay elementID={props.elementID}/>}
            {isSelected && <LadderOverlay elementID={props.elementID}/>}
            {isSelected && <ConnectionOverlay elementID={props.elementID}/>}
            {isSelected && <SporeOverlay elementID={props.elementID}/>}
        </pixiContainer>
    )
}