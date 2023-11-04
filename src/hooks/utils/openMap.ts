import React from "react";
import { useTranslation } from "react-i18next";
import { MAP_FORMAT_VER } from "../../types/generic/Constants";
import LIMap from "../../types/li/LIMap";
import { DEFAULT_GUID } from "./generateGUID";
import { useSaveHistory } from "../jotai/useHistory";
import { useSetSaved } from "../jotai/useIsSaved";
import { useSetMap } from "../jotai/useMap";
import useToaster from "../useToaster";

const LEGACY_PORTS: Record<string, string> = {
    "util-player": "util-dummy",
    "task-fuel3": "task-fuel2",
    "task-waterwheel2": "task-waterwheel1",
    "task-waterwheel3": "task-waterwheel1",
    "task-align2": "task-align1",
}

export function useOpenMap() {
    const setMap = useSetMap();
    const saveHistory = useSaveHistory();
    const { success, warning, danger } = useToaster();
    const { t } = useTranslation();
    const setSaved = useSetSaved();

    const repairMap = React.useCallback((map: LIMap) => {
        map.v = MAP_FORMAT_VER;
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
    }, []);

    const openLegacyMap = React.useCallback((reader: FileReader) => {
        /*
        const legacyMapData = JSON.parse(reader.result as string) as LILegacyFile;

        // Import Objects
        const elements: LIElement[] = [];
        legacyMapData.objs.forEach(legacyObj => {
            const isCustomObj = legacyObj.spriteType == "custom";
            let type = legacyObj.type;
            if (type in LEGACY_PORTS)
                type = LEGACY_PORTS[type];
            if (isCustomObj)
                type = "util-blank";
            const element: LIElement = {
                id: generateGUID(),
                name: legacyObj.name,
                type: type,
                x: legacyObj.x,
                y: -legacyObj.y,
                z: legacyObj.z,
                xScale: legacyObj.xScale * (legacyObj.flipX ? -1 : 1),
                yScale: legacyObj.yScale * (legacyObj.flipY ? -1 : 1),
                rotation: legacyObj.rotation,
                properties: {
                    spriteData: isCustomObj ? legacyObj.type : undefined,
                    colliders: legacyObj.colliders.map(legacyCollider => {
                        const points = legacyCollider.points.map((p) => {
                            return {
                                x: p.x / legacyObj.xScale,
                                y: p.y / legacyObj.yScale
                            }
                        });
                        if (legacyCollider.isClosed && points.length > 1)
                            points.push(points[0]);
                        return {
                            id: generateGUID(),
                            blocksLight: legacyObj.type === "util-room" ? false : legacyCollider.blocksLight,
                            isSolid: legacyObj.type === "util-room",
                            points,
                        }
                    })
                }
            };
            elements.push(element);
        });

        // Target IDs
        legacyMapData.objs.forEach(((legacyObj, index) => {
            const elem = elements[index];

            const targetIndexes = legacyObj.targetIds.map(id => legacyMapData.objs.findIndex(obj => obj.id == id));
            const targetElements = targetIndexes.map(index => elements[index]);

            if (elem.type.startsWith("util-vent")) {
                elem.properties.leftVent = targetElements[0]?.id;
                elem.properties.middleVent = targetElements[1]?.id;
                elem.properties.rightVent = targetElements[2]?.id;
            }
        }));

        // SetMap
        const mapData: LIMap = {
            v: MAP_FORMAT_VER,
            id: DEFAULT_GUID,
            name: legacyMapData.name,
            description: "",
            isPublic: false,
            isVerified: false,
            authorID: "",
            authorName: "",
            createdAt: -1,
            likeCount: 0,
            elements,
            properties: {},
            thumbnailURL: null,
            remixOf: null,
        };
        repairMap(mapData);
        setMap(mapData);
        setSaved(true);
        saveHistory();

        // Toast
        success(t("map.imported", { name: mapData.name }));
         */
        // TODO: Legacy map import
    }, [setMap]);

    const openMap = React.useCallback((reader: FileReader) => {
        const data = reader.result as string;
        const mapData = JSON.parse(data) as LIMap;
        repairMap(mapData);
        setMap(mapData);
        setSaved(true);
        saveHistory();

        // Toast
        success(t("map.opened", { name: mapData.name }));
        if (data.length > 1024 * 1024 * 50) {
            danger(t("map.tooLargeError"));
        } else if (data.length > 1024 * 1024 * 40) {
            warning(t("map.tooLargeWarn"));
        }
    }, [setMap]);

    const openMapFile = React.useCallback(() => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".lim, .json";
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                if (file.name.endsWith(".json")) {
                    openLegacyMap(reader);
                } else {
                    openMap(reader);
                }
            }
            reader.readAsText(file);
        }
        input.click();
    }, [openMap, openLegacyMap]);

    return {
        openMapFile,
        openLegacyMap,
        openMap,
    };
}