/*
* Based on WavAudioEncoder.js
* https://github.com/higuma/wav-audio-encoder-js
*/
export default class WavAudioEncoder {
    min = Math.min;
    max = Math.max;

    sampleRate: number;
    numChannels: number;
    numSamples: number;
    dataViews?: DataView[];

    constructor(sampleRate: number, numChannels: number) {
        this.sampleRate = sampleRate;
        this.numChannels = numChannels;
        this.numSamples = 0;
        this.dataViews = [];
    }

    setString(view: DataView, offset: number, str: string) {
        const len = str.length;
        for (let i = 0; i < len; ++i)
            view.setUint8(offset + i, str.charCodeAt(i));
    }

    encode(buffer: Float32Array) {
        const len = buffer.length;
        const view = new DataView(new ArrayBuffer(len * 2));
        let offset = 0;
        
        for (let i = 0; i < len; ++i) {
            const x = buffer[i] * 0x7fff;
            view.setInt16(offset, x < 0 ? this.max(x, -0x8000) : this.min(x, 0x7fff), true);
            offset += 2;
        }
        this.dataViews?.push(view);
        this.numSamples += len;
    }

    finish() {
        const dataSize = this.numChannels * this.numSamples * 2,
            view = new DataView(new ArrayBuffer(44));
        this.setString(view, 0, "RIFF");
        view.setUint32(4, 36 + dataSize, true);
        this.setString(view, 8, "WAVE");
        this.setString(view, 12, "fmt ");
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true);
        view.setUint16(22, this.numChannels, true);
        view.setUint32(24, this.sampleRate, true);
        view.setUint32(28, this.sampleRate * 4, true);
        view.setUint16(32, this.numChannels * 2, true);
        view.setUint16(34, 16, true);
        this.setString(view, 36, "data");
        view.setUint32(40, dataSize, true);
        this.dataViews?.unshift(view);
        const blob = new Blob(this.dataViews, { type: "audio/wav" });
        this.cleanup();
        return blob;
    }

    cancel() {
        this.cleanup();
    }

    cleanup() {
        delete this.dataViews;
    }
}

