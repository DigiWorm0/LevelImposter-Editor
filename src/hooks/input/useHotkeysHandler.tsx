import useSettings from "../useSettings";
import useToaster from "../useToaster";
import useFocusedHotkeys from "./useFocusedHotkeys";
import {selectedElementPropAtom, useSetSelectedElemProp} from "../elements/useSelectedElemProperty";
import {copySelectedElementsToClipboard} from "@editor/clipboard/elements/copyElementsToClipboard";
import {redo, undo} from "@editor/history/undoRedo";
import executeCommand from "../../editor/history/executeCommand";
import {duplicateSelectedElement} from "@editor/document/elements/duplicateElement";
import {deleteAnythingSelected} from "@editor/selection/commands/deleteAnythingSelected";
import {deleteSelectedElements as deleteSelectedElementsCmd} from "@editor/document/elements/deleteElement";
import {selectAllElements} from "@editor/selection/selectAllElements";
import primaryStore from "@/shared/store";
import {deleteSelectedKeyframe as deleteSelectedKeyframeCmd} from "@editor/animators/commands/deleteSelectedKeyframe";
import {stepPlayheadToNextKeyframe, stepPlayheadToPrevKeyframe} from "@editor/animators/stepPlayheadToAdjacentKeyframe";
import {stepPlayheadLeft, stepPlayheadRight} from "@editor/animators/stepPlayhead";
import {changeTimelineScale} from "@editor/animators/changeTimelineScale";
import {setPlaybackState, toggleAnimators} from "@editor/animators/setPlaybackState";
import {copyKeyframesToClipboard} from "@editor/clipboard/keyframes/copyKeyframesToClipboard";
import {pasteKeyframesFromClipboard} from "@editor/clipboard/keyframes/pasteKeyframesFromClipboard";
import {pasteElementsFromClipboard} from "@editor/clipboard/elements/pasteElementsFromClipboard";
import {downloadMapFile} from "@editor/fileio/download/downloadMapFile";
import {Scope} from "@/editor/focus/focusStore";

const TIMELINE_DELTA_SCALE = 100;

export default function useHotkeysHandler() {
    const duplicate = () => executeCommand(duplicateSelectedElement());
    const deleteSelected = () => executeCommand(deleteAnythingSelected());
    const deleteSelectedElements = () => executeCommand(deleteSelectedElementsCmd());
    const deleteSelectedKeyframe = () => executeCommand(deleteSelectedKeyframeCmd());
    const [settings, setSettings] = useSettings();
    const toaster = useToaster();
    const setLoop = useSetSelectedElemProp("triggerLoop");

    // Timeline Snap
    useFocusedHotkeys("ctrl+g", () => {
        toaster.info((settings.isTimelineSnapEnabled ? "Disabled" : "Enabled") + " Timeline Snap");
        setSettings({
            ...settings,
            isTimelineSnapEnabled: !settings.isTimelineSnapEnabled
        });
    }, Scope.Timeline);

    // Pan
    useFocusedHotkeys("up", () => stepPlayheadToNextKeyframe(), Scope.Timeline);
    useFocusedHotkeys("down", () => stepPlayheadToPrevKeyframe(), Scope.Timeline);
    useFocusedHotkeys("left", () => stepPlayheadLeft(), Scope.Timeline);
    useFocusedHotkeys("right", () => stepPlayheadRight(), Scope.Timeline);

    // Zoom
    useFocusedHotkeys("ctrl+equal", () => changeTimelineScale(TIMELINE_DELTA_SCALE), Scope.Timeline);
    useFocusedHotkeys("ctrl+minus", () => changeTimelineScale(-TIMELINE_DELTA_SCALE), Scope.Timeline);

    // Delete Keyframe
    useFocusedHotkeys("delete", deleteSelectedKeyframe, Scope.Timeline);
    useFocusedHotkeys("backspace", deleteSelectedKeyframe, Scope.Timeline);

    // Playback
    useFocusedHotkeys("space", toggleAnimators, Scope.Timeline);
    useFocusedHotkeys("ctrl+space", () => setPlaybackState(false, 0), Scope.Timeline);
    useFocusedHotkeys("ctrl+l", () => {
        const isLoop = primaryStore.get(selectedElementPropAtom("triggerLoop"));
        setLoop(!isLoop);
    }, Scope.Timeline);

    // Copy/Paste Keyframe
    useFocusedHotkeys("ctrl+c", copyKeyframesToClipboard, Scope.Timeline);
    useFocusedHotkeys("ctrl+v", pasteKeyframesFromClipboard, Scope.Timeline);

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
    useFocusedHotkeys("ctrl+c", copySelectedElementsToClipboard, Scope.Canvas, Scope.SceneGraph);
    useFocusedHotkeys("ctrl+v", pasteElementsFromClipboard, Scope.Canvas, Scope.SceneGraph);
    useFocusedHotkeys("ctrl+x", () => {
        copySelectedElementsToClipboard();
        deleteSelectedElements();
    }, Scope.Canvas, Scope.SceneGraph);

    // Duplicate
    useFocusedHotkeys("ctrl+d", duplicate, Scope.Canvas, Scope.SceneGraph);

    // Delete
    useFocusedHotkeys("delete", deleteSelected, Scope.Canvas, Scope.SceneGraph);
    useFocusedHotkeys("backspace", deleteSelected, Scope.Canvas, Scope.SceneGraph);

    // Save
    useFocusedHotkeys("ctrl+s", () => downloadMapFile("standard"));
    useFocusedHotkeys("ctrl+shift+s", () => downloadMapFile("compressed"));

    // Undo/Redo
    useFocusedHotkeys("ctrl+z", undo);
    useFocusedHotkeys("ctrl+y", redo);
    useFocusedHotkeys("ctrl+shift+z", redo);

    // Select All
    useFocusedHotkeys("ctrl+a", selectAllElements, Scope.Canvas, Scope.SceneGraph);
}