import { Dialog } from "@blueprintjs/core";
import React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from "react-i18next";
import { auth } from "../../utils/Firebase";
import { useSettingsValue } from "../../hooks/useSettings";
import SignIn from "../utils/SignIn";

export interface SignInModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SignInModal(props: SignInModalProps) {
    const { t } = useTranslation();
    const { isDarkMode } = useSettingsValue();
    const [user] = useAuthState(auth);
    const isLoggedIn = user !== null;

    return (
        <Dialog
            isOpen={props.isOpen && !isLoggedIn}
            onClose={props.onClose}
            title={t("account.signIn")}
            style={{ paddingBottom: 0 }}
            portalClassName={isDarkMode ? "bp5-dark" : ""}
        >
            <SignIn />
        </Dialog>
    );
}