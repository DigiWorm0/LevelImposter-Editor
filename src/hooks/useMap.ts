import React from 'react';
import LIMap from "../types/LIMap";

let mapData: LIMap = {
    id: "",
    name: "Example Map",
    description: "",
    elements: []
};

export default function useMap() {
    const [, setVersion] = React.useState<number>(0);

    const setMapData = (data: LIMap) => {
        mapData = data;
        setVersion(v => v + 1);
    }

    return [mapData, setMapData];
}

export function getMap() {
    return mapData;
}