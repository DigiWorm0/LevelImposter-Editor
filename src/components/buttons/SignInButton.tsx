import React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from "react-i18next";
import { auth } from "../../utils/Firebase";
import AccountModal from "../modals/AccountModal";
import ProfileIcon from "../utils/ProfileIcon";
import { IconButton, Tooltip } from "@mui/material";
import { Login } from "@mui/icons-material";

export default function SignInButton() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);
    const [user] = useAuthState(auth);

    return (
        <>
            <Tooltip title={user?.displayName ?? (t("account.signIn") as string)}>
                <IconButton onClick={() => setIsOpen(true)}>
                    {user ? <ProfileIcon /> : <Login />}
                </IconButton>
            </Tooltip>

            <AccountModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}