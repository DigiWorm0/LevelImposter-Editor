import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import LIMinigame, { MaybeLIMinigame } from "../../types/li/LIMinigame";
import { saveHistoryAtom } from "./useHistory";
import { selectedElementAtom } from "./useSelectedElem";

// Atoms
export const selectedMinigameIDAtom = atom<string | undefined>(undefined);
export const selectedMinigameAtom = atom(
    (get) => {
        const selectedElem = get(selectedElementAtom);
        const selectedMinigameID = get(selectedMinigameIDAtom);
        const selectedMinigame = selectedElem?.properties.minigames?.find(
            (minigame) => minigame.id === selectedMinigameID
        );
        return selectedMinigame ?? ({ id: selectedMinigameID } as LIMinigame);
    },
    (get, set, minigame: MaybeLIMinigame) => {
        if (minigame === undefined)
            return;

        const selectedElem = get(selectedElementAtom);
        if (selectedElem === undefined)
            return;

        const minigames = selectedElem.properties.minigames ?? [];
        const index = minigames.findIndex((c) => c.id === minigame?.id);

        if (index >= 0) {
            minigames[index] = minigame;
        } else {
            minigames.push(minigame);
        }
        set(selectedElementAtom, {
            ...selectedElem,
            properties: {
                ...selectedElem.properties,
                minigames: minigames,
            },
        });
        set(saveHistoryAtom);
    }
);
export const isSelectedMinigameAtom = atom(
    (get) => {
        return get(selectedMinigameIDAtom) != undefined;
    }
);

// Debug
selectedMinigameIDAtom.debugLabel = "selectedMinigameIDAtom";
selectedMinigameAtom.debugLabel = "selectedMinigameAtom";
isSelectedMinigameAtom.debugLabel = "isSelectedMinigameAtom";

// Hooks
export function useSelectedMinigameID() {
    return useAtom(selectedMinigameIDAtom);
}
export function useSetSelectedMinigameID() {
    return useSetAtom(selectedMinigameIDAtom);
}
export function useSelectedMinigameIDValue() {
    return useAtomValue(selectedMinigameIDAtom);
}
export default function useSelectedMinigame() {
    return useAtom(selectedMinigameAtom);
}
export function useSetSelectedMinigame() {
    return useSetAtom(selectedMinigameAtom);
}
export function useSelectedMinigameValue() {
    return useAtomValue(selectedMinigameAtom);
}
export function useIsSelectedMinigame() {
    return useAtomValue(isSelectedMinigameAtom);
}