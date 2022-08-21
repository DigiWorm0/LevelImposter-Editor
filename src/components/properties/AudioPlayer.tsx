import { Button, ButtonGroup, Slider } from "@blueprintjs/core";
import React from "react";

const UPDATE_INTERVAL = 100;

export default function AudioPlayer(props: { audioData?: string, volume: number, onVolumeChange: (volume: number) => void }) {
    const audioRef = React.useRef<HTMLAudioElement>(null);
    const [progress, setProgress] = React.useState(0);
    const [duration, setDuration] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (!audioRef.current)
                return;
            setProgress(audioRef.current.currentTime);
            setDuration(audioRef.current.duration);
        }, UPDATE_INTERVAL);

        return () => {
            clearInterval(interval);
        }
    }, [audioRef]);

    React.useEffect(() => {
        if (!audioRef.current)
            return;
        audioRef.current.volume = props.volume;
    }, [props.volume]);

    return (
        <div style={{ textAlign: "center", marginBottom: 10 }}>

            {props.audioData ? (
                <>
                    <audio ref={audioRef} src={props.audioData} loop>
                        Your browser does not support the audio element.
                    </audio>

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
                        value={props.volume}
                        onChange={(value) => {
                            props.onVolumeChange(value);
                        }}
                    />
                </>
            ) : (
                <p>No Audio Uploaded</p>
            )}
        </div>
    );
}