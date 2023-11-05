import {
    AnchorButton,
    Button,
    ButtonGroup,
    Dialog,
    EditableText,
    FormGroup,
    H1,
    H5,
    ProgressBar
} from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { signOut } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, StorageReference, uploadBytesResumable } from "firebase/storage";
import React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from "react-i18next";
import { auth, db, storage } from "../../hooks/utils/Firebase";
import generateGUID from "../../hooks/utils/generateGUID";
import useMap from "../../hooks/jotai/useMap";
import { useSettingsValue } from "../../hooks/jotai/useSettings";
import openUploadDialog from "../../hooks/utils/openUploadDialog";
import useToaster from "../../hooks/useToaster";
import { THUMBNAIL_HEIGHT, THUMBNAIL_WIDTH } from "../../types/generic/Constants";
import GUID from "../../types/generic/GUID";
import LIMap from "../../types/li/LIMap";
import LIMetadata from "../../types/li/LIMetadata";
import AgreementDialog from "./AgreementDialog";
import useLISerializer from "../../hooks/useLISerializer";

export default function PublishButton() {
    const { t } = useTranslation();
    const toaster = useToaster();
    const [isOpen, setIsOpen] = React.useState(false);
    const [isAgreementOpen, setIsAgreementOpen] = React.useState(false);
    const settings = useSettingsValue();
    const [map, setMap] = useMap();
    const [user] = useAuthState(auth);
    const [thumbnail, setThumbnail] = React.useState<Blob | undefined>(undefined);
    const [isPublishing, setIsPublishing] = React.useState(false);
    const [uploadProgress, setProgress] = React.useState(0);
    const serializeMap = useLISerializer();

    const isLoggedIn = user !== null;
    const isRemixed = !(map.authorID === user?.uid || map.authorID === "");

    const publishMap = React.useCallback(async (id?: GUID) => {
        if (!user?.emailVerified) {
            toaster.danger(t("publish.errorEmailNotVerified"));
            return;
        }

        const oldMapID = map.id;
        const mapID = id || map.id;
        const mapStorageRef = ref(storage, `maps/${user?.uid}/${mapID}.lim2`);
        const imgStorageRef = ref(storage, `maps/${user?.uid}/${mapID}.png`);
        const storeRef = collection(db, "maps");
        const docRef = doc(storeRef, mapID);

        const serializeMapData = async (thumbnailURL: string | null) => {
            const mapData: LIMap = {
                id: mapID,
                v: map.v,
                name: map.name,
                description: map.description,
                isPublic: map.isPublic,
                isVerified: false,
                authorID: user?.uid ?? "",
                authorName: map.authorName,
                createdAt: new Date().getTime(),
                likeCount: 0,
                elements: map.elements,
                properties: map.properties,
                thumbnailURL: thumbnailURL,
                remixOf: isRemixed ? oldMapID : map.remixOf,
                assets: map.assets ?? [],
            };
            const mapBytes = await serializeMap(mapData);

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
                remixOf: mapData.remixOf,
            };

            return new Promise<void>((resolve, reject) => {
                setDoc(docRef, metadata).then(() => {
                    console.log(`Map published to firestore: ${docRef.path}`);

                    const link = `https://levelimposter.net/#/map/${mapData.id}`;
                    toaster.success(t("publish.success"), link);
                    const win = window.open(link, "_blank");
                    win?.focus();

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

            const { mapBytes, mapData } = await serializeMapData(thumbnailURL);
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
    }, [map, user, isRemixed, setMap, toaster, t]);

    const resizeImage = React.useCallback((blob: Blob, width: number, height: number) => {
        return new Promise<Blob>((resolve, reject) => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const image = new Image();
            image.src = URL.createObjectURL(blob);
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
    }, []);

    const uploadThumbnail = React.useCallback(() => {
        openUploadDialog("image/*").then((blob) => {
            return resizeImage(blob, THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT);
        }).then((img) => {
            setThumbnail(img);
        }).catch((err) => {
            console.error(err);
            toaster.danger(err.message);
        });
    }, [resizeImage, toaster]);

    React.useEffect(() => {
        const authorName = user?.displayName ?? "Anonymous";
        if (user && isOpen && map.authorName !== authorName) {
            setMap({
                ...map,
                authorName: user?.displayName ?? "Anonymous",
            });
            console.log("Author name updated");
        }
    }, [user, isOpen, setMap]); // "map" is deliberately excluded

    return (
        <>
            <Tooltip2
                fill
                content={t("publish.title") as string}
                position="bottom"
            >
                <AnchorButton
                    fill
                    text={isRemixed ? t("publish.publishRemix") : t("publish.title")}
                    icon={isRemixed ? "random" : "cloud-upload"}
                    onClick={() => {
                        setIsOpen(true)
                    }}
                    style={{ marginTop: 5 }}
                    intent={"primary"}
                    disabled={map.elements.length === 0 || isPublishing || !isLoggedIn}
                />
            </Tooltip2>

            {/*  Publish  */}

            <Dialog
                isOpen={isOpen && isLoggedIn}
                onClose={() => {
                    setIsOpen(isPublishing)
                }}
                title={t("publish.title")}
                portalClassName={settings.isDarkMode === false ? "" : "bp4-dark"}
            >
                <div style={{ margin: 15 }}>
                    <FormGroup
                        label={t("account.signedInAs", { name: user?.displayName })}
                        disabled={isPublishing}
                    >
                        <Button
                            disabled={isPublishing}
                            icon={"user"}
                            text={t("account.signOut")}
                            intent={"danger"}
                            onClick={() => {
                                signOut(auth);
                            }}
                        />
                    </FormGroup>
                    <FormGroup
                        disabled={isPublishing}
                        style={{ textAlign: "center" }}
                        label={`${THUMBNAIL_WIDTH}x${THUMBNAIL_HEIGHT} ${t("publish.thumbnail")}`}
                    >
                        <img
                            src={thumbnail ? URL.createObjectURL(thumbnail) : "/DefaultThumbnail.png"}
                            style={{
                                width: THUMBNAIL_WIDTH,
                                height: THUMBNAIL_HEIGHT,
                                borderRadius: 5,
                                border: "1px solid rgb(96, 96, 96)"
                            }}
                        />
                        <ButtonGroup minimal fill>
                            <Button
                                fill
                                minimal
                                disabled={isPublishing}
                                icon={"refresh"}
                                text={t("publish.resetThumbnail") as string}
                                onClick={() => {
                                    setThumbnail(undefined);
                                }}
                            />
                            <Button
                                fill
                                minimal
                                disabled={isPublishing}
                                icon={"upload"}
                                text={t("publish.uploadThumbnail") as string}
                                onClick={uploadThumbnail}
                            />
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
                                }}
                            />
                        </H1>
                        <H5>
                            by{" "}
                            <EditableText
                                selectAllOnFocus
                                disabled={isPublishing}
                                defaultValue={user?.displayName ?? "Anonymous"}
                                placeholder={t("publish.authorName") as string}
                                onChange={(value) => {
                                    setMap({
                                        ...map,
                                        authorName: value,
                                    });
                                }}
                            />
                        </H5>
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
                            }}
                        />
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
                                value={uploadProgress}
                            />
                        </div>
                    }
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