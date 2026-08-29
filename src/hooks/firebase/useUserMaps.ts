import {atom, useAtomValue} from "jotai";
import {unwrap} from "jotai/utils";
import {getMapsFromUser} from "@editor/firebase/getMapsFromUser";
import {currentUserAtom} from "@editor/firebase/publish/publishStore";

export const _userMapsAtom = atom(async (get) => {
    const userID = get(currentUserAtom)?.uid;
    return userID ? await getMapsFromUser(userID) : [];
});

export const userMapsAtom = unwrap(_userMapsAtom);

export default function useUserMaps() {
    return useAtomValue(userMapsAtom);
}