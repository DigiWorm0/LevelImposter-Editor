import { collection, doc, getDoc } from "firebase/firestore";
import { getBytes, ref } from "firebase/storage";
import React from "react";
import GUID from "../types/generic/GUID";
import LIMetadata from "../types/li/LIMetadata";
import { db, storage } from "./utils/Firebase";
import { useSaveHistory } from "./jotai/useHistory";
import { useSetMap } from "./jotai/useMap";
import useToaster from "./useToaster";

export default function useIDParam() {
    const setMap = useSetMap();
    const toaster = useToaster();
    const saveHistory = useSaveHistory();

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has("id")) {
            console.log("Loading map from id", params.get("id"));
            loadMapFromID(params.get("id") as GUID);
        }
    }, []);

    const loadMapFromID = async (id: GUID) => {
        const params = new URLSearchParams(window.location.search);
        const storeRef = collection(db, "maps");
        const docRef = doc(storeRef, id);

        toaster.info("Downloading map...");

        getDoc(docRef).then((document) => {
            if (document.exists()) {
                const metadata = document.data() as LIMetadata;
                const storageRef = ref(storage, `maps/${metadata.authorID}/${id}.lim`);
                getBytes(storageRef).then((mapBytes) => {
                    const decoder = new TextDecoder("utf-8");
                    const mapJSON = decoder.decode(new Uint8Array(mapBytes));
                    const mapData = JSON.parse(mapJSON);
                    setMap(mapData);
                    saveHistory();

                    toaster.success(`Loaded ${metadata.name} by ${metadata.authorName}`);
                    params.delete("id");
                    window.history.replaceState({}, "", `?${params.toString()}`);
                }).catch((e) => {
                    toaster.danger(e.message);
                });
            }
        }).catch((e) => {
            toaster.danger(e.message);
        });
    }

    return null;
}