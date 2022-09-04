import GUID from "../generic/GUID";

export default interface LILayer {
    id: GUID;
    name: string;
}

export type MaybeLILayer = LILayer | undefined;