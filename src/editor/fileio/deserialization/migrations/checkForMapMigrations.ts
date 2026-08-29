import {DEFAULT_GUID} from "../../../../utils/strings/generateGUID";
import {MAP_FORMAT_VER} from "@/types/amongus/Constants";
import LIMap from "../../../../types/li/LIMap";

/**
 * Checks for and applies necessary migrations to a LIMap object.
 * Map data is modified in place.
 * @param map - The LIMap object to check and migrate
 */
export default function checkForMapMigrations(map: LIMap) {
    map.id = map.id || DEFAULT_GUID;
    map.name = map.name || "";
    map.description = map.description || "";
    map.isPublic = map.isPublic || false;
    map.isVerified = map.isVerified || false;
    map.authorName = map.authorName || "";
    map.authorID = map.authorID || "";
    map.createdAt = map.createdAt || -1;
    map.elements = map.elements || [];
    map.properties = map.properties || {};
    map.remixOf = map.remixOf || null;
    if (map.remixOf === undefined)
        map.remixOf = null;

    for (const elem of map.elements) {

        // Find any layers from V2 and fix them
        if (elem.type === "util-layer" && map.v <= 2)
            elem.z = 0;

        // noinspection JSDeprecatedSymbols
        if (elem.properties.triggerFadeTime !== undefined) {
            for (const trigger of elem.properties.triggers ?? []) {
                trigger.properties = {
                    ...trigger.properties,
                    fadeTime: elem.properties.triggerFadeTime
                };
            }
            elem.properties.triggerFadeTime = undefined;
        }
    }

    map.v = MAP_FORMAT_VER;
}