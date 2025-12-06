import deserializeLegacyFile from "./serializationFormats/deserializeLegacyFile";
import identifySerializationType, {MapSerializationType} from "./identifySerializationType";
import deserializeLIMFile from "./serializationFormats/deserializeLIMFile";
import LIMap from "../../types/li/LIMap";
import deserializeCompressedLIMFile from "./serializationFormats/deserializeCompressedLIMFile";

/**
 * Deserializes a map file from an ArrayBuffer.
 * Automatically identifies the deserialization format,
 * deserializes it, and performs any necessary migrations.
 * @param buffer - The ArrayBuffer of the map file
 * @returns The deserialized LIMap
 */
export default function deserializeMapFile(buffer: ArrayBuffer): LIMap {
    const serializationType = identifySerializationType(buffer);

    switch (serializationType) {
        case MapSerializationType.LEGACY:
            return deserializeLegacyFile(buffer);
        case MapSerializationType.LIM:
            return deserializeLIMFile(buffer, false);
        case MapSerializationType.LIM_SIGNATURE:
            return deserializeLIMFile(buffer, true);
        case MapSerializationType.LIM_ZIP:
            return deserializeCompressedLIMFile(buffer);
        default:
            throw new Error(`Unsupported serialization type: ${serializationType}`);
    }
}

/**
 * Deserializes a map file from a Blob
 * @param blob - The Blob of the map file
 * @returns A promise that resolves to the deserialized LIMap
 */
export function deserializeMapFileFromBlob(blob: Blob): Promise<LIMap> {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            const blobData = fileReader.result;
            if (blobData instanceof ArrayBuffer)
                resolve(deserializeMapFile(blobData));
            else
                reject(new Error("Failed to read blob as ArrayBuffer"));
        };
        fileReader.onerror = () => {
            reject(fileReader.error);
        };
        fileReader.readAsArrayBuffer(blob);
    });
}