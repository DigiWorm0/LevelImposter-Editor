import { HotkeyConfig, useHotkeys } from "@blueprintjs/core";
import React from "react";
import { MaybeLIElement } from "../types/li/LIElement";
import generateGUID from "./generateGUID";
import { useAddElementAtMouse, useRemoveElement } from "./jotai/useElement";
import { useSelectedElemValue, useSetSelectedElemID } from "./jotai/useSelectedElem";
import { useSetSettings } from "./jotai/useSettings";
import useToaster from "./useToaster";

export default function useCombos() {
    const [clipboard, setClipboard] = React.useState<MaybeLIElement>(undefined);
    const selectedElem = useSelectedElemValue();
    const addElement = useAddElementAtMouse();
    const removeElement = useRemoveElement();
    const setSettings = useSetSettings();
    const setSelectedID = useSetSelectedElemID();
    const toaster = useToaster();

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
                setClipboard(selectedElem);
            },
            preventDefault: true,
        },
        {
            group: "Selection",
            label: "Paste",
            combo: "ctrl+v",
            description: "Paste selection",
            onKeyDown: () => {
                if (clipboard) {
                    const id = generateGUID();
                    addElement({
                        ...clipboard,
                        id,
                        properties: {
                            ...clipboard.properties,
                            colliders: [
                                ...(clipboard.properties.colliders || []),
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
                    removeElement(selectedElem.id);
                }
            },
            preventDefault: true,
        }
    ], [clipboard, selectedElem, addElement, removeElement, setSettings, setSelectedID]);
    const { handleKeyDown, handleKeyUp } = useHotkeys(hotkeys);

    return { handleKeyDown, handleKeyUp };
}