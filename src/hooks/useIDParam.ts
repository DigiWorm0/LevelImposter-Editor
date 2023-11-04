import { collection, doc, getDoc } from "firebase/firestore";
import { getBytes, ref } from "firebase/storage";
import React from "react";
import GUID from "../types/generic/GUID";
import LIMetadata from "../types/li/LIMetadata";
import { db, storage } from "./utils/Firebase";
import useToaster from "./useToaster";
import useLIDeserializer from "./useLIDeserializer";
import LIMap from "../types/li/LIMap";

export default function useIDParam() {
    const toaster = useToaster();
    const deserializeMap = useLIDeserializer();

    // Load Map From Params
    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has("id")) {
            console.log("Loading map from id", params.get("id"));
            loadMapFromID(params.get("id") as GUID);
        }
    }, []);

    // Handle Load/Error Events
    const onLoad = (map: LIMap) => {
        const params = new URLSearchParams(window.location.search);
        toaster.success(`Loaded ${map.name} by ${map.authorName}`);
        params.delete("id");
        window.history.replaceState({}, "", `?${params.toString()}`);
    }
    const onError = (e: Error) => {
        toaster.danger(e.message);
        console.error(e);
    }

    // Load Map From ID
    const loadMapFromID = (id: GUID) => {
        const params = new URLSearchParams(window.location.search);
        const storeRef = collection(db, "maps");
        const docRef = doc(storeRef, id);

        toaster.info("Downloading map...");

        getDoc(docRef).then((document) => {
            if (document.exists()) {
                const metadata = document.data() as LIMetadata;
                const storageRef = ref(storage, `maps/${metadata.authorID}/${id}.lim2`);
                const legacyRef = ref(storage, `maps/${metadata.authorID}/${id}.lim`);

                const deserializeBytes = (bytes: ArrayBuffer) => {
                    const blob = new Blob([bytes], { type: "application/json" });
                    deserializeMap(blob).then(onLoad).catch(onError);
                }

                // Download & Deserialize
                // Fallback to legacy if needed
                getBytes(storageRef).then(deserializeBytes).catch((e) => {
                    if (e.code === "storage/object-not-found")
                        getBytes(legacyRef).then(deserializeBytes).catch(onError);
                    else
                        onError(e);
                });
            }
        }).catch(onError);
    }

    return null;
}