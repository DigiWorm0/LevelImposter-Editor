import {collection, getDocs, limit, orderBy, query, where} from "firebase/firestore";
import {db} from "@/utils/Firebase";
import LIMetadata from "@/types/li/LIMetadata";

const MAX_PER_PAGE = 20;

export const getMapsFromUser = async (userID: string) => {
    const constraints = [
        where("authorID", "==", userID),
        orderBy("createdAt", "desc"),
        limit(MAX_PER_PAGE),
    ];

    const storeRef = collection(db, "maps");
    const mapsQuery = query(storeRef, ...constraints);
    const docs = await getDocs(mapsQuery);
    return docs.docs.map(doc => doc.data() as LIMetadata);
};