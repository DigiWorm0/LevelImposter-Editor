import { collection, doc, getDoc } from "firebase/firestore";
import { getBytes, ref } from "firebase/storage";
import React from "react";
import GUID from "../types/generic/GUID";
import LIMetadata from "../types/li/LIMetadata";
import { db, storage } from "./Firebase";
import { useSetMap } from "./jotai/useMap";

export function useIDParam() {
    const setMap = useSetMap();

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has("id")) {
            console.log("Loading map from id", params.get("id"));
            loadMapFromID(params.get("id") as GUID);
        }
    }, []);

    const loadMapFromID = async (id: GUID) => {
        const storeRef = collection(db, "maps");
        const docRef = doc(storeRef, id);

        getDoc(docRef).then((document) => {
            if (document.exists()) {
                const metadata = document.data() as LIMetadata;
                const storageRef = ref(storage, `maps/${metadata.authorID}/${id}.lim`);
                getBytes(storageRef).then((mapBytes) => {
                    const decoder = new TextDecoder("utf-8");
                    const mapJSON = decoder.decode(new Uint8Array(mapBytes));
                    const mapData = JSON.parse(mapJSON);
                    setMap(mapData);
                }).catch((e) => {
                    console.error(e);
                });
            }
        }).catch((e) => {
            console.error(e);
        });
    }

    return null;
}