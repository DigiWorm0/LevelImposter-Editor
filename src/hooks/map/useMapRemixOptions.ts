import {docPropertiesAtom} from "@editor/document/documentStore";
import {atom, useAtomValue} from "jotai";
import {mapInfoFromIDAtom} from "../firebase/useMapInfoFromID";
import {unwrap} from "jotai/utils";
import GUID from "@shared/types/GUID";
import {currentUserAtom} from "@editor/firebase/publish/publishStore";

export const mapRemixOptionsAtom = atom((get) => {
    const docProperties = get(docPropertiesAtom);
    const userID = get(currentUserAtom)?.uid;
    let mapIDs: GUID[] = [];

    // If I'm not the owner, remix this map
    if (docProperties.id &&
        docProperties.authorID !== userID)
        mapIDs.push(docProperties.id);

    // If this map is a remix, remix the original map
    if (docProperties.remixOf)
        mapIDs.push(docProperties.remixOf);

    mapIDs = mapIDs.filter((id, i) => mapIDs.indexOf(id) === i);

    const maps = mapIDs.map(id => get(mapInfoFromIDAtom(id as string)));
    return Promise.all(maps);
});

export default function useMapRemixOptions() {
    return useAtomValue(unwrap(mapRemixOptionsAtom));
}