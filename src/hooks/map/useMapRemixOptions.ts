import {mapAtom} from "@editor/state/documentStore";
import {atom, useAtomValue} from "jotai";
import {mapInfoFromIDAtom} from "../firebase/useMapInfoFromID";
import {unwrap} from "jotai/utils";
import GUID from "../../types/common/GUID";
import {currentUserAtom} from "@editor/state/publishStore";

export const mapRemixOptionsAtom = atom((get) => {
    const map = get(mapAtom);
    const userID = get(currentUserAtom)?.uid;
    let mapIDs: GUID[] = [];

    if (map.authorID !== userID)
        mapIDs.push(map.id);
    if (map.remixOf)
        mapIDs.push(map.remixOf);

    mapIDs = mapIDs.filter((id, i) => mapIDs.indexOf(id) === i);

    const maps = mapIDs.map(id => get(mapInfoFromIDAtom(id as string)));
    return Promise.all(maps);
});

export default function useMapRemixOptions() {
    return useAtomValue(unwrap(mapRemixOptionsAtom));
}