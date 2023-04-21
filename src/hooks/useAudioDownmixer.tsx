import React from 'react';
import WavAudioEncoder from '../lib/WavAudioEncoder';
import { useSettingsValue } from './jotai/useSettings';
//import { Buffer } from 'buffer';

const TARGET_CHANNELS = 1;
const TARGET_SAMPLE_RATE = 16000; // 44100

/**
 * Downmixes audio file to mono and 16kHz
 * @returns Base64 encoded audio data
 */
export default function useAudioDownmixer() {
    const settings = useSettingsValue();

    const downmixAudio = React.useCallback((audioBase64: string) => {
        return new Promise<string>((resolve, reject) => {
            if (settings.isAudioDownmixEnabled === false)
                return resolve(audioBase64);

            const audioCtx = new AudioContext();
            const request = new XMLHttpRequest();

            request.open('GET', audioBase64, true);
            request.responseType = 'arraybuffer';
            request.onload = () => {
                const audioData = request.response;
                audioCtx.decodeAudioData(audioData, (buffer) => {
                    const offlineCtx = new OfflineAudioContext(
                        TARGET_CHANNELS,
                        buffer.duration * TARGET_SAMPLE_RATE,
                        TARGET_SAMPLE_RATE
                    );
                    const source = offlineCtx.createBufferSource();

                    source.buffer = buffer;
                    source.connect(offlineCtx.destination);
                    source.start(0);

                    offlineCtx.startRendering().then((renderedBuffer) => {
                        const wavEncoder = new WavAudioEncoder(renderedBuffer.sampleRate, renderedBuffer.numberOfChannels);

                        wavEncoder.encode(renderedBuffer.getChannelData(0));
                        const wavBlob = wavEncoder.finish('audio/wav');
                        const reader = new FileReader();
                        reader.readAsDataURL(wavBlob);
                        reader.onloadend = () => {
                            const base64data = reader.result;
                            resolve(base64data as string);
                        };
                    });
                });
            };
            request.onerror = (e) => {
                reject(e);
            };
            request.send();
        });
    }, [settings.isAudioDownmixEnabled]);

    return downmixAudio;
}