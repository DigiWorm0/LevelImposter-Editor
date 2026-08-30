import {focusAtom, Scope} from "@editor/focus/focusStore";
import store from "@/shared/store";

export const setFocus = (scope: Scope) => {
    store.set(focusAtom, scope);
};