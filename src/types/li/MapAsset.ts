import GUID from "../generic/GUID";

export default interface MapAsset {
    id: GUID;
    type: string;
    url: string;
    blob: Blob;
}

export type MaybeMapAsset = MapAsset | undefined;