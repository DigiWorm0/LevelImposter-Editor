import {focusAtom, Scope} from "./useFocus";
import {useHotkeys} from "react-hotkeys-hook";
import primaryStore from "../primaryStore";

export default function useFocusedHotkeys(keys: string, callback: () => void, ...targetScopes: Scope[]) {
    useHotkeys(keys, () => {
        // Check if the current scope matches the target scope
        const currentScope = primaryStore.get(focusAtom);
        if (!targetScopes.includes(currentScope) && targetScopes.length > 0)
            return;

        // Call the callback
        callback();
    }, {
        preventDefault: true
    });
};
