import GUID from "../generic/GUID";

export default interface LILayer {
    id: GUID;
    name: string;
    properties: {
        // TODO
    };
}

export type MaybeLILayer = LILayer | undefined;