import { Button, ButtonGroup, Classes, Dialog, FormGroup, Tooltip } from "@blueprintjs/core";
import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from "react-i18next";
import { auth } from "../../hooks/utils/Firebase";
import { useSettingsValue } from "../../hooks/jotai/useSettings";
import { useUserMaps } from "../../hooks/useUserMaps";
import SignIn from "../utils/SignIn";
import PublishButton from "./PublishButton";
import MapThumbnail from "../utils/MapThumbnail";

export default function SignInButton() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);
    const settings = useSettingsValue();
    const [user] = useAuthState(auth);
    const maps = useUserMaps(user?.uid);
    const isLoggedIn = user !== null;

    return (
        <>
            <Tooltip
                content={(isLoggedIn && user?.displayName) ? user?.displayName : t("account.signIn") as string}
                position="bottom"
            >
                <Button
                    className={Classes.MINIMAL}
                    icon={
                        isLoggedIn ?
                            <img
                                referrerPolicy="no-referrer"
                                alt={user?.displayName || ""}
                                className="avatar"
                                src={user?.photoURL || ""}
                                style={{ height: 30, width: 30, borderRadius: 15 }}
                            />
                            :
                            "log-in"
                    }
                    onClick={() => {
                        setIsOpen(true)
                    }}
                />
            </Tooltip>


            <Dialog
                isOpen={isOpen && !isLoggedIn}
                onClose={() => {
                    setIsOpen(false)
                }}
                title={t("account.signIn")}
                style={{ paddingBottom: 0 }}
                portalClassName={settings.isDarkMode === false ? "" : "bp5-dark"}
            >
                <SignIn />
            </Dialog>

            <Dialog
                isOpen={isOpen && isLoggedIn}
                onClose={() => {
                    setIsOpen(false)
                }}
                title={user?.displayName}
                style={{ paddingBottom: 0 }}
                portalClassName={settings.isDarkMode === false ? "" : "bp5-dark"}
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
                    <PublishButton />
                </div>

            </Dialog>

        </>
    );
}