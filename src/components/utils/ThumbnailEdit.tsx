import { THUMBNAIL_HEIGHT, THUMBNAIL_WIDTH } from "../../types/generic/Constants";
import React from "react";
import openUploadDialog from "../../utils/openUploadDialog";
import useToaster from "../../hooks/useToaster";
import { useTranslation } from "react-i18next";
import { useMapValue } from "../../hooks/map/useMap";
import { Button, ButtonGroup, FormLabel } from "@mui/material";
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
            .catch(console.error);
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

        uploadThumbnail().catch((e) => {
            console.error(e);
            toaster.danger(e.message);
        });
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
        <div style={{ textAlign: "center" }}>
            <FormLabel>
                {`${THUMBNAIL_WIDTH}x${THUMBNAIL_HEIGHT} ${t("publish.thumbnail")}`}
            </FormLabel>
            <img
                src={thumbnailURL}
                alt={"Thumbnail"}
                width={THUMBNAIL_WIDTH}
                height={THUMBNAIL_HEIGHT}
                style={{
                    borderRadius: 5,
                    border: "1px solid rgb(96, 96, 96)"
                }}
            />
            <ButtonGroup fullWidth>
                <Button
                    fullWidth
                    disabled={props.isDisabled}
                    startIcon={<CloudUpload />}
                    onClick={onUploadClick}
                >
                    {t("publish.uploadThumbnail") as string}
                </Button>
                <Button
                    fullWidth
                    disabled={props.isDisabled}
                    startIcon={<Refresh />}
                    onClick={() => props.setThumbnail(null)}
                    color={"error"}
                >
                    {t("publish.resetThumbnail") as string}
                </Button>
            </ButtonGroup>
        </div>
    )
}