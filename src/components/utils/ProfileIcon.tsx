import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/Firebase";

export default function ProfileIcon() {
    const [user] = useAuthState(auth);

    return (
        <img
            referrerPolicy="no-referrer"
            alt={user?.displayName || ""}
            className="avatar"
            src={user?.photoURL || ""}
            style={{ height: 30, width: 30, borderRadius: 15 }}
        />
    )
}