import { HotkeyConfig, useHotkeys } from "@blueprintjs/core";
import React from "react";
import generateGUID from "./utils/generateGUID";
import useClipboard from "./jotai/useClipboard";
import { useAddElementAtMouse } from "./jotai/useElements";
import { useRedo, useUndo } from "./jotai/useHistory";
import { useRemoveElement, useSelectedElemValue, useSetSelectedElemID } from "./jotai/useSelectedElem";
import { useSetSettings } from "./jotai/useSettings";
import useToaster from "./useToaster";
import useSaveMap from "./useSaveMap";

export default function useKeyboardInput() {
    const { copyElement, pasteElement } = useClipboard();
    const undo = useUndo();
    const redo = useRedo();
    const selectedElem = useSelectedElemValue();
    const addElementAtMouse = useAddElementAtMouse();
    const removeElement = useRemoveElement();
    const setSettings = useSetSettings();
    const setSelectedID = useSetSelectedElemID();
    const toaster = useToaster();
    const saveMap = useSaveMap();


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
        }
    ], [toaster, setSettings, copyElement, pasteElement, deleteElement, duplicateElement, saveMap, undo, redo]);

    const { handleKeyDown, handleKeyUp } = useHotkeys(hotkeys);
    return { handleKeyDown, handleKeyUp };
}