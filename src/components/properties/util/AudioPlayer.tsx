import React from "react";
import { useTranslation } from "react-i18next";
import { DEFAULT_VOLUME } from "../../../types/generic/Constants";
import { Box, ButtonGroup, IconButton, Slider, Stack } from "@mui/material";
import { Pause, PlayArrow, SaveAlt, Stop, VolumeDown, VolumeUp } from "@mui/icons-material";

interface AudioPlayerProps {
    url: string;
    volume?: number;
    loop?: boolean;
    downloadFileName?: string;
    onVolumeChange?: (volume: number) => void;
}

export default function AudioPlayer(props: AudioPlayerProps) {
    const { t } = useTranslation();
    const audioRef = React.useRef<HTMLAudioElement>(null);
    
    const [progress, setProgress] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [isPlaying, setIsPlaying] = React.useState(false);

    /*
        Update progress bar
     */
    React.useEffect(() => {
        // Update progress
        const updateProgress = () => {
            if (audioRef.current) {
                const { currentTime, duration } = audioRef.current;
                setProgress(isNaN(currentTime) ? 0 : currentTime);
                setDuration(isNaN(duration) ? 0 : duration);
            }
        }

        // Update progress every few milliseconds
        const id = setInterval(updateProgress, 100);
        return () => clearInterval(id);
    }, [audioRef.current]);

    /*
        Update Volume
     */
    React.useEffect(() => {
        if (!audioRef.current)
            return;
        audioRef.current.volume = props.volume ?? DEFAULT_VOLUME;
    }, [props.volume]);

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

    /*
        Download sound
     */
    const downloadSound = React.useCallback(() => {
        const link = document.createElement("a");
        link.href = props.url;
        link.download = `${props.downloadFileName ?? "sound"}.wav`;
        link.click();
    }, [props.url, props.downloadFileName]);

    return (
        <Box
            sx={{
                textAlign: "center",
                mb: 1,
                ps: 1,
                pe: 1,
                flex: 1
            }}
        >
            <audio
                ref={audioRef}
                src={props.url}
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

            {props.onVolumeChange && (
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
                        value={props.volume ?? DEFAULT_VOLUME}
                        onChange={(_, value) => props.onVolumeChange?.(value as number)}
                    />
                    <VolumeUp />
                </Stack>
            )}
        </Box>
    );
}