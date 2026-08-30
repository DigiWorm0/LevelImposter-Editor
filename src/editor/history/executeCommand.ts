import {getDefaultStore} from "jotai";
import {documentAtom} from "../document/documentStore";
import {Draft, produceWithPatches} from "immer";
import savePatch from "./savePatch";
import {MapDocument} from "@editor/document/types/MapDocument";

export type DocDraft = Draft<MapDocument>;
export type EditorCommand = (doc: DocDraft) => void;

/**
 * Executes an editor command.
 * Ensures that the correct state is mutated and undo/redo history is saved.
 * @param cmd - The command to execute.
 */
export default function executeCommand(cmd: EditorCommand) {
    executeCommands([cmd]);
}

/**
 * Executes a batch of editor commands.
 * All the commands are batched into a single undo/redo entry.
 * @param commands - A list of commands to execute.
 */
export function executeCommands(commands: EditorCommand[]) {
    const store = getDefaultStore();
    const [nextDocument, patches, inversePatches] = produceWithPatches(
        store.get(documentAtom),
        draft => {
            for (const cmd of commands)
                cmd(draft);
        }
    );

    store.set(documentAtom, nextDocument);
    savePatch({patches, inversePatches});
}