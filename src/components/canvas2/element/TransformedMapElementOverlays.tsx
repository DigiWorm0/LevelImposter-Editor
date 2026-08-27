import {MaybeGUID} from "@/types/common/GUID";
import React from "react";
import useIsElementSelected from "../../../hooks/elements/useIsElementSelected";
import FloatingOverlay from "../transformedOverlays/FloatingOverlay";
import AnimationOverlay from "../transformedOverlays/AnimationOverlay";
import StarfieldOverlay from "../transformedOverlays/starfield/StarfieldOverlay";

interface TransformedMapElementOverlaysProps {
    elementID: MaybeGUID;
}

export default function TransformedMapElementOverlays(props: TransformedMapElementOverlaysProps) {
    const isSelected = useIsElementSelected(props.elementID);

    // Check if the element exists and has an ID
    if (!props.elementID)
        return null;

    // Apply local rotation and scale
    return (
        <pixiContainer zIndex={1000}>
            <AnimationOverlay elementID={props.elementID}/>
            {isSelected && <FloatingOverlay elementID={props.elementID}/>}
            {isSelected && <StarfieldOverlay elementID={props.elementID}/>}
        </pixiContainer>
    );
}