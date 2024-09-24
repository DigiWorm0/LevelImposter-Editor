import {useRemoveSelectedElement} from "../elements/useRemoveElement";
import useSaveMap from "../fileio/useSaveMap";
import {useRedo, useUndo} from "../map/history/useUndoRedo";
import useSettings from "../useSettings";
import useToaster from "../useToaster";
import useCopyElement from "./useCopyElement";
import usePasteElement from "./usePasteElement";
import {Scope} from "./useFocus";
import useDuplicate from "./useDuplicate";
import useFocusedHotkeys from "./useFocusedHotkeys";
import useRemoveSelectedKeyframe from "../timeline/useRemoveSelectedKeyframe";
import useJumpToAdjacentKeyframe from "./useJumpToAdjacentKeyframe";
import useJumpTimelineTick from "./useJumpTimelineTick";
import {useChangeTimelineScale} from "../timeline/useChangeTimelineScale";
import {useSetPlayAnim} from "../timeline/usePlayAnim";
import {useSetPlayhead} from "../timeline/usePlayhead";
import {selectedElementPropAtom, useSetSelectedElemProp} from "../elements/useSelectedElemProperty";
import primaryStore from "../primaryStore";
import useCopyKeyframe from "./useCopyKeyframe";
import usePasteKeyframe from "./usePasteKeyframe";

const TIMELINE_DELTA_SCALE = 100;

export default function useHotkeysHandler() {
    const copyElement = useCopyElement();
    const pasteElement = usePasteElement();
    const undo = useUndo();
    const redo = useRedo();
    const duplicate = useDuplicate();
    const removeSelectedElement = useRemoveSelectedElement();
    const removeSelectedKeyframe = useRemoveSelectedKeyframe();
    const [settings, setSettings] = useSettings();
    const toaster = useToaster();
    const saveMap = useSaveMap();
    const jumpToAdjacentKeyframe = useJumpToAdjacentKeyframe();
    const jumpTimelineTick = useJumpTimelineTick();
    const changeTimelineScale = useChangeTimelineScale();
    const setPlayAnim = useSetPlayAnim();
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
    useFocusedHotkeys("ctrl+=", () => changeTimelineScale(TIMELINE_DELTA_SCALE), Scope.Timeline);
    useFocusedHotkeys("ctrl+minus", () => changeTimelineScale(-TIMELINE_DELTA_SCALE), Scope.Timeline);

    // Delete Keyframe
    useFocusedHotkeys("delete", removeSelectedKeyframe, Scope.Timeline);
    useFocusedHotkeys("backspace", removeSelectedKeyframe, Scope.Timeline);

    // Playback
    useFocusedHotkeys("space", () => setPlayAnim((playAnim) => !playAnim), Scope.Timeline);
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
    useFocusedHotkeys("ctrl+shift+z", redo);
}