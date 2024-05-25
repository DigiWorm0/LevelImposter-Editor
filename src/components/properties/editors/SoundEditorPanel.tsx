import { Box, Typography } from "@mui/material";
import React from "react";
import useSelectedElem from "../../../hooks/elements/useSelectedElem";
import LISound from "../../../types/li/LISound";
import generateGUID from "../../../utils/generateGUID";
import SoundUpload from "../util/SoundUpload";

interface SoundEditorProps {
    title: string;
    soundType?: string;
    soundID?: string;
    onFinish?: () => void;
    defaultSoundURL?: string;
    loop?: boolean;
}

export default function SoundEditorPanel(props: SoundEditorProps) {
    const [selectedElem, setSelectedElem] = useSelectedElem();

    const sound = React.useMemo(() => {
        if (props.soundType)
            return selectedElem?.properties.sounds?.find(sound => sound.type === props.soundType);
        else
            return selectedElem?.properties.sounds?.find(sound => sound.id === props.soundID);
    }, [selectedElem, props.soundType]);
    const defaultSound = React.useMemo(() => (props.defaultSoundURL ? {
        id: generateGUID(),
        type: props.soundType,
        presetID: props.defaultSoundURL,
        volume: 1,
        isPreset: true
    } : undefined), [props.defaultSoundURL, props.soundType]);

    const onDeleteClick = React.useCallback(() => {
        if (!selectedElem)
            return;
        const sounds = selectedElem.properties.sounds?.filter(s => s.id !== sound?.id) ?? [];
        setSelectedElem({
            ...selectedElem,
            properties: {
                ...selectedElem.properties,
                sounds
            }
        });
    }, [selectedElem, setSelectedElem]);

    const onSoundChange = React.useCallback((sound: LISound) => {
        if (!selectedElem)
            return;
        const sounds = selectedElem.properties.sounds?.map(s => {
            if (s.id === sound.id)
                return sound;
            return s;
        }) ?? [];
        if (!sounds.some(s => s.id === sound.id))
            sounds.push(sound);
        setSelectedElem({
            ...selectedElem,
            properties: {
                ...selectedElem.properties,
                sounds
            }
        });
    }, [selectedElem, setSelectedElem]);

    if (!selectedElem)
        return null;

    return (
        <Box sx={{ padding: 2 }}>
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