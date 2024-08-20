import {useHotkeys} from "react-hotkeys-hook";
import {Options as HotkeysHookOptions} from "react-hotkeys-hook/dist/types";
import generateGUID from "../../utils/strings/generateGUID";
import useAddElementAtCamera from "../elements/useAddElementAtCamera";
import {useRemoveSelectedElement} from "../elements/useRemoveElement";
import {useSelectedElemValue, useSetSelectedElemID} from "../elements/useSelectedElem";
import useSaveMap from "../fileio/useSaveMap";
import {useRedo, useUndo} from "../map/history/useUndoRedo";
import useSettings from "../useSettings";
import useToaster from "../useToaster";
import useCopyToClipboard from "./useCopyToClipboard";
import usePasteFromClipboard from "./usePasteFromClipboard";

export enum Scope {
    SceneGraph = "SceneGraph",
    Canvas = "Canvas",
    Timeline = "Timeline"
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
    const canvasOptions: HotkeysHookOptions = {
        scopes: [Scope.Canvas, Scope.SceneGraph],
        preventDefault: true
    };
    const timelineOptions: HotkeysHookOptions = {
        scopes: [Scope.Timeline],
        preventDefault: true
    };

    // Delete Keyframe
    useHotkeys("delete", () => {
        console.log("TODO: Delete Keyframe");
    }, timelineOptions);

    // Grid Snap
    useHotkeys("ctrl+g", () => {
        toaster.info((settings.isGridSnapEnabled ? "Disabled" : "Enabled") + " Grid Snap");
        setSettings({
            ...settings,
            isGridSnapEnabled: !settings.isGridSnapEnabled
        });
    }, canvasOptions, [toaster, settings, setSettings]);

    // Toggle Grid
    useHotkeys("ctrl+h", () => {
        toaster.info((settings.isGridVisible ? "Disabled" : "Enabled") + " Grid");
        setSettings({
            ...settings,
            isGridVisible: !settings.isGridVisible
        });
    }, canvasOptions, [toaster, settings, setSettings]);

    // Clipboard
    useHotkeys("ctrl+c", copyElement, canvasOptions, [copyElement]);
    useHotkeys("ctrl+v", pasteElement, canvasOptions, [pasteElement]);
    useHotkeys("ctrl+x", () => {
        copyElement();
        removeSelectedElement();
    }, canvasOptions, [copyElement, removeSelectedElement]);

    // Duplicate
    useHotkeys("ctrl+d", () => {
        if (!selectedElem)
            return;
        const id = generateGUID();
        const newElem = JSON.parse(JSON.stringify(selectedElem));
        addElementAtMouse({...newElem, id});
        setSelectedID(id);
    }, canvasOptions, [selectedElem, addElementAtMouse, setSelectedID]);

    // Delete
    useHotkeys("delete", removeSelectedElement, canvasOptions, [removeSelectedElement]);
    useHotkeys("backspace", removeSelectedElement, canvasOptions, [removeSelectedElement]);

    // Save
    useHotkeys("ctrl+s", saveMap, canvasOptions, [saveMap]);

    // Undo/Redo
    useHotkeys("ctrl+z", undo, canvasOptions, [undo]);
    useHotkeys("ctrl+y", redo, canvasOptions, [redo]);
}