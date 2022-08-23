import { HotkeyConfig, useHotkeys } from "@blueprintjs/core";
import React from "react";
import { MaybeLIElement } from "../types/li/LIElement";
import generateGUID from "./generateGUID";
import { useAddElementAtMouse, useRemoveElement } from "./jotai/useElement";
import { useSaveHistory, useUndo } from "./jotai/useHistory";
import { useMapValue } from "./jotai/useMap";
import { useSelectedElemValue, useSetSelectedElemID } from "./jotai/useSelectedElem";
import { useSetSettings } from "./jotai/useSettings";
import useToaster from "./useToaster";

export default function useCombos() {
    const map = useMapValue();
    const undo = useUndo();
    const selectedElem = useSelectedElemValue();
    const addElement = useAddElementAtMouse();
    const removeElement = useRemoveElement();
    const setSettings = useSetSettings();
    const setSelectedID = useSetSelectedElemID();
    const toaster = useToaster();
    const saveHistory = useSaveHistory();

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
                const elemData = JSON.stringify(selectedElem);
                navigator.clipboard.writeText(elemData);
            },
            preventDefault: true,
        },
        {
            group: "Selection",
            label: "Paste",
            combo: "ctrl+v",
            description: "Paste selection",
            onKeyDown: async () => {
                if (!window.isSecureContext) {
                    toaster.danger("Paste is not allowed in insecure context");
                    return;
                }
                if (!navigator.clipboard.read) {
                    toaster.danger("Firefox does not support pasting for some reason", "https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/read");
                    return;
                }

                const clipboard = await navigator.clipboard.readText()
                const elemData = JSON.parse(clipboard) as MaybeLIElement;
                if (elemData) {
                    saveHistory();
                    const id = generateGUID();
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
            },
            preventDefault: true,
        },
        {
            group: "Selection",
            label: "Duplicate",
            combo: "ctrl+d",
            description: "Duplicate selection",
            onKeyDown: () => {
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
            },
            preventDefault: true,
        },
        {
            group: "Selection",
            label: "Delete",
            combo: "del",
            description: "Delete selection",
            onKeyDown: () => {
                if (selectedElem) {
                    toaster.danger("Deleted " + selectedElem.name);
                    saveHistory();
                    removeElement(selectedElem.id);
                }
            },
            preventDefault: true,
        },
        {
            group: "Map",
            label: "Save",
            combo: "ctrl+s",
            description: "Save map",
            onKeyDown: () => {
                const mapJSON = JSON.stringify(map);
                const blob = new Blob([mapJSON], { type: "application/levelimposter.map" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = map.name + ".lim";
                link.click();
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
    ], [selectedElem, map, addElement, removeElement, setSettings, setSelectedID]);
    const { handleKeyDown, handleKeyUp } = useHotkeys(hotkeys);

    return { handleKeyDown, handleKeyUp };
}