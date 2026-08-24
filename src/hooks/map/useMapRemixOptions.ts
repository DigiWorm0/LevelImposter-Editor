import {mapAtom} from "./useMap";
import {atom, useAtomValue} from "jotai";
import {userAtom} from "../firebase/useUser";
import {mapInfoFromIDAtom} from "../firebase/useMapInfoFromID";
import {unwrap} from "jotai/utils";
import GUID from "../../types/common/GUID";

export const mapRemixOptionsAtom = atom(async (get) => {
    const map = get(mapAtom);
    const userID = get(userAtom)?.uid;
    let mapIDs: GUID[] = [];

    if (map.authorID !== userID)
        mapIDs.push(map.id);
    if (map.remixOf)
        mapIDs.push(map.remixOf);

    // Remove empty strings
    mapIDs = mapIDs.filter(id => id !== "");

    // Remove duplicates
    mapIDs = mapIDs.filter((id, i) => mapIDs.indexOf(id) === i);

    const maps = await Promise.all(mapIDs.map(id => get(mapInfoFromIDAtom(id as string))));
    return maps.filter(m => m !== null);
});

export default function useMapRemixOptions() {
    return useAtomValue(unwrap(mapRemixOptionsAtom));
}