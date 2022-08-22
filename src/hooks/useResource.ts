import React from "react";
import { RESOURCE_PRESET_IDS } from "../types/au/AUElementDB";
import { RESOURCE_URL } from "../types/generic/Constants";
import { useMapProperties } from "./jotai/useMap";

export default function useResource(resourceID: string): [string | undefined, (newData?: string) => void] {
    const [data, setData] = React.useState<string | undefined>(undefined);
    const [properties, setProperties] = useMapProperties();

    React.useEffect(() => {
        if (properties.resources) {
            let url: string | undefined = undefined;
            if (RESOURCE_PRESET_IDS.includes(resourceID))
                url = RESOURCE_URL + resourceID;
            if (resourceID in properties.resources)
                url = properties.resources[resourceID];
            setData(url);
        }
    }, [resourceID, properties]);

    const set = (newData?: string) => {
        if (!properties.resources)
            properties.resources = {};
        if (newData === undefined)
            delete properties.resources[resourceID];
        else
            properties.resources[resourceID] = newData;
        setProperties({ ...properties });
        setData(newData);
    }

    return [data, set];
}