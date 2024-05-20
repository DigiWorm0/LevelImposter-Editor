import React from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useTranslation } from "react-i18next";
import { auth } from "../../utils/Firebase";
import { useMapAuthorName, useMapDescription, useMapIsPublic, useMapName } from "../../hooks/map/useMap";
import useToaster from "../../hooks/useToaster";
import usePublishMap from "../../hooks/firebase/usePublishMap";
import ThumbnailEdit from "../utils/ThumbnailEdit";
import useIsPublished from "../../hooks/firebase/useIsPublished";
import GenericModal from "./GenericModal";
import {
    Button,
    ButtonGroup,
    FormControlLabel,
    InputAdornment,
    LinearProgress,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import { CloudUpload, Update } from "@mui/icons-material";

export interface PublishModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PublishModal(props: PublishModalProps) {
    const { t } = useTranslation();
    const toaster = useToaster();
    const [user] = useAuthState(auth);

    // State Hooks
    const [thumbnail, setThumbnail] = React.useState<Blob | null>(null);
    const [uploadProgress, setProgress] = React.useState(0);
    const [isPublishing, setIsPublishing] = React.useState(false);

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

        // TODO: Atomize publish task

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
            if (!isNew)
                toaster.info(t("publish.cacheInfo"));

            // Close
            props.onClose();
            setIsPublishing(false);
        }).catch((err) => {
            console.error(err);
            toaster.danger(err.message);
            setIsPublishing(false);
        });
    }, [publishMap, thumbnail, toaster, t]);


    return (
        <GenericModal
            open={props.isOpen && isLoggedIn}
            onClose={props.onClose}
            title={t("publish.title")}
        >
            <ThumbnailEdit
                isDisabled={isPublishing}
                thumbnail={thumbnail}
                setThumbnail={setThumbnail}
            />
            <div style={{ padding: 10, paddingLeft: 30, paddingRight: 30 }}>
                <TextField
                    fullWidth
                    sx={{ marginBottom: 1 }}
                    disabled={isPublishing}
                    placeholder={t("publish.mapName")}
                    value={mapName}
                    onChange={(e) => setMapName(e.target.value)}
                />
                <TextField
                    fullWidth
                    sx={{ marginBottom: 1 }}
                    disabled={isPublishing}
                    placeholder={t("publish.authorName")}
                    value={authorName || user?.displayName || "Anonymous"}
                    onChange={(e) => setAuthorName(e.target.value)}
                    InputProps={{
                        startAdornment: (<InputAdornment position={"start"}>by </InputAdornment>),
                    }}
                />
                <TextField
                    fullWidth
                    sx={{ marginBottom: 1 }}
                    size={"small"}
                    disabled={isPublishing}
                    placeholder={t("publish.mapDescription")}
                    multiline
                    maxRows={12}
                    minRows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div style={{ textAlign: "center" }}>
                <RadioGroup
                    row
                    onChange={(e) => setIsPublic(e.currentTarget.value === "public")}
                    value={isPublic ? "public" : "private"}
                >
                    <FormControlLabel
                        control={<Radio color={"success"} />}
                        label={t("publish.public")}
                        value="public"
                    />
                    <FormControlLabel
                        control={<Radio color={"error"} />}
                        label={t("publish.private")}
                        value="private"
                    />
                </RadioGroup>
            </div>

            <ButtonGroup fullWidth>
                <Button
                    fullWidth
                    disabled={isPublishing}
                    startIcon={<CloudUpload />}
                    color={"primary"}
                    onClick={() => onPublishClick(true)}
                >
                    {t("publish.publishNew")}
                </Button>
                <Button
                    fullWidth
                    disabled={isPublishing || !isPublished}
                    startIcon={<Update />}
                    color={"error"}
                    onClick={() => onPublishClick(false)}
                >
                    {t("publish.publishUpdate") as string}
                </Button>
            </ButtonGroup>

            <div style={{ textAlign: "center", marginTop: 10 }}>
                <Typography
                    variant={"body2"}
                    sx={{ color: "text.secondary" }}
                >
                    By publishing, you agree to the
                    {" "}
                    <a href="https://levelimposter.net/#/policy" target="_blank">
                        rules & policies
                    </a>
                    {" "}
                    of the LevelImposter workshop.

                </Typography>

                {isPublishing && (
                    <LinearProgress variant="determinate" value={uploadProgress} sx={{ margin: 1 }} />
                )}
            </div>
        </GenericModal>
    );
}