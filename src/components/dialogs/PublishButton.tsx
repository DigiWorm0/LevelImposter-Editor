import { AnchorButton, Button, ButtonGroup, Dialog, EditableText, FormGroup, H1, ProgressBar } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { signOut } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, StorageReference, uploadBytesResumable } from "firebase/storage";
import React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from "react-i18next";
import { auth, db, storage } from "../../hooks/Firebase";
import generateGUID from "../../hooks/generateGUID";
import useMap from "../../hooks/jotai/useMap";
import { useSettingsValue } from "../../hooks/jotai/useSettings";
import useToaster from "../../hooks/useToaster";
import { THUMBNAIL_HEIGHT, THUMBNAIL_WIDTH } from "../../types/generic/Constants";
import GUID from "../../types/generic/GUID";
import LIMap from "../../types/li/LIMap";
import LIMetadata from "../../types/li/LIMetadata";
import AgreementDialog from "./AgreementDialog";
import PublishInfoDialog from "./PublishInfoDialog";

export default function PublishButton() {
    const { t } = useTranslation();
    const toaster = useToaster();
    const [isOpen, setIsOpen] = React.useState(false);
    const [isAgreementOpen, setIsAgreementOpen] = React.useState(false);
    const [isInfoOpen, setIsInfoOpen] = React.useState(false);
    const settings = useSettingsValue();
    const [map, setMap] = useMap();
    const [user] = useAuthState(auth);
    const [thumbnail, setThumbnail] = React.useState<Blob | undefined>(undefined);
    const [isPublishing, setIsPublishing] = React.useState(false);
    const [uploadProgress, setProgress] = React.useState(0);

    const isLoggedIn = user !== null;

    const publishMap = (id?: GUID) => {
        if (!user?.emailVerified) {
            toaster.danger(t("publish.errorEmailNotVerified"));
            return;
        }

        const mapID = id || map.id;
        const mapStorageRef = ref(storage, `maps/${user?.uid}/${mapID}.lim`);
        const imgStorageRef = ref(storage, `maps/${user?.uid}/${mapID}.png`);
        const storeRef = collection(db, "maps");
        const docRef = doc(storeRef, mapID);

        const serializeMap = (thumbnailURL: string | null) => {
            const mapData: LIMap = {
                id: mapID,
                v: map.v,
                name: map.name,
                description: map.description,
                isPublic: map.isPublic,
                isVerified: false,
                authorID: user?.uid ? user.uid : "",
                authorName: user?.displayName ? user.displayName : "",
                createdAt: new Date().getTime(),
                likeCount: 0,
                elements: map.elements,
                properties: map.properties,
                thumbnailURL: thumbnailURL,
            };
            const mapJSON = JSON.stringify(mapData);
            const mapBytes = new TextEncoder().encode(mapJSON);
            return {
                mapBytes,
                mapData,
            };
        }
        const uploadToStorage = (name: string, data: Uint8Array | Blob | ArrayBuffer, ref: StorageReference) => {
            const uploadTask = uploadBytesResumable(ref, data, { cacheControl: "public, max-age=31536000, immutable" });

            return new Promise<void>((resolve, reject) => {
                uploadTask.on("state_changed", (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`${name} upload is ${progress}% done`);
                    setProgress(progress / 100);
                }, (err) => {
                    reject(err);
                }, () => {
                    console.log(`${name} is uploaded to firebase storage: ${ref.fullPath}`);
                    resolve();
                });
            });
        }
        const uploadToFirestore = (mapData: LIMap) => {
            const metadata: LIMetadata = {
                v: mapData.v,
                id: mapData.id,
                name: mapData.name,
                description: mapData.description,
                isPublic: mapData.isPublic,
                isVerified: mapData.isVerified,
                authorID: mapData.authorID,
                authorName: mapData.authorName,
                createdAt: mapData.createdAt,
                likeCount: mapData.likeCount,
                thumbnailURL: mapData.thumbnailURL,
            };

            return new Promise<void>((resolve, reject) => {
                setDoc(docRef, metadata).then(() => {
                    console.log(`Map published to firestore: ${docRef.path}`);
                    toaster.success(t("publish.success"), "https://levelimposter.net/#/map/" + mapData.id);
                    resolve();
                }).catch((err) => {
                    reject(err);
                });
            });
        }
        const uploadTask = async () => {
            let thumbnailURL: string | null = null;
            if (thumbnail) {
                await uploadToStorage("Thumbnail", thumbnail, imgStorageRef);
                thumbnailURL = await getDownloadURL(imgStorageRef);
            }

            const { mapBytes, mapData } = serializeMap(thumbnailURL);
            await uploadToStorage("LIM", mapBytes, mapStorageRef);
            await uploadToFirestore(mapData);
            return mapData;
        }

        setIsPublishing(true);
        setProgress(0);
        uploadTask().then((mapData) => {
            setIsPublishing(false);
            setIsOpen(false);
            setMap(mapData);
        }).catch((err) => {
            console.error(err);
            toaster.danger(err.message);
            setIsPublishing(false);
        });
    }

    const resizeImage = (img: string, width: number, height: number) => {
        return new Promise<Blob>((resolve, reject) => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const image = new Image();
            image.src = img;
            image.onload = () => {
                canvas.width = width;
                canvas.height = height;
                ctx?.drawImage(image, 0, 0, width, height);
                canvas.toBlob((blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        reject("Failed to convert image to blob");
                    }
                }, "image/png");
            }
            image.onerror = (err) => {
                reject(err);
            }
        });
    }

    const uploadThumbnail = () => {
        console.log("Showing Upload Dialog");
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = () => {
            console.log("Uploaded File");
            if (input.files === null)
                return;
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result === null)
                    return;
                resizeImage(reader.result.toString(), THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT).then((img) => {
                    setThumbnail(img);
                });
            }
            reader.readAsDataURL(file);
        }
        input.click();
    }

    const canUpload = map.authorID === user?.uid || map.authorID === "";

    return (
        <>
            <Tooltip2
                fill
                content={(canUpload ? t("publish.title") : t("publish.errorNotAuthor")) as string}
                position="bottom">

                <AnchorButton
                    fill
                    disabled={!canUpload}
                    text={t("publish.title")}
                    icon="cloud-upload"
                    intent="success"
                    onClick={() => { setIsOpen(true) }}
                    style={{ marginTop: 15 }}
                />

            </Tooltip2>

            {/*  Publish  */}

            <Dialog
                isOpen={isOpen && isLoggedIn}
                onClose={() => { setIsOpen(isPublishing) }}
                title={t("publish.title")}
                portalClassName={settings.isDarkMode === false ? "" : "bp4-dark"}>

                <div style={{ margin: 15 }} >

                    <FormGroup
                        label={t("account.signedInAs", { name: user?.displayName })}
                        disabled={isPublishing}>
                        <Button
                            disabled={isPublishing}
                            icon={"user"}
                            text={t("account.signOut")}
                            intent={"danger"}
                            onClick={() => {
                                signOut(auth);
                            }} />
                    </FormGroup>

                    <FormGroup
                        disabled={isPublishing}
                        style={{ textAlign: "center" }}
                        label={`${THUMBNAIL_WIDTH}x${THUMBNAIL_HEIGHT} ${t("publish.thumbnail")}`}>

                        <img
                            src={thumbnail ? URL.createObjectURL(thumbnail) : ""}
                            style={{ width: THUMBNAIL_WIDTH, height: THUMBNAIL_HEIGHT, borderRadius: 5, border: "1px solid rgb(96, 96, 96)" }} />
                        <ButtonGroup minimal fill>
                            <Button
                                fill
                                minimal
                                disabled={isPublishing}
                                icon={"refresh"}
                                text={t("publish.resetThumbnail") as string}
                                onClick={() => {
                                    setThumbnail(undefined);
                                }} />
                            <Button
                                fill
                                minimal
                                disabled={isPublishing}
                                icon={"upload"}
                                text={t("publish.uploadThumbnail") as string}
                                onClick={uploadThumbnail} />
                        </ButtonGroup>
                    </FormGroup>
                    <div style={{ padding: 15 }}>
                        <H1>
                            <EditableText
                                selectAllOnFocus
                                disabled={isPublishing}
                                value={map.name}
                                placeholder={t("publish.mapName") as string}
                                onChange={(value) => {
                                    setMap({
                                        ...map,
                                        name: value,
                                    })
                                }} />
                        </H1>
                        <EditableText
                            multiline
                            maxLines={12}
                            minLines={3}
                            selectAllOnFocus
                            disabled={isPublishing}
                            value={map.description}
                            placeholder={t("publish.mapDescription") as string}
                            onChange={(value) => {
                                setMap({
                                    ...map,
                                    description: value,
                                })
                            }} />
                    </div>

                    <ButtonGroup fill>
                        <Button
                            fill
                            style={{ marginRight: 10 }}
                            disabled={isPublishing}
                            icon={"cloud-upload"}
                            text={t("publish.publishPublic") as string}
                            intent={"primary"}
                            onClick={() => {
                                setMap({
                                    ...map,
                                    isPublic: true,
                                });
                                setIsAgreementOpen(true);
                            }}
                        />
                        <Button
                            fill
                            style={{ marginRight: 10 }}
                            disabled={isPublishing}
                            icon={"eye-off"}
                            text={t("publish.publishPrivate") as string}
                            intent={"danger"}
                            onClick={() => {
                                setMap({
                                    ...map,
                                    isPublic: false,
                                });
                                setIsAgreementOpen(true);
                            }}
                        />

                    </ButtonGroup>

                    {isPublishing &&
                        <div style={{ marginTop: 15 }}>
                            <ProgressBar
                                intent={"primary"}
                                value={uploadProgress} />
                        </div>
                    }
                </div>

            </Dialog>

            <AgreementDialog
                isOpen={isAgreementOpen}
                onAgree={() => {
                    setIsAgreementOpen(false);
                    setIsInfoOpen(true);
                }}
                onCancel={() => {
                    setIsAgreementOpen(false);
                }}
            />
            <PublishInfoDialog
                isOpen={isInfoOpen}
                onAgree={() => {
                    setIsInfoOpen(false);
                    publishMap(generateGUID());
                }}
                onCancel={() => {
                    setIsInfoOpen(false);
                }}
            />

        </>
    );
}