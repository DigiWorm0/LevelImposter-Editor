export enum MapSerializationType {
    LEGACY = "legacy",
    LIM = "lim",
    LIM_ZIP = "lim_zip",
    LIM_SIGNATURE = "lim_signature",
}

/**
 * Identifies the map deserialization format from the given buffer
 * @param buffer - The ArrayBuffer of the map file
 * @return The identified map deserialization type
 */
export default function identifySerializationType(buffer: ArrayBuffer): MapSerializationType {
    if (buffer.byteLength < 4)
        throw new Error("Buffer too small to identify map type");

    const dataView = new DataView(buffer);
    const signature = String.fromCharCode(
        dataView.getUint8(0),
        dataView.getUint8(1),
        dataView.getUint8(2),
        dataView.getUint8(3)
    );
    const lastByte = dataView.getUint8(buffer.byteLength - 1);

    // Check for LIM Signature
    if (signature === "LIM2")
        return MapSerializationType.LIM_SIGNATURE;
    // Check for ZIP Signature
    else if (signature === "PK\u0003\u0004")
        return MapSerializationType.LIM_ZIP;
    // Check for Legacy JSON (assumed to be UTF-8 text)
    else if (signature.charCodeAt(0) === "{".charCodeAt(0) && lastByte === "}".charCodeAt(0))
        return MapSerializationType.LEGACY;
    // Default to LIM
    else
        return MapSerializationType.LIM;
}