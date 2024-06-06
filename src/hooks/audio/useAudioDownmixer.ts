import WavAudioEncoder from '../../lib/WavAudioEncoder';
import { settingsAtom } from '../useSettings';
import duplicateBlob from "../../utils/duplicateBlob";
import { atom, useSetAtom } from "jotai";

// Constants
const TARGET_CHANNELS = 1;
const TARGET_SAMPLE_RATE = 16000; // 44100

export const audioDownmixerAtom = atom(null, async (get, _, soundData: Blob) => {

    // If Audio Downmix is disabled, just duplicate the blob
    const { isAudioDownmixEnabled } = get(settingsAtom);
    if (!isAudioDownmixEnabled)
        return await duplicateBlob(soundData);

    // Create Audio Context
    const audioCtx = new AudioContext();
    const fileReader = new FileReader();

    // Convert Blob >>> ArrayBuffer
    const audioData = await new Promise<ArrayBuffer>((resolve, reject) => {
        fileReader.onload = () => resolve(fileReader.result as ArrayBuffer);
        fileReader.onerror = () => reject("Error reading audio file");
        fileReader.readAsArrayBuffer(soundData);
    });

    // Decode ArrayBuffer >>> AudioContext
    const buffer = await new Promise<AudioBuffer>((resolve, reject) => {
        audioCtx.decodeAudioData(audioData, resolve, reject);
    });

    // Create OfflineAudioContext w/ Parameters
    const offlineCtx = new OfflineAudioContext(
        TARGET_CHANNELS,
        buffer.duration * TARGET_SAMPLE_RATE,
        TARGET_SAMPLE_RATE
    );
    const source = offlineCtx.createBufferSource();

    // Connect AudioContext to OfflineContext
    source.buffer = buffer;
    source.connect(offlineCtx.destination);
    source.start(0);

    // Render OfflineContext
    const renderedBuffer = await offlineCtx.startRendering();

    // Encode AudioBuffer >>> WAV
    const wavEncoder = new WavAudioEncoder(renderedBuffer.sampleRate, renderedBuffer.numberOfChannels);
    wavEncoder.encode(renderedBuffer.getChannelData(0));

    // Convert WAV >>> Blob
    return wavEncoder.finish();
});

/**
 * Downmixes audio file to mono and 16kHz
 * @returns Function function to downmixes audio file to mono and 16kHz
 */
export default function useAudioDownmixer() {
    return useSetAtom(audioDownmixerAtom);
}