import GUID from "../generic/GUID";

export default interface MapAsset {
    id: GUID;
    type: "image/ddsFormat" | "image" | "audio" | "unknown";
    url: string;
    blob: Blob;
}

export type MaybeMapAsset = MapAsset | undefined;