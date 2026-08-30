import LIMap from "@/types/li/LIMap";
import {MAP_FORMAT_VER} from "@/types/amongus/Constants";
import {MapDocument} from "@editor/document/types/MapDocument";
import {generateGUID} from "@/shared/types/GUID";

// TODO: Version each type as a separate interface
export const convertDocumentToMap = (doc: MapDocument): LIMap => {
    return {
        // Versioning
        v: MAP_FORMAT_VER,

        // Maps
        // elements: Object.values(doc.elements), // TODO: FIX ME
        elements: [],
        spriteAtlases: Object.values(doc.spriteAtlases),
        // scenes: Object.values(doc.scenes)

        // Metadata
        id: doc.properties.id ?? generateGUID(),
        name: doc.name,
        description: doc.properties.description ?? "",
        authorID: doc.properties.authorID ?? "",
        authorName: doc.properties.authorName ?? "",
        createdAt: doc.properties.createdAt ?? Date.now(),
        thumbnailURL: doc.properties.thumbnailURL ?? null,
        remixOf: doc.properties.remixOf ?? null,
        mapTarget: doc.properties.mapTarget ?? null,
        isPublic: doc.properties.isPublic ?? false,
        isVerified: false,
        properties: {...doc.properties},
    };
};