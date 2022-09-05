import { useAtomValue } from "jotai";
import { selectedConnectionsAtom, ventsAtom } from "./Jotai";


export function useVents() {
    return useAtomValue(ventsAtom);
}

export function useSelectedConnections() {
    return useAtomValue(selectedConnectionsAtom);
}