import React from "react";
import {useTranslation} from "react-i18next";
import openUploadDialog from "../../../utils/fileio/openUploadDialog";
import useToaster from "../../../hooks/useToaster";
import LIColor from "../../../types/li/LIColor";
import ColorPicker from "../../utils/ColorPicker";
import GUID from "../../../types/common/GUID";
import duplicateBlob from "../../../utils/fileio/duplicateBlob";
import {Box, Button, ButtonGroup} from "@mui/material";
import {CloudUpload, Done, HideImageOutlined, Refresh} from "@mui/icons-material";
import useAsset from "../../../hooks/assets/useAsset";
import SpriteWindow from "./SpriteWindow";
import parseAssetType from "../../../utils/fileio/parseAssetType";
import {useSettingsValue} from "@/hooks/useSettings";
import {convertImageBlobToDDS} from "@/utils/dds/convertImageToDDS";
import LISpriteAnimation from "../../../types/li/LISpriteAnimation";
import convertGIFToSpriteAnimation from "../../../utils/gif/convertGIFToSpriteAnimation";
import ImageUploadDetails from "./ImageUploadDetails";
import {createAsset} from "@editor/assets/createAsset";
import {MapAsset} from "@editor/assets/assetsStore";

interface ImageUploadProps {
    name: string;
    defaultSpriteURL?: string;
    assetID?: GUID;
    onUpload: (asset: MapAsset) => void;
    onUploadAnimation?: (animation: LISpriteAnimation) => void;
    onReset: () => void;

    isAnimated?: boolean;

    color?: LIColor;
    defaultColor?: LIColor;
    onColorChange?: (color: LIColor) => void;
    onFinish?: () => void;
    showName?: boolean;
}

export default function ImageUpload(props: ImageUploadProps) {
    const {t} = useTranslation();
    const [isHovering, setIsHovering] = React.useState(false);
    const toaster = useToaster();
    const asset = useAsset(props.assetID);
    const settings = useSettingsValue();

    const tryUploadFile = React.useCallback(async (file: File) => {

        // Duplicate the Blob to avoid issues with modifying the original file
        let blob = await duplicateBlob(file);

        // Identify the asset type
        const arrayBuffer = await blob.arrayBuffer();
        let assetType = parseAssetType(arrayBuffer);
        const isGIF = assetType === "image/gif";

        // Check if the asset type is valid
        if (!assetType.startsWith("image/"))
            throw new Error(t("sprite.errorInvalidType"));

        // Convert to DDS if needed
        if (settings.autoEncodeToDDS && !isGIF) {
            try {
                blob = await convertImageBlobToDDS(blob);
                assetType = "image/dds";
            } catch (e) {
                console.warn("Failed to convert image to DDS:", e);
            }
        }

        // Convert to Sprite Animation if needed
        if (settings.autoConvertGIFToAnimation && isGIF && props.onUploadAnimation) {
            try {
                const animation = await convertGIFToSpriteAnimation(blob);
                props.onUploadAnimation(animation);
                return;
            } catch (e) {
                console.warn("Failed to convert GIF to Sprite Animation:", e);
            }
        }

        // Create the Map Asset
        const newAsset = createAsset(assetType, blob);
        props.onUpload(newAsset);
    }, [props.onUpload, props.onUploadAnimation, settings.autoConvertGIFToAnimation, settings.autoEncodeToDDS, t]);

    // Handle Upload
    const onUploadClick = React.useCallback(() => {
        // Open the file upload dialog
        openUploadDialog("image/*")
            .then(tryUploadFile)    // Upload the file
            .catch(toaster.error);   // Warn on error
    }, [tryUploadFile, toaster]);

    // Handle Drag & Drop
    const onFileDrop = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsHovering(false);

        // Get the file from the drop event
        const files = e.dataTransfer.files;
        if (files.length === 0)
            return;
        const file = files[0];

        // Try to upload the file
        tryUploadFile(file)
            .catch(toaster.error);   // Warn on error
    }, [props.onUpload]);

    return (
        <div
            onDragOver={(e) => {
                e.preventDefault();
                setIsHovering(true);
            }}
            onDragLeave={(e) => {
                e.preventDefault();
                setIsHovering(false);
            }}
            onDrop={onFileDrop}
        >
            {/* Title */}
            {props.showName && (
                <h4 style={{marginTop: 2}}>
                    {props.name}
                </h4>
            )}

            {/* Image Preview */}
            <Box style={{textAlign: "center", padding: 1}}>
                <SpriteWindow
                    spriteID={props.assetID}
                    fallback={props.defaultSpriteURL ? (
                        <img
                            src={props.defaultSpriteURL}
                            alt={props.name}
                            style={{
                                maxWidth: 100,
                                maxHeight: 100,
                            }}
                        />
                    ) : (
                        <HideImageOutlined
                            style={{
                                width: 60,
                                height: 60,
                                color: "rgba(255, 255, 255, 0.5)",
                            }}
                        />
                    )}
                />
            </Box>

            {/* Details/Metadata */}
            <ImageUploadDetails assetID={props.assetID}/>

            {/* Buttons */}
            <ButtonGroup fullWidth>
                <Button
                    color={"primary"}
                    onClick={onUploadClick}
                >
                    <CloudUpload/>
                </Button>
                {props.onColorChange ? (
                    <ColorPicker
                        intent="success"
                        color={props.color ?? props.defaultColor ?? {r: 255, g: 255, b: 255, a: 255}}
                        onChange={props.onColorChange}
                    />
                ) : (
                    <Button
                        color="success"
                        disabled={!props.onFinish}
                        onClick={props.onFinish}
                    >
                        <Done/>
                    </Button>
                )}

                <Button
                    color={"error"}
                    onClick={props.onReset}
                    disabled={props.color === undefined && asset === undefined}
                >
                    <Refresh/>
                </Button>
            </ButtonGroup>

            {/* Drag & Drop File Upload */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 5,
                    right: 5,
                    bottom: 5,
                    borderRadius: 5,
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    opacity: isHovering ? 1 : 0,
                    transition: "opacity 0.1s",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    zIndex: 1000,
                    pointerEvents: "none",
                }}
            >

                <CloudUpload
                    style={{fontSize: 40}}
                />
                <span
                    style={{
                        fontSize: 20,
                        fontWeight: "bold",
                    }}
                >
                    {t("sprite.upload")}
                </span>
            </div>
        </div>
    );
}
