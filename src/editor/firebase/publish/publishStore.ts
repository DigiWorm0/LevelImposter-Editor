import {atom} from "jotai";
import GUID from "@/shared/types/GUID";
import {User} from "firebase/auth";
import {auth} from "@editor/firebase/Firebase";

// TODO: Add publish thumbnail to asset DB under set GUID instead of storing it in memory.
export const currentUserAtom = atom<User | null>(auth.currentUser);
export const publishThumbnailAtom = atom<Blob | null>(null);
export const publishTargetIDAtom = atom<GUID | null>(null);
export const publishRemixIDAtom = atom<GUID | null>(null);