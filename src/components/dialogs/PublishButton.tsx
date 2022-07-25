import { Button, ButtonGroup, Classes, Dialog, FormGroup, InputGroup, ProgressBar, Switch, TextArea, Toaster } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { signInWithPopup, signOut } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { ref, uploadString } from "firebase/storage";
import React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db, githubProvider, googleProvider, storage } from "../../hooks/Firebase";
import generateGUID from "../../hooks/generateGUID";
import useMap from "../../hooks/jotai/useMap";
import { useSettingsValue } from "../../hooks/jotai/useSettings";
import useToaster from "../../hooks/useToaster";
import GUID from "../../types/generic/GUID";
import LIMap from "../../types/li/LIMap";
import LIMetadata from "../../types/li/LIMetadata";
import AgreementDialog from "./AgreementDialog";

const toaster = Toaster.create();

export default function PublishButton() {
    const toaster = useToaster();
    const [isOpen, setIsOpen] = React.useState(false);
    const [isDoneOpen, setIsDoneOpen] = React.useState(false);
    const [isAgreementOpen, setIsAgreementOpen] = React.useState(false);
    const settings = useSettingsValue();
    const [map, setMap] = useMap();
    const [user] = useAuthState(auth);
    const [isPublishing, setIsPublishing] = React.useState(false);

    const isLoggedIn = user !== null;
    const isUploaded = map.id !== "" && user?.uid === map.authorID;
    const googleIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
        </svg>
    );
    const githubIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
    );

    const publishMap = (id?: GUID) => {
        setIsPublishing(true);
        const mapData: LIMap = {
            id: id || map.id,
            v: map.v,
            name: map.name,
            description: map.description,
            isPublic: map.isPublic,
            isVerified: false,
            authorID: user?.uid ? user.uid : "",
            authorName: user?.displayName ? user.displayName : "",
            elements: map.elements,
            properties: map.properties
        };
        const mapJSON = JSON.stringify(mapData);
        const storageRef = ref(storage, `maps/${user?.uid}/${mapData.id}.lim`);
        const storeRef = collection(db, "maps");
        const docRef = doc(storeRef, mapData.id);

        const uploadToStorage = () => {
            uploadString(storageRef, mapJSON).then((storageDoc) => {
                console.log(`Map uploaded to firebase storage: ${storageDoc.ref.fullPath}`);

                uploadToFirestore();
            }).catch((err) => {
                toaster.error(err.message);
                setIsPublishing(false);
            });
        }

        const uploadToFirestore = () => {
            setDoc(docRef, {
                id: mapData.id,
                name: mapData.name,
                description: mapData.description,
                isPublic: mapData.isPublic,
                isVerified: false,
                authorID: user?.uid,
                authorName: user?.displayName,
            } as LIMetadata).then(() => {
                console.log(`Map published to firestore: ${docRef.path}`);

                setIsPublishing(false);
                setIsOpen(false);
                setIsDoneOpen(true);
                setMap(mapData);
            }).catch((err) => {
                toaster.error(err.message);
                setIsPublishing(false);
            });
        }

        uploadToStorage();
    }

    return (
        <>
            <Tooltip2
                content={isUploaded ? "Update Map" : "Publish Map"}
                position="bottom">

                <Button
                    className={Classes.MINIMAL}
                    icon="cloud-upload"
                    onClick={() => { setIsOpen(true) }} />

            </Tooltip2>

            {/*  Login  */}

            <Dialog
                isOpen={isOpen && !isLoggedIn}
                onClose={() => { setIsOpen(false) }}
                title="Login"
                portalClassName={settings.isDarkMode ? "bp4-dark" : ""}>

                <div style={{ margin: 15 }} >

                    <ButtonGroup>
                        <Button
                            icon={googleIcon}
                            text="Google"
                            onClick={() => {
                                signInWithPopup(auth, googleProvider).catch((err) => {
                                    toaster.error(err.message);
                                })
                            }}
                        />
                        <Button
                            icon={githubIcon}
                            text="Github"
                            onClick={() => {
                                signInWithPopup(auth, githubProvider).catch((err) => {
                                    toaster.error(err.message);
                                });
                            }}
                        />
                    </ButtonGroup>


                </div>

            </Dialog>

            {/*  Publish  */}

            <Dialog
                isOpen={isOpen && isLoggedIn}
                onClose={() => { setIsOpen(isPublishing) }}
                title="Publish"
                portalClassName={settings.isDarkMode ? "bp4-dark" : ""}>

                <div style={{ margin: 15 }} >

                    <FormGroup label={"Signed in as " + user?.displayName} disabled={isPublishing}>
                        <Button
                            disabled={isPublishing}
                            icon={"user"}
                            text={"Sign Out"}
                            intent={"danger"}
                            onClick={() => {
                                signOut(auth);
                            }} />
                    </FormGroup>

                    <FormGroup label="Map Name" disabled={isPublishing}>
                        <InputGroup
                            large
                            disabled={isPublishing}
                            placeholder="Title"
                            value={map.name}
                            onChange={(e) => { setMap({ ...map, name: e.target.value }) }} />
                    </FormGroup>
                    <FormGroup label="Map Description" disabled={isPublishing}>
                        <TextArea
                            fill
                            growVertically
                            large
                            disabled={isPublishing}
                            placeholder="Description"
                            value={map.description}
                            onChange={(e) => { setMap({ ...map, description: e.target.value }) }} />
                    </FormGroup>
                    <FormGroup label="Public" disabled={isPublishing}>
                        <Switch
                            large
                            disabled={isPublishing}
                            checked={map.isPublic}
                            onChange={(e) => { setMap({ ...map, isPublic: e.currentTarget.checked }) }} />
                    </FormGroup>

                    <Button
                        style={{ marginRight: 10 }}
                        disabled={isPublishing}
                        icon={"cloud-upload"}
                        text={"Upload New"}
                        intent={"primary"}
                        onClick={() => {
                            setIsAgreementOpen(true);
                        }}
                    />

                    {isUploaded && (
                        <Button
                            disabled={isPublishing}
                            icon={"saved"}
                            text={"Update Existing"}
                            intent={"danger"}
                            onClick={() => {
                                publishMap();
                            }}
                        />
                    )}

                    {isPublishing &&
                        <div style={{ marginTop: 15 }}>
                            <ProgressBar intent={"primary"} />
                        </div>
                    }
                </div>

            </Dialog>

            {/*  Done  */}

            <Dialog
                isOpen={isDoneOpen}
                onClose={() => { setIsDoneOpen(false) }}
                title="Published"
                portalClassName={settings.isDarkMode ? "bp4-dark" : ""}>

                <div style={{ margin: 15 }} >
                    <p>Map has been successfully published!</p>
                    <Button
                        icon={"share"}
                        text={"View Map"}
                        intent={"primary"}
                        onClick={() => {
                            window.open("https://levelimposter.net/map/" + map.id, "_blank");
                        }}
                    />
                </div>
            </Dialog>

            <AgreementDialog
                isOpen={isAgreementOpen}
                onAgree={() => {
                    setIsAgreementOpen(false);
                    publishMap(generateGUID());
                }}
                onCancel={() => {
                    setIsAgreementOpen(false);
                }}
            />
        </>
    );
}