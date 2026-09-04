import React from "react";
import LISound from "../../../types/li/LISound";
import AudioPlayer from "./AudioPlayer";
import {useAtomValue} from "jotai";
import {assetsAtomFamily} from "@editor/assets/assetsStore";

interface AudioPlayerProps {
    title?: string;
    sound?: LISound;
    onSoundChange: (sound: LISound) => void;

    loop?: boolean;
}

export default function AudioEditor(props: AudioPlayerProps) {
    const soundAsset = useAtomValue(assetsAtomFamily(props.id));

    const {sound} = props;

    /*
        Sound URL
     */
    const soundURL = React.useMemo(() => {
        return sound?.isPreset ? `/sounds/${sound?.presetID}` : soundAsset?.url;
    }, [sound]);

    /*
        Update Volume
     */
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
        <AudioPlayer
            downloadFileName={props.title}
            url={soundURL ?? ""}
            loop={props.loop}
            volume={sound.volume}
            onVolumeChange={onChangeVolume}
        />
    );
}