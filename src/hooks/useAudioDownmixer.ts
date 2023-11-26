import React from 'react';
import WavAudioEncoder from '../lib/WavAudioEncoder';
import { useSettingsValue } from './jotai/useSettings';
import duplicateBlob from "./utils/duplicateBlob";

// Constants
const TARGET_CHANNELS = 1;
const TARGET_SAMPLE_RATE = 16000; // 44100

/**
 * Downmixes audio file to mono and 16kHz
 * @returns Function function to downmixes audio file to mono and 16kHz
 */
export default function useAudioDownmixer() {
    const settings = useSettingsValue();

    return React.useCallback((soundData: Blob) => {
        return new Promise<Blob>((resolve, reject) => {
            if (settings.isAudioDownmixEnabled === false)
                duplicateBlob(soundData).then(resolve).catch(reject);

            const audioCtx = new AudioContext();
            const fileReader = new FileReader();

            // Blob >>> ArrayBuffer
            fileReader.onload = () => {

                // AudioData >>> AudioContext
                const audioData = fileReader.result as ArrayBuffer;
                audioCtx.decodeAudioData(audioData, (buffer) => {
                    // OfflineAudioContext
                    const offlineCtx = new OfflineAudioContext(
                        TARGET_CHANNELS,
                        buffer.duration * TARGET_SAMPLE_RATE,
                        TARGET_SAMPLE_RATE
                    );
                    const source = offlineCtx.createBufferSource();

                    // Downmix
                    source.buffer = buffer;
                    source.connect(offlineCtx.destination);
                    source.start(0);

                    // Render
                    offlineCtx.startRendering().then((renderedBuffer) => {
                        // Encode
                        const wavEncoder = new WavAudioEncoder(renderedBuffer.sampleRate, renderedBuffer.numberOfChannels);
                        wavEncoder.encode(renderedBuffer.getChannelData(0));
                        const wavBlob = wavEncoder.finish();

                        // Resolve
                        resolve(wavBlob);
                    });
                });
            };
            // Handle Errors
            fileReader.onerror = () => {
                reject("Error reading audio file");
            }
            // Start Reading
            fileReader.readAsArrayBuffer(soundData);
        });
    }, [settings.isAudioDownmixEnabled]);
}