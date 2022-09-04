import { HotkeyConfig, useHotkeys } from "@blueprintjs/core";
import React from "react";
import LIClipboard from "../types/li/LIClipboard";
import LIElement from "../types/li/LIElement";
import generateGUID from "./generateGUID";
import { useAddElementAtMouse, useRemoveElement } from "./jotai/useElement";
import { useSaveHistory, useUndo } from "./jotai/useHistory";
import { useMapValue } from "./jotai/useMap";
import { useSelectedElemValue, useSetSelectedElemID } from "./jotai/useSelectedElem";
import { useSetSettings } from "./jotai/useSettings";
import useToaster from "./useToaster";

export default function useCombos() {
    const [localClipboard, setLocalClipboard] = React.useState<string | undefined>(undefined);
    const map = useMapValue();
    const undo = useUndo();
    const selectedElem = useSelectedElemValue();
    const addElement = useAddElementAtMouse();
    const removeElement = useRemoveElement();
    const setSettings = useSetSettings();
    const setSelectedID = useSetSelectedElemID();
    const toaster = useToaster();
    const saveHistory = useSaveHistory();

    const saveMap = React.useCallback(() => {
        const mapJSON = JSON.stringify(map);
        const blob = new Blob([mapJSON], { type: "application/levelimposter.map" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = map.name + ".lim";
        link.click();
    }, [map]);

    const copyElement = React.useCallback(() => {
        if (!selectedElem)
            return;
        const clipboardData: LIClipboard = {
            type: "single element",
            data: selectedElem
        };
        const clipboardJSON = JSON.stringify(clipboardData);
        setLocalClipboard(clipboardJSON);
        if (navigator.clipboard.writeText)
            navigator.clipboard.writeText(clipboardJSON);
    }, [selectedElem]);

    const pasteElement = React.useCallback(async () => {
        let clipboard = localClipboard;
        if (!clipboard) {
            if (!window.isSecureContext) {
                toaster.danger("Paste is not allowed in insecure context");
                return;
            }
            if (!navigator.clipboard.read) {
                toaster.danger("External pasting is unsupported by Firefox", "https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/read");
                return;
            }
            clipboard = await navigator.clipboard.readText();
        }
        if (!clipboard) {
            toaster.danger("Nothing to paste");
            return;
        }
        const clipboardData = JSON.parse(clipboard) as LIClipboard | undefined;
        if (clipboardData) {
            if (clipboardData.type === "single element") {
                saveHistory();
                const id = generateGUID();
                const elemData = clipboardData.data as LIElement;
                addElement({
                    ...elemData,
                    id,
                    properties: {
                        ...elemData.properties,
                        colliders: [
                            ...(elemData.properties.colliders || []),
                        ]
                    }
                });
                setSelectedID(id);
            }
            else if (clipboardData.type === "multiple elements") {
                saveHistory();
                const elements = clipboardData.data as LIElement[];
                elements.forEach(elem => {
                    const id = generateGUID();
                    addElement({
                        ...elem,
                        id,
                        properties: {
                            ...elem.properties,
                            colliders: [
                                ...(elem.properties.colliders || []),
                            ]
                        }
                    });
                });
            }
        }
    }, [localClipboard, addElement, setSelectedID, saveHistory]);

    const duplicateElement = React.useCallback(() => {
        if (selectedElem) {
            const id = generateGUID();
            saveHistory();
            addElement({
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
    }, [selectedElem, addElement, saveHistory, setSelectedID]);

    const deleteElement = React.useCallback(() => {
        if (selectedElem) {
            saveHistory();
            removeElement(selectedElem.id);
        }
    }, [selectedElem, removeElement, saveHistory]);

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
            group: "Map",
            label: "Undo",
            combo: "ctrl+z",
            description: "Undo",
            onKeyDown: () => {
                undo();
            },
            preventDefault: true,
        }
    ], [copyElement, duplicateElement, pasteElement, deleteElement, saveMap, undo]);
    const { handleKeyDown, handleKeyUp } = useHotkeys(hotkeys);

    return { handleKeyDown, handleKeyUp };
}