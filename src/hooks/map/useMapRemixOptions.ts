import {mapAtom} from "../../editor/state/documentStore";
import {atom, useAtomValue} from "jotai";
import {userAtom} from "../firebase/useUser";
import {mapInfoFromIDAtom} from "../firebase/useMapInfoFromID";
import {unwrap} from "jotai/utils";
import GUID from "../../types/common/GUID";

export const mapRemixOptionsAtom = atom((get) => {
    const map = get(mapAtom);
    const userID = get(userAtom)?.uid;
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