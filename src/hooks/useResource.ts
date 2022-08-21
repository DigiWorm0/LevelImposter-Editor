import React from "react";
import GUID, { MaybeGUID } from "../types/generic/GUID";
import generateGUID from "./generateGUID";
import { useMapProperties } from "./jotai/useMap";

export default function useResource(resourceID: MaybeGUID): [MaybeGUID, string | undefined, (newData?: string) => void] {
    const [id, setID] = React.useState<MaybeGUID>(resourceID);
    const [data, setData] = React.useState<string | undefined>(undefined);
    const [properties, setProperties] = useMapProperties();

    React.useEffect(() => {
        if (resourceID)
            setID(resourceID);
        else
            setID(generateGUID());
    }, [resourceID]);

    React.useEffect(() => {
        if (id && properties.resources) {
            const url = properties.resources[id];
            if (url) {
                setData(url);
            }
        }
    }, [id, properties]);

    const set = (newData?: string) => {
        if (!properties.resources)
            properties.resources = {};
        if (id) {
            if (newData === undefined)
                delete properties.resources[id];
            else
                properties.resources[id] = newData;
            setProperties({ ...properties });
            setData(newData);
        }
    }

    return [id, data, set];
}