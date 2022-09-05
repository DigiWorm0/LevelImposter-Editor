import { useAtomValue } from "jotai";
import { teleportersAtom } from "./Jotai";

export function useTeleporters() {
    return useAtomValue(teleportersAtom);
}