import LIElement from "../types/li/LIElement";
import generateGUID, { DEFAULT_GUID } from "./generateGUID";
import { EXILE_IDS } from "../types/db/AUElementDB";

const LEGACY_PORTS: Record<string, string> = {
    "util-player": "util-dummy",
    "task-fuel3": "task-fuel2",
    "task-waterwheel2": "task-waterwheel1",
    "task-waterwheel3": "task-waterwheel1",
    "task-align2": "task-align1",
};

/**
 * Converts .JSON to .LIM
 * @param mapData - .JSON Map Data
 */
export default function convertOldLegacyMap(mapData: any) {

    // Import Objects
    const elements: LIElement[] = [];
    mapData.objs.forEach((legacyObj: any, index: number) => {

        // Check if Custom Object
        const isCustomObj = legacyObj.spriteType == "custom";

        // Get Object Type
        let type = legacyObj.type;
        if (type in LEGACY_PORTS)
            type = LEGACY_PORTS[type];
        if (isCustomObj)
            type = "util-blank";

        // Create Element
        const element: LIElement = {
            id: generateGUID(),
            name: legacyObj.name,
            type: type,
            x: legacyObj.x,
            y: -legacyObj.y,
            z: legacyObj.z + (index * 0.001),
            xScale: legacyObj.xScale * (legacyObj.flipX ? -1 : 1),
            yScale: legacyObj.yScale * (legacyObj.flipY ? -1 : 1),
            rotation: legacyObj.rotation,
            properties: {
                spriteData: isCustomObj ? legacyObj.type : undefined,
                colliders: legacyObj.colliders.map((legacyCollider: any) => {
                    const points = legacyCollider.points.map((p: any) => {
                        return {
                            x: p.x / legacyObj.xScale,
                            y: p.y / legacyObj.yScale
                        }
                    });
                    if (legacyCollider.isClosed && points.length > 1)
                        points.push(points[0]);
                    return {
                        id: generateGUID(),
                        blocksLight: type === "util-room" ? false : legacyCollider.blocksLight,
                        isSolid: type === "util-room",
                        points,
                    }
                })
            }
        };
        elements.push(element);
    });

    // Target IDs
    mapData.objs.forEach(((legacyObj: any, index: number) => {
        const elem = elements[index];

        // Get Target Elements
        const targetIndexes = legacyObj.targetIds.map((id: any) => mapData.objs.findIndex((obj: any) => obj.id == id));
        const targetElements = targetIndexes.map((index: number) => elements[index]);

        // Connect Vents
        if (elem.type.startsWith("util-vent")) {
            elem.properties.leftVent = targetElements[0]?.id;
            elem.properties.middleVent = targetElements[1]?.id;
            elem.properties.rightVent = targetElements[2]?.id;
        }
    }));

    // Update Properties
    mapData.v = 1;
    mapData.id = DEFAULT_GUID;
    mapData.name = mapData.name || "";
    mapData.description = "";
    mapData.isPublic = false;
    mapData.isVerified = false;
    mapData.authorID = "";
    mapData.authorName = "";
    mapData.createdAt = -1;
    mapData.likeCount = 0;
    mapData.elements = elements;
    mapData.properties = {
        exileID: EXILE_IDS[mapData.exile]
    };
    mapData.thumbnailURL = mapData.btn;
    mapData.remixOf = null;

    // Remove Unused Properties
    mapData.objs = undefined;
    mapData.btn = undefined;
    mapData.exile = undefined;
    mapData.map = undefined;
}