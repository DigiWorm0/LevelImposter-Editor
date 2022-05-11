import EventEmitter from "eventemitter3";
import React from "react";
import SelectRenderer from "../graphics/renderers/SelectRenderer";
import LIElement from "../types/LIElement";

const eventEmitter = new EventEmitter();
const DEFAULT_KEY = "default";
let selectedElemIDs: string[] = [];

/**
 * Acts as a react hook for selected element ids
 * @returns A react hook for selected element ids
 */
export default function useSelectedElemIDs(): [string[], (elemIDs: string[]) => void] {
    const [version, setVersion] = React.useState(0);
    const [selectedElems, setSelectedElems] = React.useState([] as string[]);

    // Get Data
    React.useEffect(() => {
        setSelectedElems(getSelectedElemIDs());
    }, [version]);

    // Listen for changes
    React.useEffect(() => {
        const handleDataChange = () => {
            setVersion(v => v + 1);
        }

        eventEmitter.addListener(DEFAULT_KEY, handleDataChange);
        return () => {
            eventEmitter.removeListener(DEFAULT_KEY, handleDataChange);
        };
    }, [setVersion]);

    return [selectedElems, setSelectedElems];
}

/**
 * Gets all selected IDs
 * @returns All selected IDs
 */
export function getSelectedElemIDs(): string[] {
    return selectedElemIDs;
}

/**
 * Sets the selected element IDs
 * @param elems - The element IDs to set
 */
export function setSelectedElemIDs(elems: string[]): void {
    selectedElemIDs = elems;
    eventEmitter.emit(DEFAULT_KEY);
}