import GUID from "../generic/GUID";
import LISoundChannel from "./LISoundChannel";

export default interface LISound {
    id: GUID;
    type?: string;
    volume: number;
    dataID?: GUID;
    channel?: LISoundChannel;
    isPreset: boolean;
    presetID?: string;

    /**
     * @deprecated Use dataID instead
     */
    data?: string;
}

export type MaybeLISound = LISound | undefined;