import {SelectedKeyframe, selectedKeyframeAtom} from "@editor/selection/stores/keyframeSelectionStore";
import store from "@/shared/store";

export const selectKeyframe = (selection: SelectedKeyframe) => {
    store.set(selectedKeyframeAtom, selection);
};