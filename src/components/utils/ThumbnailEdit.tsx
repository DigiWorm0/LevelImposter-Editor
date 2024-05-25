import { THUMBNAIL_HEIGHT, THUMBNAIL_WIDTH } from "../../types/generic/Constants";
import React from "react";
import openUploadDialog from "../../utils/openUploadDialog";
import useToaster from "../../hooks/useToaster";
import { useTranslation } from "react-i18next";
import { useMapValue } from "../../hooks/map/useMap";
import { Box, Button, ButtonGroup, CardMedia, Typography } from "@mui/material";
import { CloudUpload, Refresh } from "@mui/icons-material";

export interface ThumbnailEditProps {
    thumbnail: Blob | null;
    setThumbnail: (thumbnail: Blob | null) => void

    isDisabled?: boolean;
}

export default function ThumbnailEdit(props: ThumbnailEditProps) {
    const map = useMapValue();
    const toaster = useToaster();
    const [thumbnailURL, setThumbnailURL] = React.useState("/DefaultThumbnail.png");
    const { t } = useTranslation();

    /**
     * Set default thumbnail.
     */
    React.useEffect(() => {
        if (!map.thumbnailURL || props.thumbnail)
            return;
        fetch(map.thumbnailURL)
            .then((response) => response.blob())
            .then((blob) => props.setThumbnail(blob))
            .catch(toaster.error);
    }, [map.thumbnailURL, props.setThumbnail]);

    /**
     * Resizes an image to the specified width and height.
     */
    const resizeImage = React.useCallback(async (
        blob: Blob,
        width: number,
        height: number
    ) => {

        // Create Canvas
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.src = URL.createObjectURL(blob);

        // Wait for image to load
        await new Promise((resolve, reject) => {
            image.onload = resolve;
            image.onerror = reject;
        });

        // Draw Image
        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(image, 0, 0, width, height);

        // Convert to Blob
        const resizedBlob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob)
                    return reject(new Error(t("publish.errorBlobConvert")));
                return resolve(blob);
            }, "image/png");
        });

        // Return Blob
        URL.revokeObjectURL(image.src);
        return resizedBlob;
    }, [t]);

    /**
     * Uploads and resizes a thumbnail.
     */
    const onUploadClick = React.useCallback(() => {
        const uploadThumbnail = async () => {
            const imageBlob = await openUploadDialog("image/*");
            const resizedBlob = await resizeImage(imageBlob, THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT);
            props.setThumbnail(resizedBlob);
        }

        uploadThumbnail().catch(toaster.error);
    }, [props, resizeImage, toaster]);

    // Manage Object URL
    React.useEffect(() => {
        // Default Thumbnail
        if (!props.thumbnail) {
            setThumbnailURL("/DefaultThumbnail.png");
            return;
        }

        // Set Object URL
        const objectURL = URL.createObjectURL(props.thumbnail);
        setThumbnailURL(objectURL);
        return () => {
            URL.revokeObjectURL(objectURL);
        }
    }, [props.thumbnail]);

    return (
        <Box
            sx={{
                textAlign: "center",
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography
                variant={"subtitle2"}
                color={"text.secondary"}
            >
                {`${THUMBNAIL_WIDTH}x${THUMBNAIL_HEIGHT} ${t("publish.thumbnail")}`}
            </Typography>
            <Box sx={{ maxWidth: THUMBNAIL_WIDTH }}>
                <CardMedia
                    component={"img"}
                    src={thumbnailURL}
                    alt={"Thumbnail"}
                    sx={{
                        borderRadius: 1
                    }}
                />
                <ButtonGroup fullWidth>
                    <Button
                        disabled={props.isDisabled}
                        startIcon={<CloudUpload />}
                        onClick={onUploadClick}
                        variant={"text"}
                    >
                        {t("publish.uploadThumbnail") as string}
                    </Button>
                    <Button
                        disabled={props.isDisabled}
                        startIcon={<Refresh />}
                        onClick={() => props.setThumbnail(null)}
                        color={"error"}
                        variant={"text"}
                    >
                        {t("publish.resetThumbnail") as string}
                    </Button>
                </ButtonGroup>
            </Box>
        </Box>
    )
}