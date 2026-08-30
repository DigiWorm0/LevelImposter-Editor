import {collection, doc, getDoc} from "firebase/firestore";
import {db} from "@editor/firebase/Firebase";
import LIMetadata from "@/types/li/LIMetadata";

export const getMapInfoFromID = async (id: string) => {
    // Get Firebase Refs
    const storeRef = collection(db, "maps");
    const docRef = doc(storeRef, id);

    // Get Document
    const document = await getDoc(docRef);
    if (!document.exists())
        throw new Error("Map ID not found");

    // Get Storage Ref
    return document.data() as LIMetadata;
};