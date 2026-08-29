import {SelectedKeyframe, selectedKeyframeAtom} from "@editor/state/selection/keyframeSelectionStore";
import store from "@/shared/store";

export const selectKeyframe = (selection: SelectedKeyframe) => {
    store.set(selectedKeyframeAtom, selection);
};