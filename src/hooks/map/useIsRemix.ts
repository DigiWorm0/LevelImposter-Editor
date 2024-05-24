import { mapAtom } from "./useMap";
import { atom, useAtomValue } from "jotai";
import { userAtom } from "../firebase/useUser";

export const remixAtom = atom((get) => {
    const map = get(mapAtom);
    const userID = get(userAtom)?.uid;

    const isRemix = map.authorID !== userID && map.authorID !== "";
    const wasRemix = map.remixOf !== null;

    return isRemix || wasRemix;
});

export default function useIsRemix() {
    return useAtomValue(remixAtom);
}