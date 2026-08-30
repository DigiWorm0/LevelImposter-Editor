import GUID from "@/types/common/GUID";
import LISpriteAtlas from "@/types/li/LISpriteAtlas";
import {MapProperties} from "@editor/document/types/MapProperties";
import {MapElementProperties} from "@editor/document/types/MapElementProperties";

/**
 * Represents the entire map document, including all elements and scenes.
 * Type only exists in the editor. This is converted into an LIMap when exported.
 */
export interface MapDocument {
    name: string;

    // TODO: replace w/ runtime properties
    properties: MapProperties;
    elements: Record<GUID, MapElement>;
    spriteAtlases: Record<GUID, LISpriteAtlas>;
    scenes: Record<GUID, MapScene>;
}

export interface MapElement {
    id: GUID;

    type: string;
    name: string;

    childrenIDs: GUID[];
    parentID?: GUID;

    x: number;
    y: number;
    z: number;
    xScale: number;
    yScale: number;
    rotation: number;

    properties: MapElementProperties;
}

export interface MapScene {
    id: GUID;
    name: string;
    childrenIDs: GUID[];
}