import React from "react";
import { useTranslation } from "react-i18next";
import { DEFAULT_VOLUME } from "../../../types/generic/Constants";
import LISound from "../../../types/li/LISound";
import { useMapAssetValue } from "../../../hooks/map/useMapAssets";
import { ButtonGroup, IconButton, Slider, Stack } from "@mui/material";
import { Pause, PlayArrow, SaveAlt, Stop, VolumeDown, VolumeUp } from "@mui/icons-material";

interface AudioPlayerProps {
    title?: string;
    sound?: LISound;
    onSoundChange: (sound: LISound) => void;

    loop?: boolean;
}

export default function AudioPlayer(props: AudioPlayerProps) {
    const { t } = useTranslation();
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const animRef = React.useRef<number>(0);
    const [progress, setProgress] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const soundAsset = useMapAssetValue(props.sound?.dataID);

    const { sound } = props;

    /*
        Update progress bar
     */
    const updateProgress = () => {

        // Update progress
        if (audioRef.current) {
            setProgress(audioRef.current.currentTime);
            setDuration(audioRef.current.duration);
        }

        // Loop
        animRef.current = requestAnimationFrame(updateProgress);
    }
    React.useEffect(() => {
        animRef.current = requestAnimationFrame(updateProgress);
        return () => cancelAnimationFrame(animRef.current);
    }, []);

    /*
        Update Volume
     */
    React.useEffect(() => {
        if (!audioRef.current)
            return;
        audioRef.current.volume = sound?.volume ?? DEFAULT_VOLUME;
    }, [sound]);

    /*
        Sound URL
     */
    const soundURL = React.useMemo(() => {
        return sound?.isPreset ? `/sounds/${sound?.presetID}` : soundAsset?.url;
    }, [sound]);

    /*
        Download sound
     */
    const downloadSound = React.useCallback(() => {
        if (!soundURL)
            return;
        const link = document.createElement("a");
        link.href = soundURL;
        link.download = props.title ?? "sound";
        link.click();
    }, [soundURL, props.title]);

    /*
        Update Play/Pause State
     */
    React.useEffect(() => {
        if (!audioRef.current)
            return;

        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);

        audioRef.current.addEventListener("play", onPlay);
        audioRef.current.addEventListener("pause", onPause);

        return () => {
            audioRef.current?.removeEventListener("play", onPlay);
            audioRef.current?.removeEventListener("pause", onPause);
        }
    }, [audioRef.current]);

    const onChangeProgress = React.useCallback((value: number) => {
        setProgress(value);
        if (audioRef.current)
            audioRef.current.currentTime = value;
    }, [audioRef.current]);

    const onChangeVolume = React.useCallback((value: number) => {
        if (!sound)
            return;
        props.onSoundChange({
            ...sound,
            volume: value
        });
    }, [sound]);

    if (!sound)
        return null;

    return (
        <div
            style={{
                textAlign: "center",
                marginBottom: 10,
                paddingLeft: 10,
                paddingRight: 10
            }}
        >
            <audio
                ref={audioRef}
                src={soundURL}
                loop={props.loop}
            >
                {t("audio.errorNotSupported")}
            </audio>

            <ButtonGroup>
                <IconButton
                    onClick={() => {
                        if (audioRef.current) {
                            audioRef.current.pause();
                            audioRef.current.currentTime = 0;
                        }
                    }}
                >
                    <Stop />
                </IconButton>
                {isPlaying ? (
                    <IconButton onClick={() => audioRef.current?.pause()}>
                        <Pause />
                    </IconButton>
                ) : (
                    <IconButton onClick={() => audioRef.current?.play().catch(console.error)}>
                        <PlayArrow />
                    </IconButton>
                )}
                <IconButton onClick={downloadSound}>
                    <SaveAlt />
                </IconButton>
            </ButtonGroup>

            <Slider
                min={0}
                max={duration}
                value={progress}
                step={0.001}
                onChange={(_, value) => onChangeProgress(value as number)}
            />

            <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1 }}
                alignItems="center"
            >
                <VolumeDown />
                <Slider
                    min={0}
                    max={1}
                    step={0.01}
                    color={"success"}
                    value={sound?.volume}
                    onChange={(_, value) => onChangeVolume(value as number)}
                />
                <VolumeUp />
            </Stack>
        </div>
    );
}