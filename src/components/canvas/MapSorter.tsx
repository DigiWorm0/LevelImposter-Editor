import React from "react";
import useMap from "../../hooks/jotai/useMap";
import GUID from "../../types/generic/GUID";
import LIElement from "../../types/li/LIElement";

export function MapSorter() {
    const [map, setMap] = useMap();

    const getZ = (elem: LIElement) => {
        return elem.z - ((elem.y - 25) / 1000 + 5);
    }

    React.useEffect(() => {
        let isSorted = true;
        for (let i = 0; i < map.elements.length - 1; i++) {
            if (getZ(map.elements[i]) < getZ(map.elements[i + 1])) {
                isSorted = false;
                break;
            }
        }
        if (!isSorted) {
            setMap({
                ...map,
                elements: map.elements.sort((a, b) => getZ(b) - getZ(a))
            })
        }
    }, [map]);

    // Garbage Collection
    React.useEffect(() => {
        if (!map.properties.resources)
            return;
        const resourceIDs: GUID[] = [];
        map.elements.forEach((e) => {
            //if (e.properties.spriteID)
            //    resourceIDs.push(e.properties.spriteID);
            if (e.properties.soundID)
                resourceIDs.push(e.properties.soundID);
            if (e.properties.soundIDs)
                resourceIDs.push(...e.properties.soundIDs);
        });
        const resourceKeys = Object.keys(map.properties.resources) as GUID[];
        let hasGarbageResources = false;
        for (const resourceID of resourceKeys) {
            if (resourceIDs.includes(resourceID))
                continue;
            delete map.properties.resources[resourceID];
            console.warn(`Garbage collected resource ${resourceID}`);
            hasGarbageResources = true;
        }
        if (hasGarbageResources) {
            setMap({
                ...map,
                properties: {
                    ...map.properties,
                    resources: {
                        ...map.properties.resources
                    }
                }
            });
        }
    }, [map]);

    return null;
}