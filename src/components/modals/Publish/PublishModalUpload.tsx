import { Box, Button, LinearProgress, Typography } from "@mui/material";
import usePublishMap from "../../../hooks/firebase/publish/usePublishMap";
import React from "react";
import PublishModalUploadPreview from "./PublishModalUploadPreview";
import useToaster from "../../../hooks/useToaster";

export interface PublishModalUploadProps {
    onClose: () => void;
}

export default function PublishModalUpload(props: PublishModalUploadProps) {
    const [isPublishing, setIsPublishing] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const publishMap = usePublishMap();
    const toaster = useToaster();

    const onPublish = React.useCallback(() => {
        setIsPublishing(true);
        publishMap(setProgress).then((id) => {
            setIsPublishing(false);
            window.open(`https://levelimposter.net/#/map/${id}`, "_blank");
            props.onClose();
        }).catch((e) => {
            setIsPublishing(false);
            toaster.error(e);
        });
    }, [publishMap]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
        >
            <PublishModalUploadPreview />
            {isPublishing ? (
                <Box sx={{ width: "100%", mt: 3, mb: 3 }}>
                    <LinearProgress
                        color={"primary"}
                        variant={"determinate"}
                        value={progress * 100}
                    />
                </Box>
            ) : (
                <Button
                    variant={"contained"}
                    sx={{ m: 1 }}
                    fullWidth
                    onClick={onPublish}
                >
                    Publish
                </Button>
            )}
            <Typography
                variant={"body2"}
                color={"textSecondary"}
                sx={{ textAlign: "center" }}
            >
                By publishing, you agree to abide by the
                {" "}
                <a href="https://levelimposter.net/#/policy" target="_blank">
                    rules & policies
                </a>
                {" "}
                of the LevelImposter workshop.
            </Typography>

        </Box>
    );
}
