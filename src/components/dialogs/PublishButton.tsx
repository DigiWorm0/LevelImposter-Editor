import { Alert, Button, ButtonGroup, Classes, ControlGroup, Dialog, Divider, FormGroup, InputGroup, Label, ProgressBar, Text, TextArea } from "@blueprintjs/core";
import React from "react";
import useSettings from "../../hooks/useSettings";
import { auth, db, githubProvider, googleProvider, storage } from "../../hooks/Firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithPopup, signOut } from "firebase/auth";
import useMap from "../../hooks/useMap";
import { useElements } from "../../hooks/useElement";
import LIMapFile from "../../types/li/LIMapFile";
import LIMetadata from "../../types/li/LIMetadata";
import generateGUID from "../../hooks/generateGUID";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

export default function PublishButton() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isDoneOpen, setIsDoneOpen] = React.useState(false);
    const [settings] = useSettings();
    const [map, setMap] = useMap();
    const [elements] = useElements(map.elementIDs);
    const [user] = useAuthState(auth);
    const [isPublishing, setIsPublishing] = React.useState(false);

    const isLoggedIn = user !== null;
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

    const publishMap = async () => {
        setIsPublishing(true);

        // Update
        map.id = generateGUID();
        setMap(map);

        // Parse
        const mapData: LIMapFile = {
            id: map.id,
            v: map.v,
            name: map.name,
            description: map.description,
            elements,
        };
        const mapJSON = JSON.stringify(mapData);

        // Storage
        const storageRef = ref(storage, `maps/${user?.uid}/${mapData.id}.lim`);
        const storageDoc = await uploadString(storageRef, mapJSON);
        const storageURL = await getDownloadURL(storageDoc.ref);
        console.log(`Map uploaded to ${storageURL}`);

        // Firestore
        const storeRef = collection(db, "maps");
        const mapDocument = await addDoc(storeRef, {
            id: mapData.id,
            name: mapData.name,
            description: mapData.description,
            authorID: user?.uid,
            downloadURL: storageURL,
        } as LIMetadata);
        console.log(`Map added to Firestore: ${mapDocument.id}`);

        setIsPublishing(false);
        setIsOpen(false);
        setIsDoneOpen(true);
    }

    return (
        <>
            <Button
                className={Classes.MINIMAL}
                icon="cloud-upload"
                text="Publish"
                onClick={() => { setIsOpen(true) }} />

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
                                    alert(err.message);
                                })
                            }}
                        />
                        <Button
                            icon={githubIcon}
                            text="Github"
                            onClick={() => {
                                signInWithPopup(auth, githubProvider).catch((err) => {
                                    alert(err.message);
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

                    <Divider />

                    <FormGroup label="Title" disabled={isPublishing}>
                        <InputGroup
                            large
                            disabled={isPublishing}
                            placeholder="Title"
                            value={map.name}
                            onChange={(e) => { setMap({ ...map, name: e.target.value }) }} />
                    </FormGroup>
                    <FormGroup label="Description" disabled={isPublishing}>
                        <TextArea
                            fill
                            growVertically
                            large
                            disabled={isPublishing}
                            placeholder="Description"
                            value={map.description}
                            onChange={(e) => { setMap({ ...map, description: e.target.value }) }} />
                    </FormGroup>

                    <Button
                        disabled={isPublishing}
                        icon={"cloud-upload"}
                        text={"Publish"}
                        intent={"primary"}
                        onClick={() => {
                            publishMap();
                        }}
                    />

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
        </>
    );
}