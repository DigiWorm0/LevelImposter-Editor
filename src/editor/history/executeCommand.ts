import {getDefaultStore} from "jotai";
import {mapAtom} from "../state/documentStore";
import {Draft, produceWithPatches} from "immer";
import LIMap from "../../types/li/LIMap";
import savePatch from "./savePatch";

export type MapDraft = Draft<LIMap>;
export type MapCommand = (map: MapDraft) => void;

/**
 * Executes a map command.
 * Ensures that the correct state is mutated and undo/redo history is saved.
 * @param cmd - The command to execute.
 */
export default function executeCommand(cmd: MapCommand) {
    executeCommands([cmd]);
}

/**
 * Executes a batch of map commands.
 * Only the final state is saved to the undo/redo history.
 * @param commands - A list of commands to execute.
 */
export function executeCommands(commands: MapCommand[]) {
    const store = getDefaultStore();
    const [nextMap, patches, inversePatches] = produceWithPatches(
        store.get(mapAtom),
        draft => {
            for (const cmd of commands) {
                console.log("Executing command:", cmd);
                cmd(draft);
            }
        }
    );

    store.set(mapAtom, nextMap);
    savePatch({patches, inversePatches});
}