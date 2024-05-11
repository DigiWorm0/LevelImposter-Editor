import React from "react";
import useMap from "../../hooks/map/useMap";
import LIElement from "../../types/li/LIElement";

export function MapSorter() {
    const [map, setMap] = useMap();

    const getZ = (elem: LIElement) => {
        return elem.z + (elem.y / 1000);
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

    return null;
}