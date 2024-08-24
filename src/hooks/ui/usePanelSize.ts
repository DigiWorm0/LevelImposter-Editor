import {atomFamily, atomWithStorage} from "jotai/utils";
import {useAtom} from "jotai";

export const panelSizeAtomFamily = atomFamily((panelName: string) => {
    return atomWithStorage<number | undefined>(`panelSize-${panelName}`, undefined);
});

export default function usePanelSize(panelName: string) {
    return useAtom(panelSizeAtomFamily(panelName));
}