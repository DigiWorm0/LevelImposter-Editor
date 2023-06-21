import GUID from "../generic/GUID";
import LISoundChannel from "./LISoundChannel";

export default interface LISound {
    id: GUID;
    type?: string;
    data?: string;
    volume: number;
    isPreset: boolean;
    channel?: LISoundChannel;
}

export type MaybeLISound = LISound | undefined;