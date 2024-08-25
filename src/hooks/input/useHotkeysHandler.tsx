import {useRemoveSelectedElement} from "../elements/useRemoveElement";
import useSaveMap from "../fileio/useSaveMap";
import {useRedo, useUndo} from "../map/history/useUndoRedo";
import useSettings from "../useSettings";
import useToaster from "../useToaster";
import useCopyToClipboard from "./useCopyToClipboard";
import usePasteFromClipboard from "./usePasteFromClipboard";
import primaryStore from "../primaryStore";
import {focusAtom, Scope} from "./useFocus";
import useDuplicate from "./useDuplicate";
import useFocusedHotkeys from "./useFocusedHotkeys";
import useRemoveSelectedKeyframe from "../timeline/useRemoveSelectedKeyframe";

export default function useHotkeysHandler() {
    const copyElement = useCopyToClipboard();
    const pasteElement = usePasteFromClipboard();
    const undo = useUndo();
    const redo = useRedo();
    const duplicate = useDuplicate();
    const removeSelectedElement = useRemoveSelectedElement();
    const removeSelectedKeyframe = useRemoveSelectedKeyframe();
    const [settings, setSettings] = useSettings();
    const toaster = useToaster();
    const saveMap = useSaveMap();

    useFocusedHotkeys("ctrl+/", () => {
        console.log(primaryStore.get(focusAtom));
    });

    // Delete Keyframe
    useFocusedHotkeys("delete", removeSelectedKeyframe, Scope.Timeline);
    useFocusedHotkeys("backspace", removeSelectedKeyframe, Scope.Timeline);

    // Grid Snap
    useFocusedHotkeys("ctrl+g", () => {
        toaster.info((settings.isGridSnapEnabled ? "Disabled" : "Enabled") + " Grid Snap");
        setSettings({
            ...settings,
            isGridSnapEnabled: !settings.isGridSnapEnabled
        });
    }, Scope.Canvas);

    // Toggle Grid
    useFocusedHotkeys("ctrl+h", () => {
        toaster.info((settings.isGridVisible ? "Disabled" : "Enabled") + " Grid");
        setSettings({
            ...settings,
            isGridVisible: !settings.isGridVisible
        });
    }, Scope.Canvas);

    // Clipboard
    useFocusedHotkeys("ctrl+c", copyElement, Scope.Canvas, Scope.SceneGraph);
    useFocusedHotkeys("ctrl+v", pasteElement, Scope.Canvas, Scope.SceneGraph);
    useFocusedHotkeys("ctrl+x", () => {
        copyElement();
        removeSelectedElement();
    }, Scope.Canvas, Scope.SceneGraph);

    // Duplicate
    useFocusedHotkeys("ctrl+d", duplicate, Scope.Canvas, Scope.SceneGraph);

    // Delete
    useFocusedHotkeys("delete", removeSelectedElement, Scope.Canvas, Scope.SceneGraph);
    useFocusedHotkeys("backspace", removeSelectedElement, Scope.Canvas, Scope.SceneGraph);

    // Save
    useFocusedHotkeys("ctrl+s", saveMap);

    // Undo/Redo
    useFocusedHotkeys("ctrl+z", undo);
    useFocusedHotkeys("ctrl+y", redo);
}