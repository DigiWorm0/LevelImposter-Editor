import { Button, ButtonGroup, Dialog, FormGroup } from "@blueprintjs/core";
import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from "react-i18next";
import { auth } from "../../utils/Firebase";
import { useSettingsValue } from "../../hooks/useSettings";
import { useUserMaps } from "../../hooks/firebase/useUserMaps";
import MapThumbnail from "../utils/MapThumbnail";
import MapPublishButton from "../buttons/MapPublishButton";
import SignInModal from "./SignInModal";

export interface AccountModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AccountModal(props: AccountModalProps) {
    const { t } = useTranslation();
    const { isDarkMode } = useSettingsValue();
    const [user] = useAuthState(auth);
    const maps = useUserMaps(user?.uid);
    const isLoggedIn = user !== null;

    return (
        <>
            <SignInModal
                isOpen={props.isOpen && !isLoggedIn}
                onClose={props.onClose}
            />

            <Dialog
                isOpen={props.isOpen && isLoggedIn}
                onClose={props.onClose}
                title={user?.displayName}
                style={{ paddingBottom: 0 }}
                portalClassName={isDarkMode ? "bp5-dark" : ""}
            >
                <div style={{ margin: 15, display: "flex", flexDirection: "row" }}>
                    <img
                        referrerPolicy="no-referrer"
                        alt={user?.displayName || ""}
                        src={user?.photoURL || ""}
                        style={{ width: 100, height: 100, borderRadius: 50, objectFit: "cover", marginRight: 20 }}
                    />
                    <FormGroup>
                        <h1 style={{ marginBottom: 15, marginTop: 10 }}>
                            {user?.displayName}
                        </h1>
                        <ButtonGroup>
                            <Button
                                icon={"share"}
                                text={t("account.viewProfile") as string}
                                intent={"success"}
                                onClick={() => {
                                    window.open("https://levelimposter.net/#/profile");
                                }}
                                style={{ marginRight: 5 }}
                            />

                            <Button
                                icon={"log-out"}
                                text={t("account.signOut") as string}
                                intent={"danger"}
                                onClick={() => {
                                    signOut(auth);
                                }}
                            />
                        </ButtonGroup>
                    </FormGroup>
                </div>
                <div style={{ margin: 15 }}>
                    {maps.length <= 0 ? (
                        <p>
                            {t("account.noMaps")}
                        </p>
                    ) : maps.map((map) => (<MapThumbnail map={map} key={map.id} />))}
                    <MapPublishButton />
                </div>

            </Dialog>
        </>
    );
}