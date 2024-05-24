import { mapAtom } from "../map/useMap";
import { auth } from "../../utils/Firebase";
import { atom, useAtomValue } from "jotai";

export const remixAtom = atom((get) => {
    const map = get(mapAtom);
    const userID = auth.currentUser?.uid;

    const isRemix = map.authorID !== userID && map.authorID !== "";
    const wasRemix = map.remixOf !== null;

    return isRemix || wasRemix;
});

export default function useIsRemix() {
    return useAtomValue(remixAtom);
}