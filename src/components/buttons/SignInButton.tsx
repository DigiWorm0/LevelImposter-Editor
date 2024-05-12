import { Button, Tooltip } from "@blueprintjs/core";
import React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from "react-i18next";
import { auth } from "../../utils/Firebase";
import AccountModal from "../modals/AccountModal";
import ProfileIcon from "../utils/ProfileIcon";

export default function SignInButton() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);
    const [user] = useAuthState(auth);

    return (
        <>
            <Tooltip
                content={user?.displayName ?? (t("account.signIn") as string)}
                position="bottom"
            >
                <Button
                    minimal
                    icon={user ? <ProfileIcon /> : "log-in"}
                    onClick={() => setIsOpen(true)}
                />
            </Tooltip>

            <AccountModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}