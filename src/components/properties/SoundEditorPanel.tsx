import React from "react";
import { Button, Card, H6 } from "@blueprintjs/core";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import useSelectedSound, { useSelectedSoundID } from "../../hooks/jotai/useSelectedSound";
import { DEFAULT_VOLUME } from "../../types/generic/Constants";
import DevInfo from "../utils/DevInfo";
import AudioPlayer from "./util/AudioPlayer";

export default function SoundEditorPanel(props: { title: string }) {
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [selectedSoundID, setSelectedSoundID] = useSelectedSoundID();
    const [selectedSound, setSelectedSound] = useSelectedSound();

    const onDeleteClick = React.useCallback(() => {
        if (!selectedElem)
            return;
        const sounds = selectedElem.properties.sounds?.filter(sound => sound.id !== selectedSoundID);
        setSelectedElem({
            ...selectedElem,
            properties: {
                ...selectedElem.properties,
                sounds
            }
        });
    }, [selectedElem, selectedSoundID, setSelectedElem]);

    const onUploadClick = React.useCallback(() => {
        console.log("Showing Upload Dialog");
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "audio/wav";
        input.onchange = () => {
            console.log("Uploaded File");
            if (input.files === null)
                return;
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                console.log("Loaded File");
                if (!selectedSound)
                    return;

                setSelectedSound({
                    ...selectedSound,
                    data: reader.result as string,
                    volume: DEFAULT_VOLUME,
                    isPreset: false
                });
            }
            reader.readAsDataURL(file);
        }
        input.click();
    }, [selectedSound, setSelectedSound]);

    if (!selectedElem)
        return null;

    return (
        <Card>
            <H6>{props.title}</H6>

            <DevInfo>
                {selectedSound?.id}
            </DevInfo>

            <AudioPlayer />

            <div style={{ marginTop: 10 }}>
                <Button
                    icon="cloud-upload"
                    intent="primary"
                    onClick={() => onUploadClick()}
                    style={{ marginRight: 5 }} />
                <Button
                    icon="tick"
                    intent="success"
                    onClick={() => setSelectedSoundID(undefined)}
                    style={{ marginRight: 5 }} />
                <Button
                    icon="trash"
                    intent="danger"
                    onClick={() => onDeleteClick()} />
            </div>
        </Card>
    )
}