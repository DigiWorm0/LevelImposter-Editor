import generateGUID from "../../utils/generateGUID";
import { useRedo, useUndo } from "../map/useHistory";
import { useSelectedElemValue, useSetSelectedElemID } from "../map/elements/useSelectedElem";
import useSettings from "../useSettings";
import useToaster from "../useToaster";
import useSaveMap from "../fileio/useSaveMap";
import { useHotkeys } from "react-hotkeys-hook";
import { useRemoveSelectedElement } from "../map/elements/useRemoveElement";
import { Options as HotkeysHookOptions } from "react-hotkeys-hook/dist/types";
import useCopyToClipboard from "./useCopyToClipboard";
import usePasteFromClipboard from "./usePasteFromClipboard";
import useAddElementAtMouse from "../map/elements/useAddElementAtMouse";

export enum Scope {
    Canvas = "Canvas"
}

export default function useHotkeysHandler() {
    const copyElement = useCopyToClipboard();
    const pasteElement = usePasteFromClipboard();
    const undo = useUndo();
    const redo = useRedo();
    const selectedElem = useSelectedElemValue();
    const addElementAtMouse = useAddElementAtMouse();
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