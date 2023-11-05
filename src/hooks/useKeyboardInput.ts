import { HotkeyConfig, useHotkeys } from "@blueprintjs/core";
import { useSetAtom } from "jotai";
import React from "react";
import { CAM_SPEED } from "../types/generic/Constants";
import generateGUID from "./utils/generateGUID";
import { camXAtom, camYAtom } from "./jotai/useCamera";
import useClipboard from "./jotai/useClipboard";
import { useAddElementAtMouse } from "./jotai/useElements";
import { useRedo, useUndo } from "./jotai/useHistory";
import { useSetSaved } from "./jotai/useIsSaved";
import { useMapValue } from "./jotai/useMap";
import { useRemoveElement, useSelectedElemValue, useSetSelectedElemID } from "./jotai/useSelectedElem";
import { useSetSettings } from "./jotai/useSettings";
import useToaster from "./useToaster";

export default function useKeyboardInput() {
    const { copyElement, pasteElement } = useClipboard();
    const map = useMapValue();
    const undo = useUndo();
    const redo = useRedo();
    const selectedElem = useSelectedElemValue();
    const addElementAtMouse = useAddElementAtMouse();
    const removeElement = useRemoveElement();
    const setSettings = useSetSettings();
    const setSelectedID = useSetSelectedElemID();
    const toaster = useToaster();
    const setCamX = useSetAtom(camXAtom);
    const setCamY = useSetAtom(camYAtom);
    const setIsSaved = useSetSaved();

    const saveMap = React.useCallback(() => {
        const mapJSON = JSON.stringify(map);
        const blob = new Blob([mapJSON], { type: "application/levelimposter.map" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = map.name + ".lim";
        link.click();
        setIsSaved(true);
    }, [map]);

    const duplicateElement = React.useCallback(() => {
        if (selectedElem) {
            const id = generateGUID();
            addElementAtMouse({
                ...selectedElem,
                id,
                properties: {
                    ...selectedElem.properties,
                    colliders: [
                        ...(selectedElem.properties.colliders || []),
                    ]
                }
            });
            setSelectedID(id);
        }
    }, [selectedElem, addElementAtMouse, setSelectedID]);

    const deleteElement = React.useCallback(() => {
        if (selectedElem) {
            removeElement(selectedElem.id);
        }
    }, [selectedElem, removeElement]);

    const hotkeys = React.useMemo<HotkeyConfig[]>(() => [
        {
            global: true,
            group: "Interface",
            label: "Enable Grid Snap",
            combo: "ctrl+g",
            description: "Enable grid snap",
            onKeyDown: () => {
                setSettings(s => {
                    toaster.info((s.isGridSnapEnabled ? "Disabled" : "Enabled") + " Grid Snap");
                    return { ...s, isGridSnapEnabled: !s.isGridSnapEnabled };
                });
            },
            preventDefault: true,
        },
        {
            global: true,
            group: "Interface",
            label: "Toggle Grid",
            combo: "ctrl+h",
            description: "Toggle grid",
            onKeyDown: () => {
                setSettings(s => {
                    toaster.info((s.isGridVisible ? "Disabled" : "Enabled") + " Grid");
                    return { ...s, isGridVisible: !s.isGridVisible, isAxisVisible: !s.isGridVisible };
                });
            },
            preventDefault: true,
        },
        {
            global: true,
            group: "Selection",
            label: "Copy",
            combo: "ctrl+c",
            description: "Copy selection",
            onKeyDown: () => {
                copyElement();
            },
            preventDefault: true,
        },
        {
            global: true,
            group: "Selection",
            label: "Paste",
            combo: "ctrl+v",
            description: "Paste selection",
            onKeyDown: async () => {
                pasteElement();
            },
            preventDefault: true,
        },
        {
            global: true,
            group: "Selection",
            label: "Cut",
            combo: "ctrl+x",
            description: "Cut selection",
            onKeyDown: () => {
                copyElement();
                deleteElement();
            },
            preventDefault: true,
        },
        {
            global: true,
            group: "Selection",
            label: "Duplicate",
            combo: "ctrl+d",
            description: "Duplicate selection",
            onKeyDown: () => {
                duplicateElement();
            },
            preventDefault: true,
        },
        {
            global: true,
            group: "Selection",
            label: "Delete",
            combo: "del",
            description: "Delete selection",
            onKeyDown: () => {
                deleteElement();
            },
            preventDefault: true,
        },
        {
            global: true,
            group: "Selection",
            label: "Delete (Mac)",
            combo: "backspace",
            description: "Delete selection",
            onKeyDown: () => {
                deleteElement();
            },
            preventDefault: true,
        },
        {
            global: true,
            group: "Map",
            label: "Save",
            combo: "ctrl+s",
            description: "Save map",
            onKeyDown: () => {
                saveMap();
            },
            preventDefault: true,
        },
        {
            global: true,
            group: "Map",
            label: "Undo",
            combo: "ctrl+z",
            description: "Undo",
            onKeyDown: () => {
                undo();
            },
            preventDefault: true,
        },
        {
            global: true,
            group: "Map",
            label: "Redo",
            combo: "ctrl+y",
            description: "Redo",
            onKeyDown: () => {
                redo();
            },
            preventDefault: true,
        },
        {
            global: true,
            group: "Camera",
            label: "Move Up",
            combo: "up",
            description: "Move camera up",
            onKeyDown: () => {
                console.log("move up", setCamY);
                setCamY(y => y + CAM_SPEED);
            },
            preventDefault: true,
        },
        {
            global: true,
            group: "Camera",
            label: "Move Down",
            combo: "down",
            description: "Move camera down",
            onKeyDown: () => {
                setCamY(y => y - CAM_SPEED);
            },
            preventDefault: true,
        },
        {
            global: true,
            group: "Camera",
            label: "Move Left",
            combo: "left",
            description: "Move camera left",
            onKeyDown: () => {
                setCamX(x => x + CAM_SPEED);
            },
            preventDefault: true,
        },
        {
            global: true,
            group: "Camera",
            label: "Move Right",
            combo: "right",
            description: "Move camera right",
            onKeyDown: () => {
                setCamX(x => x - CAM_SPEED);
            },
            preventDefault: true,
        }
    ], [toaster, setSettings, copyElement, pasteElement, deleteElement, duplicateElement, saveMap, undo, redo, setCamX, setCamY]);

    const { handleKeyDown, handleKeyUp } = useHotkeys(hotkeys);
    return { handleKeyDown, handleKeyUp };
}