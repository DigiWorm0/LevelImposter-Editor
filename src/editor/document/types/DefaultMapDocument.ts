import {MapDocument} from "@editor/document/types/MapDocument";
import {EmptyGUID} from "@/shared/types/GUID";

export const DefaultMapDocument: MapDocument = {
    name: "New Map",
    properties: {},
    elements: {},
    spriteAtlases: {},
    scenes: {
        [EmptyGUID]: {
            id: EmptyGUID,
            name: "Map Scene",
            childrenIDs: []
        }
    }
};

/**
 * Creates a new MapDocument object with default values.
 * (Ensures that a new object is created each time to avoid shared references.)
 */
export const createNewMapDocument = (): MapDocument => {
    return JSON.parse(JSON.stringify(DefaultMapDocument));
};