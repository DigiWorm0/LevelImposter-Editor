import useSaveMap from "../fileio/useSaveMap";
import useSettings from "../useSettings";
import useToaster from "../useToaster";
import {Scope} from "./useFocus";
import useFocusedHotkeys from "./useFocusedHotkeys";
import useRemoveSelectedKeyframe from "../timeline/useRemoveSelectedKeyframe";
import useJumpToAdjacentKeyframe from "./useJumpToAdjacentKeyframe";
import useJumpTimelineTick from "./useJumpTimelineTick";
import {useChangeTimelineScale} from "../timeline/useChangeTimelineScale";
import {useSetIsAnimPlaying} from "../timeline/useIsAnimPlaying";
import {useSetPlayhead} from "../timeline/usePlayhead";
import {selectedElementPropAtom, useSetSelectedElemProp} from "../elements/useSelectedElemProperty";
import primaryStore from "../primaryStore";
import useCopyKeyframe from "./useCopyKeyframe";
import usePasteKeyframe from "./usePasteKeyframe";
import useTogglePlayback from "../timeline/useTogglePlayback";
import {copySelectedElementsToClipboard} from "@editor/clipboard/elements/copyElementsToClipboard";
import {redo, undo} from "@editor/history/undoRedo";
import executeCommand from "../../editor/history/executeCommand";
import {duplicateSelectedElement} from "@editor/commands/elements/duplicateElement";
import {deleteAnythingSelected} from "@editor/commands/deleteAnythingSelected";
import {deleteSelectedElements as deleteSelectedElementsCmd} from "../../editor/commands/elements/deleteElement";
import {pasteElementsFromClipboard} from "@editor/clipboard/elements/pasteElementsFromClipboard";
import {selectAllElements} from "@editor/selection/selectAllElements";

const TIMELINE_DELTA_SCALE = 100;

export default function useHotkeysHandler() {
    const pasteElements = () => pasteElementsFromClipboard();
    const duplicate = () => executeCommand(duplicateSelectedElement());
    const deleteSelected = () => executeCommand(deleteAnythingSelected());
    const deleteSelectedElements = () => executeCommand(deleteSelectedElementsCmd());
    const removeSelectedKeyframe = useRemoveSelectedKeyframe();
    const [settings, setSettings] = useSettings();
    const toaster = useToaster();
    const saveMap = useSaveMap();
    const jumpToAdjacentKeyframe = useJumpToAdjacentKeyframe();
    const jumpTimelineTick = useJumpTimelineTick();
    const changeTimelineScale = useChangeTimelineScale();
    const togglePlayback = useTogglePlayback();
    const setPlayAnim = useSetIsAnimPlaying();
    const setPlayhead = useSetPlayhead();
    const setLoop = useSetSelectedElemProp("triggerLoop");
    const copyKeyframe = useCopyKeyframe();
    const pasteKeyframe = usePasteKeyframe();

    // Timeline Snap
    useFocusedHotkeys("ctrl+g", () => {
        toaster.info((settings.isTimelineSnapEnabled ? "Disabled" : "Enabled") + " Timeline Snap");
        setSettings({
            ...settings,
            isTimelineSnapEnabled: !settings.isTimelineSnapEnabled
        });
    }, Scope.Timeline);

    // Pan
    useFocusedHotkeys("up", () => jumpToAdjacentKeyframe(false), Scope.Timeline);
    useFocusedHotkeys("down", () => jumpToAdjacentKeyframe(true), Scope.Timeline);
    useFocusedHotkeys("left", () => jumpTimelineTick(true), Scope.Timeline);
    useFocusedHotkeys("right", () => jumpTimelineTick(false), Scope.Timeline);

    // Zoom
    useFocusedHotkeys("ctrl+equal", () => changeTimelineScale(TIMELINE_DELTA_SCALE), Scope.Timeline);
    useFocusedHotkeys("ctrl+minus", () => changeTimelineScale(-TIMELINE_DELTA_SCALE), Scope.Timeline);

    // Delete Keyframe
    useFocusedHotkeys("delete", removeSelectedKeyframe, Scope.Timeline);
    useFocusedHotkeys("backspace", removeSelectedKeyframe, Scope.Timeline);

    // Playback
    useFocusedHotkeys("space", togglePlayback, Scope.Timeline);
    useFocusedHotkeys("ctrl+space", () => {
        setPlayAnim(false);
        setPlayhead(0);
    }, Scope.Timeline);
    useFocusedHotkeys("ctrl+l", () => {
        const isLoop = primaryStore.get(selectedElementPropAtom("triggerLoop"));
        setLoop(!isLoop);
    }, Scope.Timeline);

    // Copy/Paste Keyframe
    useFocusedHotkeys("ctrl+c", copyKeyframe, Scope.Timeline);
    useFocusedHotkeys("ctrl+v", pasteKeyframe, Scope.Timeline);

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
    useFocusedHotkeys("ctrl+v", pasteElements, Scope.Canvas, Scope.SceneGraph);
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
    useFocusedHotkeys("ctrl+s", saveMap);

    // Undo/Redo
    useFocusedHotkeys("ctrl+z", undo);
    useFocusedHotkeys("ctrl+y", redo);
    useFocusedHotkeys("ctrl+shift+z", redo);

    // Select All
    useFocusedHotkeys("ctrl+a", selectAllElements, Scope.Canvas, Scope.SceneGraph);
}