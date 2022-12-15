import { Button, ButtonGroup, FormGroup } from "@blueprintjs/core";
import React from "react";
import generateGUID from "../../hooks/generateGUID";
import { useSaveHistory } from "../../hooks/jotai/useHistory";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import { useSelectedSoundID, useSelectedSoundValue } from "../../hooks/jotai/useSelectedSound";
import useTranslation from "../../hooks/useTranslation";
import { DEFAULT_VOLUME } from "../../types/generic/Constants";
import DevInfo from "../DevInfo";
import SizeTag from "../SizeTag";
import AudioPlayer from "./AudioPlayer";
import MapError from "./MapError";
import PanelContainer from "./PanelContainer";

export default function SoundPanel() {
    const translation = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const saveHistory = useSaveHistory();
    const [selectedSoundID, setSelectedSoundID] = useSelectedSoundID();
    const selectedSound = useSelectedSoundValue();

    React.useEffect(() => {
        if (selectedSound === undefined && (selectedElem?.type === "util-sound1" || selectedElem?.type === "util-triggersound")) {
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
    if (!selectedElem || (selectedElem.type !== "util-sound1" && selectedElem.type !== "util-triggersound"))
        return null;

    const hasCollider = selectedElem.properties.colliders !== undefined && selectedElem.properties.colliders.length > 0;
    const hasSound = selectedElem.properties.sounds !== undefined && selectedElem.properties.sounds.length > 0;
    const soundSize = selectedElem.properties.sounds?.reduce((acc, cur) => acc + (cur.data?.length || 0), 0) || 0;

    return (
        <>
            <PanelContainer title={translation.SoundPlayer}>
                <FormGroup style={{
                    marginBottom: 0
                }}>
                    <DevInfo>
                        {selectedElem.properties.sounds?.length} sounds
                    </DevInfo>

                    <AudioPlayer />

                    <div style={{ textAlign: "center", marginBottom: 10 }}>
                        <SizeTag
                            sizeBytes={soundSize}
                            warningMsg={"Larger sound files can sometimes freeze or crash the game. Try reducing the channel count or bitrate."}
                            okMsg={"Your audio is small enough to not cause any issues."}
                        />
                    </div>

                    <ButtonGroup minimal fill style={{ marginTop: 10, marginBottom: 10 }}>
                        <Button
                            fill
                            icon="refresh"
                            text={translation.Reset}
                            onClick={onResetClick}
                        />
                        <Button
                            fill
                            icon="upload"
                            text={translation.Upload}
                            onClick={onUploadClick}
                        />
                    </ButtonGroup>
                </FormGroup>
            </PanelContainer>
            <MapError isVisible={!hasCollider} >
                This object is missing a collider. <i>(Audio only plays to players who are within the collider)</i>
            </MapError>
            <MapError isVisible={!hasSound} >
                This object is missing a sound file. <i>(Unity will only support .wav files)</i>
            </MapError>
        </>
    );
}
