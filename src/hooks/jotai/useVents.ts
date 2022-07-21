import { useAtomValue } from "jotai";
import { selectedVentConnectionsAtom, ventsAtom } from "./Jotai";


export function useVents() {
    return useAtomValue(ventsAtom);
}

export function useSelectedVentConnections() {
    return useAtomValue(selectedVentConnectionsAtom);
}