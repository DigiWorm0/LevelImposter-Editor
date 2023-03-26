import { Button, ButtonGroup, Icon } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import openUploadDialog from "../../../hooks/openUploadDialog";
import useToaster from "../../../hooks/useToaster";
import LIColor from "../../../types/li/LIColor";
import ColorPicker from "../../utils/ColorPicker";
import SizeTag from "../../utils/SizeTag";

interface ImageUploadProps {
    name: string;
    defaultSpriteURL: string;
    spriteURL?: string;
    onUpload: (spriteURL: string) => void;
    onReset: () => void;

    color?: LIColor;
    defaultColor?: LIColor;
    onColorChange?: (color: LIColor) => void;
    onFinish?: () => void;
}

export default function ImageUpload(props: ImageUploadProps) {
    const { t } = useTranslation();
    const [isHovering, setIsHovering] = React.useState(false);
    const toaster = useToaster();

    const spriteSize = React.useMemo(() => {
        return props.spriteURL?.length ?? 0;
    }, [props.spriteURL]);

    const onUploadClick = React.useCallback(() => {
        openUploadDialog("image/*").then((result) => {
            if (result)
                props.onUpload(result);
        });
    }, [props.onUpload]);

    const onFileDrop = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsHovering(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target?.result)
                        props.onUpload(e.target.result as string);
                };
                reader.readAsDataURL(file);
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
            {/* Image Preview */}
            <div style={{ textAlign: "center", padding: 15 }}>
                <img
                    style={{
                        maxHeight: 100,
                        maxWidth: 100
                    }}
                    src={props.spriteURL ?? props.defaultSpriteURL}
                    alt={props.name}

                />
            </div>

            {/* Size Tag */}
            <div style={{ textAlign: "center", marginBottom: 10 }}>
                <SizeTag
                    sizeBytes={spriteSize}
                    warningMsg={t("sprite.errorSize") as string}
                    okMsg={t("sprite.okSize") as string}
                />
            </div>

            {/* Buttons */}
            <ButtonGroup fill>
                <Button
                    icon="cloud-upload"
                    intent="primary"
                    onClick={() => onUploadClick()}
                    style={{ margin: 3 }}
                />
                {props.onColorChange ? (
                    <ColorPicker
                        intent="success"
                        color={props.color ?? props.defaultColor ?? { r: 255, g: 255, b: 255, a: 255 }}
                        style={{ margin: 3 }}
                        onChange={props.onColorChange}
                    />
                ) : (
                    <Button
                        icon="tick"
                        intent="success"
                        style={{ margin: 3 }}
                        disabled={!props.onFinish}
                        onClick={props.onFinish}
                    />
                )}

                <Button
                    icon="refresh"
                    intent="danger"
                    onClick={props.onReset}
                    style={{ margin: 3 }}
                    disabled={props.color === undefined && props.spriteURL === undefined}
                />
            </ButtonGroup>

            {/* Drag & Drop File Upload */}
            <div
                style={{
                    position: "absolute",
                    top: 5,
                    left: 5,
                    right: 5,
                    bottom: 5,
                    borderRadius: 5,
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    opacity: isHovering ? 1 : 0,
                    transition: "opacity 0.2s",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                    zIndex: 1000,
                    pointerEvents: "none",
                }}>
                <Icon
                    icon="cloud-upload"
                    style={{ marginRight: 10 }}
                />
                {t("sprite.upload")}
            </div>
        </div>
    );
}
