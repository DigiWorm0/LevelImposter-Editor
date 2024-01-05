import { collection, doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import React from "react";
import GUID from "../types/generic/GUID";
import LIMetadata from "../types/li/LIMetadata";
import { db, storage } from "./utils/Firebase";
import useLIDeserializer from "./useLIDeserializer";
import LIMap from "../types/li/LIMap";
import { useSetMap } from "./jotai/useMap";
import downloadFromURL from "./utils/downloadFromURL";
import { ProgressBar } from "@blueprintjs/core";
import useToaster from "./useToaster";

export default function useIDParam() {
    const deserializeMap = useLIDeserializer();
    const setMap = useSetMap();
    const toaster = useToaster();

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
        // Set Map
        setMap(map);
        toaster.success(`Loaded ${map.name} by ${map.authorName}`);

        // Remove ID Param
        const params = new URLSearchParams(window.location.search);
        params.delete("id");
        window.history.replaceState({}, "", `?${params.toString()}`);
    }

    // Load Map From ID
    const loadMapFromID = (id: GUID) => {
        const storeRef = collection(db, "maps");
        const docRef = doc(storeRef, id);

        // Create Toast
        let toastID = toaster.toast({
            message: "Loading map...",
            timeout: 0,
            icon: "cloud-download",
            className: "bp5-dark",
        });

        // On Error
        const onError = (e: Error) => {
            toaster.dismiss(toastID);
            toaster.danger(e.message);
            console.error(e);
        }

        // Get Metadata
        getDoc(docRef).then((document) => {
            if (!document.exists())
                throw new Error("Map ID not found");

            // Get Storage Ref
            const metadata = document.data() as LIMetadata;
            const storageRef = ref(storage, `maps/${metadata.authorID}/${id}.lim2`);
            const legacyRef = ref(storage, `maps/${metadata.authorID}/${id}.lim`);

            // On Progress
            const onProgress = (percent: number, _toastID?: string) => {
                return toaster.toast({
                    message: (
                        <>
                            <p>{`Downloading ${metadata.name} by ${metadata.authorName}...`}</p>
                            <ProgressBar value={percent} intent={"primary"} />
                        </>
                    ),
                    timeout: 0,
                    icon: "cloud-download",
                    className: "bp5-dark",
                }, _toastID ?? toastID);
            }
            toastID = onProgress(0);

            // Deserialize
            const downloadMap = async (url: string) => {
                const bytes = await downloadFromURL(url, onProgress);
                const blob = new Blob([bytes], { type: "application/json" });
                const map = await deserializeMap(blob);
                toaster.dismiss(toastID);
                onLoad(map);
            }

            // Download & Deserialize
            // Fallback to legacy if needed
            getDownloadURL(storageRef).then(downloadMap).catch((e) => {
                if (e.code === "storage/object-not-found")
                    getDownloadURL(legacyRef).then(downloadMap).catch(onError);
                else
                    onError(e);
            });
        }).catch(onError);
    }

    return null;
}