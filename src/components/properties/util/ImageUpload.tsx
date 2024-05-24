import React from "react";
import { useTranslation } from "react-i18next";
import openUploadDialog from "../../../utils/openUploadDialog";
import useToaster from "../../../hooks/useToaster";
import LIColor from "../../../types/li/LIColor";
import ColorPicker from "../../utils/ColorPicker";
import MapAsset from "../../../types/li/MapAsset";
import GUID from "../../../types/generic/GUID";
import duplicateBlob from "../../../utils/duplicateBlob";
import { Button, ButtonGroup } from "@mui/material";
import { CloudUpload, Done, Refresh } from "@mui/icons-material";
import useCreateMapAsset from "../../../hooks/map/assets/useCreateMapAsset";
import { useMapAssetValue } from "../../../hooks/map/assets/useMapAsset";

interface ImageUploadProps {
    name: string;
    defaultSpriteURL: string;
    assetID?: GUID;
    onUpload: (asset: MapAsset) => void;
    onReset: () => void;

    color?: LIColor;
    defaultColor?: LIColor;
    onColorChange?: (color: LIColor) => void;
    onFinish?: () => void;
    showName?: boolean;
}

export default function ImageUpload(props: ImageUploadProps) {
    const { t } = useTranslation();
    const [isHovering, setIsHovering] = React.useState(false);
    const toaster = useToaster();
    const asset = useMapAssetValue(props.assetID);
    const createMapAsset = useCreateMapAsset();

    // Handle Upload
    const onUploadClick = React.useCallback(() => {
        openUploadDialog("image/*").then((blob) => {
            return duplicateBlob(blob);
        }).then((blob) => {
            props.onUpload(createMapAsset({ type: "image", blob }));
        }).catch((e) => {
            console.warn(e);
            toaster.warning(e);
        });
    }, [props.onUpload]);

    // Handle Drag & Drop
    const onFileDrop = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsHovering(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith("image/")) {
                duplicateBlob(file).then((blob) => {
                    props.onUpload(createMapAsset(blob));
                }).catch((e) => {
                    console.warn(e);
                    toaster.warning(e);
                });
            } else {
                toaster.danger(t("sprite.errorInvalidType"));
            }
        }
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
                <h4 style={{
                    marginTop: 2
                }}>
                    {props.name}
                </h4>
            )}

            {/* Image Preview */}
            <div style={{ textAlign: "center", padding: 15 }}>
                <img
                    style={{
                        maxHeight: 100,
                        maxWidth: 100
                    }}
                    src={asset?.url ?? props.defaultSpriteURL}
                    alt={props.name}
                />
            </div>

            {/* Buttons */}
            <ButtonGroup fullWidth>
                <Button
                    color={"primary"}
                    onClick={onUploadClick}
                >
                    <CloudUpload />
                </Button>
                {props.onColorChange ? (
                    <ColorPicker
                        intent="success"
                        color={props.color ?? props.defaultColor ?? { r: 255, g: 255, b: 255, a: 255 }}
                        onChange={props.onColorChange}
                    />
                ) : (
                    <Button
                        color="success"
                        disabled={!props.onFinish}
                        onClick={props.onFinish}
                    >
                        <Done />
                    </Button>
                )}

                <Button
                    color={"error"}
                    onClick={props.onReset}
                    disabled={props.color === undefined && asset === undefined}
                >
                    <Refresh />
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
                }}>

                <CloudUpload
                    style={{ marginRight: 10, fontSize: 40 }}
                />
                <span style={{
                    fontSize: 20,
                    fontWeight: "bold",
                }}>
                    {t("sprite.upload")}
                </span>
                <span style={{
                    fontSize: 14,
                }}>
                    {props.name}
                </span>
            </div>
        </div>
    );
}
