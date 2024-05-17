import { MenuItem2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import React from "react";
import { useTranslation } from "react-i18next";
import generateGUID from "../../../utils/generateGUID";
import openUploadDialog from "../../../utils/openUploadDialog";
import useAudioDownmixer from "../../../hooks/audio/useAudioDownmixer";
import useToaster from "../../../hooks/useToaster";
import { DEFAULT_VOLUME } from "../../../types/generic/Constants";
import LISound from "../../../types/li/LISound";
import LISoundChannel from "../../../types/li/LISoundChannel";
import AudioPlayer from "./AudioPlayer";
import { useCreateMapAsset, useMapAssetValue } from "../../../hooks/map/useMapAssets";
import { Audiotrack, Check, CloudUpload, ExpandMore, Refresh } from "@mui/icons-material";
import { Button, ButtonGroup } from "@mui/material";

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
    const asset = useMapAssetValue(props.sound?.dataID);
    const createMapAsset = useCreateMapAsset();

    const soundSize = React.useMemo(() => {
        return props.sound?.isPreset ? 0 : (asset?.blob.size ?? 0);
    }, [props.sound]);

    const onUploadClick = React.useCallback(() => {
        openUploadDialog("audio/*").then((blob) => {
            downmixAudio(blob).then((downmixedBlob) => {
                const asset = createMapAsset(downmixedBlob);
                props.onChange({
                    id: props.sound?.id ?? generateGUID(),
                    type: props.soundType,
                    dataID: asset.id,
                    volume: DEFAULT_VOLUME,
                    isPreset: false
                });
            }).catch((e) => {
                console.error(e);
                toaster.danger(e);
            });
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
                    const asset = createMapAsset(downmixedBlob);
                    props.onChange({
                        id: props.sound?.id ?? generateGUID(),
                        type: props.soundType,
                        dataID: asset.id,
                        volume: DEFAULT_VOLUME,
                        isPreset: false
                    });
                }).catch((e) => {
                    console.error(e);
                    toaster.danger(e);
                });
            } else {
                toaster.danger(t("audio.errorInvalidType"));
            }
        }
    }, [props.onChange]);

    const selectChannelRenderer: ItemRenderer<string> = (channel, props) => (
        <MenuItem2
            key={props.index + "-channel"}
            text={t(`audio.${channel}`)}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
            onClick={props.handleClick}
            onFocus={props.handleFocus}
        />
    );

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
                <AudioPlayer
                    title={props.title}
                    sound={props.sound}
                    onSoundChange={props.onChange}
                    loop={props.loop}
                />
            ) : (
                <p
                    style={{
                        textAlign: "center",
                        paddingTop: 10
                    }}
                >
                    {t("audio.notUploaded")}
                </p>
            )}

            {/* Channel */}
            {props.editChannel && (
                <Select2
                    fill
                    filterable={false}
                    items={Object.values(LISoundChannel) as string[]}
                    itemRenderer={selectChannelRenderer}
                    onItemSelect={(item) => {
                        if (props.sound) {
                            props.onChange({
                                ...props.sound,
                                channel: item as LISoundChannel
                            });
                        }
                    }}
                >
                    <Button
                        startIcon={<Audiotrack />}
                        endIcon={<ExpandMore />}
                        fullWidth
                    >
                        {t(`audio.${props.sound?.channel ?? LISoundChannel.SFX}`)}
                    </Button>
                </Select2>
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
