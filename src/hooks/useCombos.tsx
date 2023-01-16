import { HotkeyConfig, useHotkeys } from "@blueprintjs/core";
import { useSetAtom } from "jotai";
import React from "react";
import { useTranslation } from "react-i18next";
import { CAM_SPEED } from "../types/generic/Constants";
import GUID, { MaybeGUID } from "../types/generic/GUID";
import LIClipboard from "../types/li/LIClipboard";
import LIElement from "../types/li/LIElement";
import generateGUID from "./generateGUID";
import { camXAtom, camYAtom } from "./jotai/useCamera";
import { useAddElement, useAddElementAtMouse } from "./jotai/useElements";
import { useRedo, useUndo } from "./jotai/useHistory";
import { useSetSaved } from "./jotai/useIsSaved";
import { useMapValue } from "./jotai/useMap";
import { useRemoveElement, useSelectedElemValue, useSetSelectedElemID } from "./jotai/useSelectedElem";
import { useSetSettings } from "./jotai/useSettings";
import useToaster from "./useToaster";

export default function useCombos() {
    const { t } = useTranslation();
    const [localClipboard, setLocalClipboard] = React.useState<string | undefined>(undefined);
    const map = useMapValue();
    const undo = useUndo();
    const redo = useRedo();
    const selectedElem = useSelectedElemValue();
    const addElementAtMouse = useAddElementAtMouse();
    const addElement = useAddElement();
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

    const copyElement = React.useCallback(() => {
        if (!selectedElem)
            return;
        const clipboardData: LIClipboard = {
            data: [selectedElem]
        };

        const addChildren = (elem: LIElement) => {
            map.elements.forEach(e => {
                if (e.parentID === elem.id) {
                    clipboardData.data.push(e);
                    addChildren(e);
                }
            });
        };
        addChildren(selectedElem);

        const clipboardJSON = JSON.stringify(clipboardData);
        setLocalClipboard(clipboardJSON);
        if (navigator.clipboard.writeText)
            navigator.clipboard.writeText(clipboardJSON);
    }, [selectedElem]);

    const pasteElement = React.useCallback(async () => {
        let clipboard = localClipboard;
        if (!clipboard) {
            if (!window.isSecureContext) {
                toaster.danger(t("edit.errorInsecureContext"));
                return;
            }
            if (!navigator.clipboard.read) {
                toaster.danger(t("edit.errorExternalClipboard"), "https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/read");
                return;
            }
            clipboard = await navigator.clipboard.readText();
        }
        if (!clipboard) {
            toaster.danger(t("edit.errorNoClipboard"));
            return;
        }
        const clipboardData = JSON.parse(clipboard) as LIClipboard | undefined;
        if (clipboardData) {
            const elements = clipboardData.data as LIElement[];
            const newIDs = new Map<GUID, GUID>();
            const getID = (id: MaybeGUID) => {
                if (id === undefined)
                    return undefined;
                if (newIDs.has(id))
                    return newIDs.get(id);
                if (elements.find(e => e.id === id)) {
                    const newID = generateGUID();
                    newIDs.set(id, newID);
                    return newID;
                }
                return id;
            };

            elements.forEach((elem, index) => {
                const newID = generateGUID();
                const newName = elem.name + " (copy)";
                newIDs.set(elem.id, newID);
                addElement({
                    ...elem,
                    id: newID,
                    name: newName,
                    parentID: getID(elem.parentID),
                    properties: {
                        ...elem.properties,
                        parent: getID(elem.properties.parent),
                        leftVent: getID(elem.properties.leftVent),
                        rightVent: getID(elem.properties.rightVent),
                        middleVent: getID(elem.properties.middleVent),
                        teleporter: getID(elem.properties.teleporter),

                        colliders: [
                            ...(elem.properties.colliders || []),
                        ]
                    }
                });
                if (index == 0)
                    setSelectedID(newID);
            });
        }
    }, [localClipboard, addElement, setSelectedID]);

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
    ], [copyElement, duplicateElement, pasteElement, deleteElement, saveMap, undo, redo]);

    const { handleKeyDown, handleKeyUp } = useHotkeys(hotkeys);
    return { handleKeyDown, handleKeyUp };
}