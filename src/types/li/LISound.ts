import GUID from "../generic/GUID";

export default interface LISound {
    id: GUID;
    data?: string;
    volume: number;
    isPreset: boolean;
}

export type MaybeLISound = LISound | undefined;