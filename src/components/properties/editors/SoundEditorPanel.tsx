import { Box, Typography } from "@mui/material";
import React from "react";
import LISound from "../../../types/li/LISound";
import generateGUID from "../../../utils/strings/generateGUID";
import SoundUpload from "../util/SoundUpload";
import useSelectedElemProp from "../../../hooks/elements/useSelectedElemProperty";

interface SoundEditorProps {
    title: string;
    soundType?: string;
    soundID?: string;
    onFinish?: () => void;
    defaultSoundURL?: string;
    loop?: boolean;
}

export default function SoundEditorPanel(props: SoundEditorProps) {
    const [sounds, setSounds] = useSelectedElemProp("sounds");

    const sound = React.useMemo(() => {
        if (props.soundType)
            return sounds?.find(sound => sound.type === props.soundType);
        else
            return sounds?.find(sound => sound.id === props.soundID);
    }, [sounds, props.soundType]);

    const defaultSound = React.useMemo(() => (
        props.defaultSoundURL ? ({
            id: generateGUID(),
            type: props.soundType,
            presetID: props.defaultSoundURL,
            volume: 1,
            isPreset: true
        }) : undefined
    ), [props.defaultSoundURL, props.soundType]);

    const onDeleteClick = React.useCallback(() => {
        setSounds(sounds?.filter(s => s.id !== sound?.id) ?? []);
    }, [sounds]);

    const onSoundChange = React.useCallback((sound: LISound) => {

        // Update the sound
        const newSounds = sounds?.map(s => {
            if (s.id === sound.id)
                return sound;
            return s;
        }) ?? [];

        // If the sound is not in the list, add it
        if (!newSounds.some(s => s.id === sound.id))
            newSounds.push(sound);

        // Update the sounds
        setSounds(newSounds);
    }, [sounds]);

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant={"subtitle2"}>
                {props.title}
            </Typography>
            <SoundUpload
                title={props.title}
                sound={sound ?? defaultSound}
                soundType={props.soundType}
                onChange={onSoundChange}
                onReset={onDeleteClick}
                onFinish={props.onFinish}
                loop={props.loop}
            />
        </Box>
    )
}