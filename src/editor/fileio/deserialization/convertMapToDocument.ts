import LIMap from "@/types/li/LIMap";
import {MapDocument} from "@editor/document/types/MapDocument";
import {generateGUID} from "@/shared/types/GUID";

export const convertMapToDocument = (map: LIMap): MapDocument => {
    return {
        name: map.name,
        // elements: Object.fromEntries(map.elements.map(e => [e.id, e])), // TODO: FIX ME
        elements: {},
        spriteAtlases: Object.fromEntries(map.spriteAtlases?.map(a => [a.id, a]) ?? []),
        // scenes: Object.fromEntries(map.scenes.map(s => [s.id, s])),
        scenes: {},
        properties: {
            ...map.properties,
            id: map.id ?? generateGUID(),
            authorID: map.authorID ?? "",
            authorName: map.authorName ?? "",
            createdAt: map.createdAt ?? Date.now(),
            thumbnailURL: map.thumbnailURL ?? undefined,
            remixOf: map.remixOf ?? undefined,
            mapTarget: map.mapTarget ?? undefined,
            isPublic: map.isPublic ?? false,
        }
    };
};