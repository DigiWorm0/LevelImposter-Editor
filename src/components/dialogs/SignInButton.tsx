import { Button, ButtonGroup, Card, Classes, Dialog, FormGroup, Tag } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from "react-i18next";
import { auth } from "../../hooks/utils/Firebase";
import { useSettingsValue } from "../../hooks/jotai/useSettings";
import { useUserMaps } from "../../hooks/useUserMaps";
import SignIn from "../utils/SignIn";
import PublishButton from "./PublishButton";
import SaveButton from "./SaveButton";

export default function SignInButton() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);
    const settings = useSettingsValue();
    const [user] = useAuthState(auth);
    const maps = useUserMaps(user?.uid);
    const isLoggedIn = user !== null;

    return (
        <>
            <Tooltip2
                content={(isLoggedIn && user?.displayName) ? user?.displayName : t("account.signIn") as string}
                position="bottom">

                <Button
                    className={Classes.MINIMAL}
                    icon={
                        isLoggedIn ?
                            <img
                                referrerPolicy="no-referrer"
                                alt={user?.displayName || ""}
                                className="avatar"
                                src={user?.photoURL || ""}
                                style={{ height: 30, width: 30, borderRadius: 15 }} />
                            :
                            "log-in"
                    }
                    onClick={() => {
                        setIsOpen(true)
                    }}
                />

            </Tooltip2>


            <Dialog
                isOpen={isOpen && !isLoggedIn}
                onClose={() => {
                    setIsOpen(false)
                }}
                title={t("account.signIn")}
                style={{ paddingBottom: 0 }}
                portalClassName={settings.isDarkMode === false ? "" : "bp4-dark"}>

                <SignIn />

            </Dialog>

            <Dialog
                isOpen={isOpen && isLoggedIn}
                onClose={() => {
                    setIsOpen(false)
                }}
                title={user?.displayName}
                style={{ paddingBottom: 0 }}
                portalClassName={settings.isDarkMode === false ? "" : "bp4-dark"}>

                <div style={{ margin: 15, display: "flex", flexDirection: "row" }}>
                    <img
                        referrerPolicy="no-referrer"
                        alt={user?.displayName || ""}
                        src={user?.photoURL || ""}
                        style={{ width: 100, height: 100, borderRadius: 50, objectFit: "cover", marginRight: 20 }} />
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
                                }} />
                        </ButtonGroup>
                    </FormGroup>
                </div>
                <div style={{ margin: 15 }}>
                    <h2 style={{ marginTop: 0, marginBottom: 5 }}>
                        {t("account.yourMaps")}
                    </h2>
                    {maps.length <= 0 ? (
                        <p>
                            {t("account.noMaps")}
                        </p>
                    ) : maps.map((map) => {
                        return (
                            <Card style={{ marginTop: 5 }} key={map.id}>
                                {!map.isPublic && (
                                    <Tag
                                        intent="danger">
                                        {t("map.unlisted")}
                                    </Tag>
                                )}
                                {map.isVerified && (
                                    <Tag
                                        intent="warning">
                                        {t("map.verified")}
                                    </Tag>
                                )}
                                <h3 style={{ marginTop: 5, marginBottom: 10 }}>
                                    {map.name}
                                </h3>
                                <p>
                                    {map.description === "" ?
                                        (<i>{t("map.noDescription")}</i>) :
                                        map.description}
                                </p>

                                <Tooltip2
                                    content={t("map.viewExternal") as string}
                                    position="bottom">

                                    <Button
                                        icon={"share"}
                                        text={t("map.view") as string}
                                        intent={"primary"}
                                        onClick={() => {
                                            window.open(`https://levelimposter.net/#/map/${map.id}`);
                                        }}
                                    />
                                </Tooltip2>


                                <Tooltip2
                                    content={t("map.edit") as string}
                                    position="bottom">
                                    <Button
                                        icon={"edit"}
                                        text={t("map.edit") as string}
                                        intent={"danger"}
                                        onClick={() => {
                                            const url = new URL(window.location.href);
                                            url.searchParams.set("id", map.id);
                                            window.location.href = url.href;
                                        }}
                                        style={{ marginLeft: 5 }}
                                    />
                                </Tooltip2>
                            </Card>
                        );
                    })}

                    <SaveButton isButton={true} />
                    <PublishButton />
                </div>

            </Dialog>

        </>
    );
}