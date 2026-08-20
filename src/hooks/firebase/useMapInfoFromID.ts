import {atom} from "jotai";
import {collection, doc, getDoc} from "firebase/firestore";
import {db} from "../../utils/Firebase";
import LIMetadata from "../../types/li/LIMetadata";
import {atomFamily} from "jotai/utils";

export const mapInfoFromIDAtom = atomFamily((mapID: string) => atom(async () => {

    // Get Firebase Refs
    const storeRef = collection(db, "maps");
    const docRef = doc(storeRef, mapID);

    // Get Document
    const document = await getDoc(docRef);
    if (!document.exists())
        throw new Error("Map ID not found");

    // Get Storage Ref
    return document.data() as LIMetadata;
}));