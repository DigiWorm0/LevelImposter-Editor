import { Button, ButtonGroup, Classes, Dialog, FormGroup } from "@blueprintjs/core";
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
import ProfileIcon from "../utils/ProfileIcon";

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
            {/* Sign-In Dialog */}
            <SignInModal
                isOpen={props.isOpen && !isLoggedIn}
                onClose={props.onClose}
            />

            {/* Account Dialog */}
            <Dialog
                isOpen={props.isOpen && isLoggedIn}
                onClose={props.onClose}
                portalClassName={isDarkMode ? "bp5-dark" : ""}
            >
                {/* Profile Header */}
                <div
                    style={{
                        marginTop: 30,
                        paddingRight: 30,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <ProfileIcon
                        style={{
                            height: 85,
                            width: 85,
                            borderRadius: 50,
                            objectFit: "cover",
                            marginRight: 15
                        }}
                    />
                    <FormGroup>
                        <h1 style={{ marginBottom: 15, marginTop: 10 }}>
                            {user?.displayName}
                        </h1>
                        <ButtonGroup>
                            <Button
                                rightIcon={"share"}
                                text={t("account.viewProfile") as string}
                                intent={"success"}
                                onClick={() => {
                                    window.open("https://levelimposter.net/#/profile");
                                }}
                                style={{ marginRight: 5 }}
                            />
                            <Button
                                rightIcon={"log-out"}
                                text={t("account.signOut") as string}
                                intent={"danger"}
                                onClick={() => signOut(auth).catch(console.error)}
                            />
                        </ButtonGroup>
                    </FormGroup>
                </div>

                {/* Maps */}
                <div
                    style={{
                        margin: 15,
                        textAlign: "center"
                    }}
                >
                    <MapPublishButton />
                    {maps.length <= 0 && (
                        <p className={Classes.TEXT_MUTED} style={{ marginTop: 10 }}>
                            {t("account.noMaps")}
                        </p>
                    )}
                    {maps.map((map) => (<MapThumbnail map={map} key={map.id} />))}
                </div>

            </Dialog>
        </>
    );
}