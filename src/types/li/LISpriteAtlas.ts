import GUID from "@shared/types/GUID";

export default interface LISpriteAtlas {
    id: GUID;
    assetID: GUID;
    x: number;
    y: number;
    w: number;
    h: number;
}