import {atomFamily} from "jotai/utils";
import {MaybeGUID} from "@/shared/types/GUID";
import {atom} from "jotai";
import {docSpriteAtlasesAtom} from "@editor/document/documentStore";

export const spriteAtlasAtomFamily = atomFamily((id: MaybeGUID) => {
    return atom((get) => {
        // Check for valid ID
        if (!id)
            return null;

        return get(docSpriteAtlasesAtom)[id] || null;
    });
});