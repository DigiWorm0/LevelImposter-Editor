import { Button, ButtonGroup, Slider } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedSound from "../../../hooks/jotai/useSelectedSound";
import { DEFAULT_VOLUME } from "../../../types/generic/Constants";
import DevInfo from "../../utils/DevInfo";

const MAJOR_UPDATE_INTERVAL = 1;
const MINOR_UPDATE_INTERVAL = 0.01;

export default function AudioPlayer() {
    const { t } = useTranslation();
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const [progress, setProgress] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [sound, setSound] = useSelectedSound();

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (!audioRef.current)
                return;
            setProgress(audioRef.current.currentTime);
            setDuration(audioRef.current.duration);
        }, duration > 10 ? MAJOR_UPDATE_INTERVAL : MINOR_UPDATE_INTERVAL);

        return () => {
            clearInterval(interval);
        }
    }, [audioRef, duration]);

    React.useEffect(() => {
        if (!audioRef.current)
            return;
        audioRef.current.volume = sound?.volume ? sound.volume : DEFAULT_VOLUME;
    }, [sound]);

    const soundData = React.useMemo(() => {
        return sound?.isPreset ? "/sounds/" + sound?.data : sound?.data;
    }, [sound]);

    const downloadSound = React.useCallback(() => {
        if (!soundData)
            return;
        const link = document.createElement("a");
        link.href = soundData;
        link.download = "";
        link.click();
    }, [soundData]);

    return (
        <div style={{ textAlign: "center", marginBottom: 10 }}>

            {soundData ? (
                <>
                    <audio ref={audioRef} src={soundData} loop>
                        {t("audio.errorNotSupported")}
                    </audio>

                    <DevInfo>
                        {soundData?.length}
                    </DevInfo>

                    <ButtonGroup large minimal>
                        <Button
                            icon="stop"
                            onClick={() => {
                                if (audioRef.current) {
                                    audioRef.current.pause();
                                    audioRef.current.currentTime = 0;
                                }
                            }}
                        />
                        <Button
                            icon="play"
                            onClick={() => {
                                if (audioRef.current)
                                    audioRef.current.play();
                            }}
                        />
                        <Button
                            icon="pause"
                            onClick={() => {
                                if (audioRef.current)
                                    audioRef.current.pause();
                            }}
                        />
                        <Button
                            icon="download"
                            onClick={() => {
                                downloadSound();
                            }}
                        />
                    </ButtonGroup>

                    <Slider
                        min={0}
                        max={duration}
                        stepSize={0.001}
                        labelStepSize={duration <= 0 ? undefined : duration}
                        labelRenderer={(value) => {
                            const seconds = Math.floor(value);
                            const minutes = Math.floor(seconds / 60);
                            const secondsRemainder = seconds % 60;
                            return `${minutes}:${secondsRemainder < 10 ? "0" : ""}${secondsRemainder}`;
                        }}
                        onChange={(value) => {
                            setProgress(value);
                            if (audioRef.current)
                                audioRef.current.currentTime = value;
                        }}
                        value={progress}
                    />

                    <Slider
                        min={0}
                        max={1}
                        stepSize={0.01}
                        labelStepSize={1}
                        labelRenderer={(value) => `${Math.round(value * 100)}%`}
                        intent="success"
                        value={sound?.volume}
                        onChange={(value) => {
                            if (!sound)
                                return;
                            setSound({
                                ...sound,
                                volume: value
                            });
                        }}
                    />
                </>
            ) : (
                <p>
                    {t("audio.notUploaded")}
                </p>
            )}
        </div>
    );
}