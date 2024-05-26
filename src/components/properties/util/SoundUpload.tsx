import React from "react";
import { useTranslation } from "react-i18next";
import generateGUID from "../../../utils/generateGUID";
import openUploadDialog from "../../../utils/openUploadDialog";
import useAudioDownmixer from "../../../hooks/audio/useAudioDownmixer";
import useToaster from "../../../hooks/useToaster";
import { DEFAULT_VOLUME } from "../../../types/generic/Constants";
import LISound from "../../../types/li/LISound";
import LISoundChannel from "../../../types/li/LISoundChannel";
import AudioEditor from "./AudioEditor";
import { Check, CloudUpload, Refresh } from "@mui/icons-material";
import { Button, ButtonGroup, Select, Typography } from "@mui/material";
import useCreateMapAsset from "../../../hooks/assets/useCreateMapAsset";

interface SoundUploadProps {
    sound?: LISound;
    onChange: (soundURL: LISound) => void;
    onReset: () => void;

    title?: string;
    soundType?: string;
    onFinish?: () => void;
    loop?: boolean;
    editChannel?: boolean;
}

export default function SoundUpload(props: SoundUploadProps) {
    const { t } = useTranslation();
    const [isHovering, setIsHovering] = React.useState(false);
    const toaster = useToaster();
    const downmixAudio = useAudioDownmixer();
    const createMapAsset = useCreateMapAsset();

    const onUploadClick = React.useCallback(() => {
        return openUploadDialog("audio/*").then((blob) => {
            downmixAudio(blob).then((downmixedBlob) => {
                const asset = createMapAsset({
                    type: "audio",
                    blob: downmixedBlob
                });
                props.onChange({
                    id: props.sound?.id ?? generateGUID(),
                    type: props.soundType,
                    dataID: asset.id,
                    volume: DEFAULT_VOLUME,
                    isPreset: false
                });
            }).catch(toaster.error);
        });
    }, [props.onChange]);

    const onFileDrop = React.useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsHovering(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith("audio/")) {
                downmixAudio(file).then((downmixedBlob) => {
                    const asset = createMapAsset({ blob: downmixedBlob, type: "audio" });
                    props.onChange({
                        id: props.sound?.id ?? generateGUID(),
                        type: props.soundType,
                        dataID: asset.id,
                        volume: DEFAULT_VOLUME,
                        isPreset: false
                    });
                }).catch(toaster.error);
            } else {
                toaster.error(t("audio.errorInvalidType"));
            }
        }
    }, [props.onChange]);

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
            {/* Sound Preview */}
            {props.sound ? (
                <AudioEditor
                    title={props.title}
                    sound={props.sound}
                    onSoundChange={props.onChange}
                    loop={props.loop}
                />
            ) : (
                <Typography
                    variant={"subtitle2"}
                    sx={{ textAlign: "center", m: 2 }}
                >
                    {t("audio.notUploaded")}
                </Typography>
            )}

            {/* Channel */}
            {props.editChannel && (
                <Select
                    fullWidth
                    onChange={(e) => {
                        const channel = e.target.value as LISoundChannel;
                        if (props.sound)
                            props.onChange({
                                ...props.sound,
                                channel
                            });
                    }}
                >
                    {Object.values(LISoundChannel).map((channel) =>
                        t(`audio.${channel ?? LISoundChannel.SFX}`)
                    )}
                </Select>
            )}

            {/* Buttons */}
            <ButtonGroup fullWidth>
                <Button
                    color={"primary"}
                    onClick={() => onUploadClick()}
                    variant={"contained"}
                    size={"small"}
                >
                    <CloudUpload />
                </Button>
                <Button
                    color={"success"}
                    disabled={!props.onFinish}
                    onClick={props.onFinish}
                    variant={"contained"}
                    size={"small"}
                >
                    <Check />
                </Button>
                <Button
                    color={"error"}
                    onClick={props.onReset}
                    disabled={props.sound === undefined}
                    variant={"contained"}
                    size={"small"}
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
                    transition: "opacity 0.2s",
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
                    style={{ marginRight: 10, fontSize: 40 }}
                />
                <span
                    style={{
                        fontSize: 20,
                        fontWeight: "bold",
                    }}
                >
                    {t("audio.upload")}
                </span>
                <span
                    style={{
                        fontSize: 14,
                    }}
                >
                    {props.title}
                </span>

            </div>
        </div>
    );
}
