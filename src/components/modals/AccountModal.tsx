import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from "react-i18next";
import { auth } from "../../utils/Firebase";
import { useUserMaps } from "../../hooks/firebase/useUserMaps";
import MapThumbnail from "../utils/MapThumbnail";
import MapPublishButton from "../buttons/MapPublishButton";
import SignInModal from "./SignInModal";
import ProfileIcon from "../utils/ProfileIcon";
import { Box, Button, ButtonGroup } from "@mui/material";
import GenericModal from "./GenericModal";
import { Logout, Share } from "@mui/icons-material";

export interface AccountModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AccountModal(props: AccountModalProps) {
    const { t } = useTranslation();
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
            <GenericModal
                open={props.isOpen && isLoggedIn}
                onClose={props.onClose}
            >
                <Box>
                    {/* Profile Header */}
                    <div
                        style={{
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
                        <div>
                            <h1 style={{ marginBottom: 15, marginTop: 10 }}>
                                {user?.displayName}
                            </h1>
                            <ButtonGroup>
                                <Button
                                    onClick={() => {
                                        window.open("https://levelimposter.net/#/profile");
                                    }}
                                    style={{ marginRight: 5 }}
                                    endIcon={<Share />}
                                >
                                    {t("account.viewProfile")}
                                </Button>
                                <Button
                                    onClick={() => signOut(auth).catch(console.error)}
                                    color={"error"}
                                    endIcon={<Logout />}
                                >
                                    {t("account.signOut")}
                                </Button>
                            </ButtonGroup>
                        </div>
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
                            <p style={{ marginTop: 10 }}>
                                {t("account.noMaps")}
                            </p>
                        )}
                        {maps.map((map) => (<MapThumbnail map={map} key={map.id} />))}
                    </div>
                </Box>

            </GenericModal>
        </>
    );
}