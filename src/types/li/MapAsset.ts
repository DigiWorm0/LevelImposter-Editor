import GUID from "../generic/GUID";

export default interface MapAsset {
    id: GUID;
    type: "image/dds" | "image" | "audio" | "unknown";
    url: string;
    blob: Blob;
}

export type MaybeMapAsset = MapAsset | undefined;