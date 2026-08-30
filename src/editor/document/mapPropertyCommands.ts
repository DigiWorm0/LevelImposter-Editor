import {EditorCommand} from "../history/executeCommand";
import {MapProperties} from "@editor/document/types/MapProperties";

export const setMapName = (v: string): EditorCommand => map => map.name = v;
export const setMapProperty = (
    key: keyof MapProperties,
    value: any
): EditorCommand => map => {
    map.properties[key] = value;
};
