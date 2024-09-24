import { collection, getDocs, limit, orderBy, query, QueryConstraint, where } from "firebase/firestore";
import LIMetadata from "../../types/li/LIMetadata";
import { db } from "../../utils/Firebase";
import { atom, useAtomValue } from "jotai";
import { userAtom } from "./useUser";
import { unwrap } from "jotai/utils";

const MAX_PER_PAGE = 100;

export const _userMapsAtom = atom(async (get) => {
    const userID = get(userAtom)?.uid;

    // If the user is not logged in, return an empty array
    if (userID === undefined)
        return [];

    // Firebase queries
    const mapQueries = [
        where("authorID", "==", userID),
        orderBy("createdAt", "desc"),
        limit(MAX_PER_PAGE),
    ];

    // Get the maps
    return await _getMaps(mapQueries);
});

export const userMapsAtom = unwrap(_userMapsAtom);

export default function useUserMaps() {
    return useAtomValue(userMapsAtom);
}


// TODO: Make this a helper function
async function _getMaps(constraints: QueryConstraint[]) {
    const storeRef = collection(db, "maps");
    const mapsQuery = query(storeRef, ...constraints);
    const docs = await getDocs(mapsQuery);
    return docs.docs.map(doc => doc.data() as LIMetadata);
}