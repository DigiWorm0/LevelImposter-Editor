import GUID from "../generic/GUID";
import LISoundChannel from "./LISoundChannel";

export default interface LISound {
    // GUID of the sound
    id: GUID;
    // Specific Sound Type (doorOpen, doorClose, etc.)
    type?: string;
    // Volume of the sound (0-1)
    volume: number;
    // GUID of the audio asset
    dataID?: GUID;
    // Sound Channel (SFX, Music, etc.)
    channel?: LISoundChannel;

    // True if the sound is a preset
    isPreset: boolean;
    // Resource ID (dirt1.wav, dirt2.wav, etc.)
    presetID?: string;

    // @deprecated Use dataID instead
    data?: string;
}

export type MaybeLISound = LISound | undefined;