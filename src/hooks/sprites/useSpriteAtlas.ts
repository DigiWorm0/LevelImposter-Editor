import {atomFamily} from "jotai/utils";
import {MaybeGUID} from "@/types/common/GUID";
import {atom, useAtom} from "jotai";
import {spritesAtlasesAtom} from "@editor/state/documentStore";
import LISpriteAtlas from "../../types/li/LISpriteAtlas";

export const spriteAtlasAtomFamily = atomFamily((id: MaybeGUID) => {
    return atom((get) => {
        // Check for valid ID
        if (!id)
            return null;

        // Get all sprite atlases
        const allSpriteAtlases = get(spritesAtlasesAtom);
        if (!allSpriteAtlases)
            return null;

        // Find atlas with matching ID
        return allSpriteAtlases.find(atlas => atlas.id === id);
    }, (get, set, newAtlas: LISpriteAtlas) => {
        // Get all sprite atlases
        const allSpriteAtlases = get(spritesAtlasesAtom) || [];

        // Update or remove atlas
        const updatedAtlases = allSpriteAtlases.map(atlas => atlas.id === id ? newAtlas : atlas);
        set(spritesAtlasesAtom, updatedAtlases);
    });
});

export default function useSpriteAtlas(id: MaybeGUID) {
    return useAtom(spriteAtlasAtomFamily(id));
}