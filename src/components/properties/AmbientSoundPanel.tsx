import React from "react";
import { Button, ButtonGroup, FormGroup } from "@blueprintjs/core";
import generateGUID from "../../hooks/generateGUID";
import { useSaveHistory } from "../../hooks/jotai/useHistory";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import { useSelectedSoundID, useSelectedSoundValue } from "../../hooks/jotai/useSelectedSound";
import { DEFAULT_VOLUME } from "../../types/generic/Constants";
import DevInfo from "../DevInfo";
import AudioPlayer from "./AudioPlayer";
import PanelContainer from "./PanelContainer";

export default function AmbientSoundPanel() {
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const saveHistory = useSaveHistory();
    const [selectedSoundID, setSelectedSoundID] = useSelectedSoundID();
    const selectedSound = useSelectedSoundValue();

    React.useEffect(() => {
        if (selectedSound === undefined && selectedElem?.type === "util-sound1") {
            const sounds = selectedElem?.properties.sounds || [];
            const sound = sounds.length > 0 ? sounds[0] : undefined;
            setSelectedSoundID(sound?.id);
        }
    }, [selectedSound, selectedElem]);

    const onUploadClick = () => {
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
                if (!selectedElem)
                    return;

                saveHistory();
                setSelectedElem({
                    ...selectedElem,
                    properties: {
                        ...selectedElem.properties,
                        sounds: [{
                            id: selectedSoundID ? selectedSoundID : generateGUID(),
                            data: reader.result as string,
                            volume: DEFAULT_VOLUME,
                            isPreset: false
                        }]
                    }
                });
            }
            reader.readAsDataURL(file);
        }
        input.click();
    }

    const onResetClick = () => {
        if (!selectedElem)
            return;
        saveHistory();
        setSelectedElem({
            ...selectedElem,
            properties: {
                ...selectedElem.properties,
                sounds: []
            }
        });
    }
    if (!selectedElem || selectedElem.type !== "util-sound1")
        return null;

    return (
        <PanelContainer title="Ambient Sound">
            <FormGroup>
                <DevInfo>
                    {selectedElem.properties.sounds?.length} sounds
                </DevInfo>

                <AudioPlayer />

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
