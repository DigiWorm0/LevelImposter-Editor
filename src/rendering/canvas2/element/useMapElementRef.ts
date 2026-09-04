import GUID, {MaybeGUID} from "@shared/types/GUID";
import React from "react";
import {Container} from "pixi.js";

const elementRefs: Record<GUID, React.RefObject<Container | null>> = {};

export default function useMapElementRef(elementID: MaybeGUID): React.RefObject<Container | null> {
    // If no elementID is provided, return a ref to null
    if (elementID === undefined || elementID === null)
        return React.createRef<Container | null>();

    // Create a ref for the element if it doesn't exist
    if (!elementRefs[elementID])
        elementRefs[elementID] = React.createRef<Container>();

    // Return the ref for the element
    return elementRefs[elementID];
}

export function getMapElementRef(elementID: MaybeGUID): React.RefObject<Container | null> {
    // If no elementID is provided, return a ref to null
    if (elementID === undefined || elementID === null)
        return React.createRef<Container | null>();

    // Return the ref for the element, or a new ref if it doesn't exist
    return elementRefs[elementID] || (elementRefs[elementID] = React.createRef<Container>());
}