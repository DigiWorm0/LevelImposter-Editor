import { Button, ButtonGroup, H6, Tag } from "@blueprintjs/core";
import React from "react";
import generateGUID from "../../../hooks/generateGUID";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import openUploadDialog from "../../../hooks/openUploadDialog";
import { DEFAULT_VOLUME } from "../../../types/generic/Constants";
import LISound from "../../../types/li/LISound";
import AudioPlayer from "../util/AudioPlayer";

interface SoundEditorProps {
    title: string;
    soundType?: string;
    soundID?: string;
    onFinished: () => void;
}

export default function SoundEditorPanel(props: SoundEditorProps) {
    const [selectedElem, setSelectedElem] = useSelectedElem();

    const sound = React.useMemo(() => {
        if (props.soundType)
            return selectedElem?.properties.sounds?.find(sound => sound.type === props.soundType);
        else
            return selectedElem?.properties.sounds?.find(sound => sound.id === props.soundID);
    }, [selectedElem, props.soundType]);

    const onDeleteClick = React.useCallback(() => {
        if (!selectedElem)
            return;
        const sounds = selectedElem.properties.sounds?.filter(sound => sound.id !== sound?.id) ?? [];
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

    const onUploadClick = React.useCallback(() => {
        openUploadDialog("audio/wav").then((data) => {
            onSoundChange({
                id: sound?.id ?? generateGUID(),
                type: props.soundType,
                data,
                volume: DEFAULT_VOLUME,
                isPreset: false
            });
        });
    }, [selectedElem, setSelectedElem, sound]);

    if (!selectedElem)
        return null;

    return (
        <div style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <H6>
                    {props.title}
                </H6>
                {sound?.isPreset && (
                    <Tag
                        intent="success"
                        style={{
                            marginBottom: 10,
                        }}
                    >
                        {sound.data}
                    </Tag>
                )}
            </div>
            <AudioPlayer
                sound={sound}
                onSoundChange={onSoundChange}
            />

            <ButtonGroup fill>
                <Button
                    icon="cloud-upload"
                    intent="primary"
                    onClick={() => onUploadClick()}
                    style={{ margin: 3 }}
                />
                <Button
                    icon="tick"
                    intent="success"
                    onClick={() => props.onFinished()}
                    style={{ margin: 3 }}
                />
                <Button
                    icon="refresh"
                    intent="danger"
                    onClick={() => onDeleteClick()}
                    style={{ margin: 3 }}
                />
            </ButtonGroup>
        </div>
    )
}