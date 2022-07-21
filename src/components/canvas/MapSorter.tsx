import React from "react";
import useMap from "../../hooks/jotai/useMap";

export function MapSorter() {
    const [map, setMap] = useMap();

    React.useEffect(() => {
        let isSorted = true;
        for (let i = 0; i < map.elements.length - 1; i++) {
            if (map.elements[i].z < map.elements[i + 1].z) {
                isSorted = false;
                break;
            }
        }
        if (!isSorted) {
            setMap({
                ...map,
                elements: map.elements.sort((a, b) => b.z - a.z)
            })
        }
    }, [map]);

    return null;
}