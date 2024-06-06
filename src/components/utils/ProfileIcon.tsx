import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/Firebase";

export interface ProfileIconProps {
    style?: React.CSSProperties;
}

export default function ProfileIcon(props: ProfileIconProps) {
    const [user] = useAuthState(auth);

    return (
        <img
            referrerPolicy="no-referrer"
            className="avatar"
            alt={user?.displayName || ""}
            src={user?.photoURL || ""}
            style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                objectFit: "cover",
                ...props.style
            }}
        />
    )
}