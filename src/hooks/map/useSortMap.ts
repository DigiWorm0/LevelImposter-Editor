import { mapAtom, useElements } from "./useMap";
import LIElement from "../../types/li/LIElement";
import { atom, useSetAtom } from "jotai";
import React from "react";

const getZ = (elem: LIElement) => {
    return elem.z + (elem.y / 1000);
}

export const sortMapAtom = atom(null, (get, set) => {
    const map = get(mapAtom);

    let isSorted = map.elements.every((elem, i) => {
        if (i === 0)
            return true;
        return getZ(map.elements[i - 1]) >= getZ(elem);
    });

    if (!isSorted) {
        set(mapAtom, {
            ...map,
            elements: map.elements.toSorted((a, b) => getZ(b) - getZ(a))
        });
    }
});

export default function useSortMap() {
    const [elements] = useElements();
    const sortMap = useSetAtom(sortMapAtom);

    React.useEffect(() => {
        sortMap();
    }, [elements]);

    return null;
}