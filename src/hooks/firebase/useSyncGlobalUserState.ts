import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/utils/Firebase";
import React from "react";
import {currentUserAtom} from "@editor/state/publishStore";
import store from "@/shared/store";

export function useSyncGlobalUserState() {
    const [user] = useAuthState(auth);
    React.useEffect(() => store.set(currentUserAtom, user ?? null), [user]);
}