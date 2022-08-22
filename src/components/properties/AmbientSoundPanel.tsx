import React from "react";
import { Button, ButtonGroup, FormGroup, NumericInput, Slider } from "@blueprintjs/core";
import generateGUID from "../../hooks/generateGUID";
import { useSaveHistory } from "../../hooks/jotai/useHistory";
import { useMapProperties } from "../../hooks/jotai/useMap";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import useResource from "../../hooks/useResource";
import { DEFAULT_VOLUME } from "../../types/generic/Constants";
import PanelContainer from "./PanelContainer";
import AudioPlayer from "./AudioPlayer";

export default function AmbientSoundPanel() {
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [properties, setProperties] = useMapProperties();
    const saveHistory = useSaveHistory();
    const [soundID, sound, setSound] = useResource(selectedElem?.properties.soundID);

    const onUploadClick = () => {
        console.log("Showing Upload Dialog");
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "audio/*";
        input.onchange = () => {
            console.log("Uploaded File");
            if (input.files === null)
                return;
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                console.log("Loaded File");
                if (!selectedElem)
                    return;

                saveHistory();
                setSelectedElem({
                    ...selectedElem,
                    properties: {
                        ...selectedElem.properties,
                        soundID
                    }
                });
                setSound(reader.result as string);
            }
            reader.readAsDataURL(file);
        }
        input.click();
    }

    const onResetClick = () => {
        if (!selectedElem)
            return;
        saveHistory();
        setSound(undefined);
    }
    if (!selectedElem || selectedElem.type !== "util-sound1")
        return null;

    return (
        <PanelContainer title="Ambient Sound">
            <FormGroup>

                <AudioPlayer
                    audioData={sound}
                    volume={selectedElem?.properties.soundVolume ? selectedElem.properties.soundVolume : DEFAULT_VOLUME}
                    onVolumeChange={(value) => {
                        if (!selectedElem)
                            return;
                        saveHistory();
                        setSelectedElem({
                            ...selectedElem,
                            properties: {
                                ...selectedElem.properties,
                                soundVolume: value
                            }
                        }
                        );
                    }} />


                <ButtonGroup minimal fill style={{ marginTop: 10, marginBottom: 10 }}>
                    <Button
                        fill
                        icon="refresh"
                        text="Reset"
                        onClick={onResetClick}
                    />
                    <Button
                        fill
                        icon="upload"
                        text="Upload"
                        onClick={onUploadClick}
                    />
                </ButtonGroup>
            </FormGroup>
        </PanelContainer>
    );
}
