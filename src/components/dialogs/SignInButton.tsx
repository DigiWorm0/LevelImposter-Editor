import { Button, ButtonGroup, Card, Classes, Dialog, FormGroup, Tag } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../hooks/Firebase";
import { useSettingsValue } from "../../hooks/jotai/useSettings";
import useTranslation from "../../hooks/useTranslation";
import { useUserMaps } from "../../hooks/useUserMaps";
import SignIn from "../SignIn";
import PublishButton from "./PublishButton";

export default function SignInButton() {
    const tranlation = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);
    const settings = useSettingsValue();
    const [user] = useAuthState(auth);
    const maps = useUserMaps(user?.uid);
    const isLoggedIn = user !== null;

    return (
        <>
            <Tooltip2
                content={(isLoggedIn && user?.displayName) ? user?.displayName : tranlation.SignIn}
                position="bottom">

                <Button
                    className={Classes.MINIMAL}
                    icon={
                        isLoggedIn ?
                            <img
                                alt="avatar"
                                className="avatar"
                                src={user?.photoURL || ""}
                                style={{ height: 30, width: 30, borderRadius: 15 }} />
                            :
                            "log-in"
                    }
                    onClick={() => { setIsOpen(true) }}
                />

            </Tooltip2>


            <Dialog
                isOpen={isOpen && !isLoggedIn}
                onClose={() => { setIsOpen(false) }}
                title="Login"
                style={{ paddingBottom: 0 }}
                portalClassName={settings.isDarkMode === false ? "" : "bp4-dark"}>

                <SignIn />

            </Dialog>

            <Dialog
                isOpen={isOpen && isLoggedIn}
                onClose={() => { setIsOpen(false) }}
                title={user?.displayName + "'s Profile"}
                style={{ paddingBottom: 0 }}
                portalClassName={settings.isDarkMode === false ? "" : "bp4-dark"}>

                <div style={{ margin: 15, display: "flex", flexDirection: "row" }}>
                    <img
                        alt="profile"
                        src={user?.photoURL || ""}
                        style={{ width: 100, height: 100, borderRadius: 50, objectFit: "cover", marginRight: 20 }} />
                    <FormGroup>
                        <h1 style={{ marginBottom: 15, marginTop: 10 }}>
                            {user?.displayName}
                        </h1>
                        <ButtonGroup>
                            <Tooltip2
                                content={"View on LevelImposter.net"}
                                position="bottom">
                                <Button
                                    icon={"share"}
                                    text={"View Profile"}
                                    intent={"success"}
                                    onClick={() => {
                                        window.open("https://levelimposter.net/#/profile");
                                    }}
                                    style={{ marginRight: 5 }}
                                />
                            </Tooltip2>

                            <Button
                                icon={"log-out"}
                                text={"Sign Out"}
                                intent={"danger"}
                                onClick={() => {
                                    signOut(auth);
                                }} />
                        </ButtonGroup>
                    </FormGroup>
                </div>
                <div style={{ margin: 15 }}>
                    <h2 style={{ marginTop: 0, marginBottom: 5 }}>
                        Your Maps:
                    </h2>
                    {maps.length <= 0 ? (
                        <p>
                            You have no maps yet.
                        </p>
                    ) : maps.map((map) => {
                        return (
                            <Card style={{ marginTop: 5 }} key={map.id}>
                                {!map.isPublic && (
                                    <Tag
                                        intent="danger">
                                        Private
                                    </Tag>
                                )}
                                {map.isVerified && (
                                    <Tag
                                        intent="warning">
                                        Featured
                                    </Tag>
                                )}
                                <h3 style={{ marginTop: 5, marginBottom: 10 }}>
                                    {map.name}
                                </h3>
                                <p>
                                    {map.description === "" ? (<i>(No Description)</i>) : map.description}
                                </p>

                                <Tooltip2
                                    content={"Open in LevelImposter.net"}
                                    position="bottom">

                                    <Button
                                        icon={"share"}
                                        text={"View"}
                                        intent={"primary"}
                                        onClick={() => {
                                            window.open(`https://levelimposter.net/#/map/${map.id}`);
                                        }}
                                    />
                                </Tooltip2>


                                <Tooltip2
                                    content={"Open in Editor"}
                                    position="bottom">
                                    <Button
                                        icon={"edit"}
                                        text={"Edit"}
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

                    <PublishButton />
                </div>

            </Dialog>

        </>
    );
}