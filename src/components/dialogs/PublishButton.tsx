import {
    AnchorButton,
    Button,
    ButtonGroup,
    Classes,
    Dialog,
    EditableText,
    H1,
    H5,
    ProgressBar,
    Radio,
    RadioGroup,
    Tooltip
} from "@blueprintjs/core";
import React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from "react-i18next";
import { auth } from "../../hooks/utils/Firebase";
import { useMapAuthorName, useMapDescription, useMapIsPublic, useMapName } from "../../hooks/jotai/useMap";
import { useSettingsValue } from "../../hooks/jotai/useSettings";
import useToaster from "../../hooks/useToaster";
import usePublishMap from "../../hooks/usePublishMap";
import ThumbnailEdit from "../utils/ThumbnailEdit";
import useIsPublished from "../../hooks/jotai/useIsPublished";

export default function PublishButton() {
    const { t } = useTranslation();
    const toaster = useToaster();
    const [user] = useAuthState(auth);
    const settings = useSettingsValue();

    // State Hooks
    const [thumbnail, setThumbnail] = React.useState<Blob | null>(null);
    const [uploadProgress, setProgress] = React.useState(0);
    const [isPublishing, setIsPublishing] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);

    // Map Hooks
    const [mapName, setMapName] = useMapName();
    const [description, setDescription] = useMapDescription();
    const [authorName, setAuthorName] = useMapAuthorName();
    const [isPublic, setIsPublic] = useMapIsPublic();
    const isPublished = useIsPublished();
    const publishMap = usePublishMap();

    const isLoggedIn = user !== null;

    /**
     * Publishes the map to the workshop.
     */
    const onPublishClick = React.useCallback((isNew: boolean) => {
        setProgress(0);
        setIsPublishing(true);

        // Run task
        publishMap(thumbnail, isNew, setProgress).then((id) => {

            // Open Link
            const link = `https://levelimposter.net/#/map/${id}`;
            const win = window.open(link, "_blank");
            win?.focus();

            // Toast
            toaster.success(t("publish.success"), link);

            // Close
            setIsOpen(false);
            setIsPublishing(false);
        }).catch((err) => {
            console.error(err);
            toaster.danger(err.message);
            setIsPublishing(false);
        });
    }, [publishMap, thumbnail, toaster, t]);


    return (
        <>
            <Tooltip
                fill
                content={t("publish.title") as string}
                position="bottom"
            >
                <AnchorButton
                    fill
                    text={t("publish.title")}
                    icon={"cloud-upload"}
                    onClick={() => {
                        setIsOpen(true)
                    }}
                    style={{ marginTop: 5 }}
                    intent={"primary"}
                    disabled={isPublishing || !isLoggedIn}
                />
            </Tooltip>

            {/*  Publish  */}

            <Dialog
                isOpen={isOpen && isLoggedIn}
                onClose={() => {
                    setIsOpen(isPublishing)
                }}
                title={t("publish.title")}
                portalClassName={settings.isDarkMode === false ? "" : "bp5-dark"}
            >
                <div style={{ margin: 15 }}>
                    <ThumbnailEdit
                        isDisabled={isPublishing}
                        thumbnail={thumbnail}
                        setThumbnail={setThumbnail}
                    />
                    <div style={{ padding: 30, paddingBottom: 10 }}>
                        <H1>
                            <EditableText
                                selectAllOnFocus
                                disabled={isPublishing}
                                placeholder={t("publish.mapName") as string}
                                value={mapName}
                                onChange={setMapName}
                            />
                        </H1>
                        <H5>
                            by{" "}
                            <EditableText
                                selectAllOnFocus
                                disabled={isPublishing}
                                placeholder={t("publish.authorName") as string}
                                value={authorName || user?.displayName || "Anonymous"}
                                onChange={setAuthorName}
                            />
                        </H5>
                        <EditableText
                            multiline
                            maxLines={12}
                            minLines={3}
                            selectAllOnFocus
                            disabled={isPublishing}
                            placeholder={t("publish.mapDescription") as string}
                            value={description}
                            onChange={setDescription}
                        />
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <RadioGroup
                            disabled={isPublishing}
                            onChange={(e) => setIsPublic(e.currentTarget.value === "public")}
                            selectedValue={isPublic ? "public" : "private"}
                            inline
                        >
                            <Radio
                                label={t("publish.public")}
                                value="public"
                            />
                            <Radio
                                label={t("publish.private")}
                                value="private"
                            />
                        </RadioGroup>
                    </div>


                    <ButtonGroup fill>
                        <Button
                            style={{ margin: 5 }}
                            fill
                            disabled={isPublishing}
                            icon={"cloud-upload"}
                            text={t("publish.publishNew") as string}
                            intent={"primary"}
                            onClick={() => onPublishClick(true)}
                        />
                        <Button
                            style={{ margin: 5 }}
                            fill
                            disabled={isPublishing || !isPublished}
                            icon={"updated"}
                            text={t("publish.publishUpdate") as string}
                            intent={"danger"}
                            onClick={() => onPublishClick(false)}
                        />
                    </ButtonGroup>

                    <div style={{ textAlign: "center", marginTop: 10 }}>
                        <p className={Classes.TEXT_MUTED}>
                            By publishing, you agree to the
                            {" "}
                            <a href="https://levelimposter.net/#/policy" target="_blank">
                                rules & policies
                            </a>
                            {" "}
                            of the LevelImposter workshop.
                        </p>
                    </div>

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
        </>
    );
}