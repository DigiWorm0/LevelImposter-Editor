import { atom, useAtomValue } from "jotai";
import { mapThumbnailAtom } from "./useMapThumbnail";

let prevThumbnailURL: string | null = null;
export const mapThumbnailURLAtom = atom((get) => {
    const thumbnail = get(mapThumbnailAtom);

    // If there is no thumbnail, return the default thumbnail
    if (!thumbnail)
        return "/DefaultThumbnail.png";

    // If there is a previous thumbnail, revoke the object URL
    if (prevThumbnailURL)
        URL.revokeObjectURL(prevThumbnailURL);

    // Create a new object URL for the thumbnail
    prevThumbnailURL = URL.createObjectURL(thumbnail);

    // Return the object URL
    return prevThumbnailURL;
});

export default function useMapThumbnailURL() {
    return useAtomValue(mapThumbnailURLAtom);
}