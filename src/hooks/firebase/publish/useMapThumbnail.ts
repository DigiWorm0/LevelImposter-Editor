import { atom, useAtom } from "jotai";

export const mapThumbnailAtom = atom<Blob | null>(null);

export default function useMapThumbnail() {
    return useAtom(mapThumbnailAtom);
}