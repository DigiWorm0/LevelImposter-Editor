import { atom, useAtomValue, useSetAtom } from "jotai";
import { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/Firebase";
import React from "react";

export const userAtom = atom<User | null | undefined>(auth.currentUser);

export function _useUserAtom() {
    const setUserAtom = useSetAtom(userAtom);
    const [user] = useAuthState(auth);

    React.useEffect(() => {
        setUserAtom(user);
    }, [user]);
}

export default function useUser() {
    return useAtomValue(userAtom);
}