import { useHotkeys } from "react-hotkeys-hook";
import { Options as HotkeysHookOptions } from "react-hotkeys-hook/dist/types";
import generateGUID from "../../utils/strings/generateGUID";
import useAddElementAtCamera from "../elements/useAddElementAtCamera";
import { useRemoveSelectedElement } from "../elements/useRemoveElement";
import { useSelectedElemValue, useSetSelectedElemID } from "../elements/useSelectedElem";
import useSaveMap from "../fileio/useSaveMap";
import { useRedo, useUndo } from "../map/history/useUndoRedo";
import useSettings from "../useSettings";
import useToaster from "../useToaster";
import useCopyToClipboard from "./useCopyToClipboard";
import usePasteFromClipboard from "./usePasteFromClipboard";

export enum Scope {
    Canvas = "Canvas"
}

export default function useHotkeysHandler() {
    const copyElement = useCopyToClipboard();
    const pasteElement = usePasteFromClipboard();
    const undo = useUndo();
    const redo = useRedo();
    const selectedElem = useSelectedElemValue();
    const addElementAtMouse = useAddElementAtCamera();
    const removeSelectedElement = useRemoveSelectedElement();
    const [settings, setSettings] = useSettings();
    const setSelectedID = useSetSelectedElemID();
    const toaster = useToaster();
    const saveMap = useSaveMap();

    // Options
    const options: HotkeysHookOptions = { scopes: [Scope.Canvas], preventDefault: true };

    // Grid Snap
    useHotkeys("ctrl+g", () => {
        toaster.info((settings.isGridSnapEnabled ? "Disabled" : "Enabled") + " Grid Snap");
        setSettings({
            ...settings,
            isGridSnapEnabled: !settings.isGridSnapEnabled
        });
    }, options, [toaster, settings, setSettings]);

    // Toggle Grid
    useHotkeys("ctrl+h", () => {
        toaster.info((settings.isGridVisible ? "Disabled" : "Enabled") + " Grid");
        setSettings({
            ...settings,
            isGridVisible: !settings.isGridVisible
        });
    }, options, [toaster, settings, setSettings]);

    // Clipboard
    useHotkeys("ctrl+c", copyElement, options, [copyElement]);
    useHotkeys("ctrl+v", pasteElement, options, [pasteElement]);
    useHotkeys("ctrl+x", () => {
        copyElement();
        removeSelectedElement();
    }, options, [copyElement, removeSelectedElement]);

    // Duplicate
    useHotkeys("ctrl+d", () => {
        if (!selectedElem)
            return;
        const id = generateGUID();
        const newElem = JSON.parse(JSON.stringify(selectedElem));
        addElementAtMouse({ ...newElem, id });
        setSelectedID(id);
    }, options, [selectedElem, addElementAtMouse, setSelectedID]);

    // Delete
    useHotkeys("delete", removeSelectedElement, options, [removeSelectedElement]);
    useHotkeys("backspace", removeSelectedElement, options, [removeSelectedElement]);

    // Save
    useHotkeys("ctrl+s", saveMap, options, [saveMap]);

    // Undo/Redo
    useHotkeys("ctrl+z", undo, options, [undo]);
    useHotkeys("ctrl+y", redo, options, [redo]);
}