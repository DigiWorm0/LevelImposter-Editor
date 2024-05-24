import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from "react-i18next";
import { auth } from "../../utils/Firebase";
import { useUserMaps } from "../../hooks/firebase/useUserMaps";
import MapThumbnail from "../utils/MapThumbnail";
import SignInModal from "./SignInModal";
import ProfileIcon from "../utils/ProfileIcon";
import { Button, ButtonGroup, Divider, Typography } from "@mui/material";
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
                            height: 100,
                            width: 100,
                            borderRadius: 50,
                            objectFit: "cover",
                            marginRight: 25
                        }}
                    />
                    <div>
                        <Typography
                            variant={"h4"}
                            sx={{
                                marginBottom: 1,
                                marginTop: 1,
                                fontWeight: "bold"
                            }}
                        >
                            {user?.displayName}
                        </Typography>
                        <ButtonGroup>
                            <Button
                                onClick={() => {
                                    window.open("https://levelimposter.net/#/profile");
                                }}
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

                <Divider sx={{ mt: 2 }} />

                {/* Maps */}
                <div
                    style={{
                        margin: 15,
                        textAlign: "center"
                    }}
                >
                    {maps.length <= 0 && (
                        <Typography
                            variant={"body1"}
                            sx={{
                                color: "text.secondary",
                                marginTop: 2
                            }}
                        >
                            {t("account.noMaps")}
                        </Typography>
                    )}
                    {maps.map((map) => (<MapThumbnail map={map} key={map.id} />))}
                </div>
            </GenericModal>
        </>
    );
}