import {MapDocument} from "@editor/document/types/MapDocument";
import {DEFAULT_GUID} from "@/utils/strings/generateGUID";

export const DefaultMapDocument: MapDocument = {
    name: "New Map",
    properties: {},
    elements: {},
    spriteAtlases: {},
    scenes: {
        [DEFAULT_GUID]: {
            id: DEFAULT_GUID,
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