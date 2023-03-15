import { Button, ButtonGroup, FormGroup } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import generateGUID from "../../hooks/generateGUID";
import useSelectedElem from "../../hooks/jotai/useSelectedElem";
import { useSelectedSoundID, useSelectedSoundValue } from "../../hooks/jotai/useSelectedSound";
import { DEFAULT_VOLUME } from "../../types/generic/Constants";
import DevInfo from "../utils/DevInfo";
import SizeTag from "../utils/SizeTag";
import AudioPlayer from "./util/AudioPlayer";
import MapError from "./util/MapError";
import PanelContainer from "./util/PanelContainer";

export default function SoundPanel() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();
    const [selectedSoundID, setSelectedSoundID] = useSelectedSoundID();
    const selectedSound = useSelectedSoundValue();

    React.useEffect(() => {
        if (selectedSound === undefined && (selectedElem?.type === "util-sound1" || selectedElem?.type === "util-triggersound")) {
            const sounds = selectedElem?.properties.sounds || [];
            const sound = sounds.length > 0 ? sounds[0] : undefined;
            setSelectedSoundID(sound?.id);
        }
    }, [selectedSound, selectedElem]);

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
                if (!selectedElem)
                    return;

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
    }, [selectedElem, selectedSoundID, setSelectedElem]);

    const onResetClick = React.useCallback(() => {
        if (!selectedElem)
            return;
        setSelectedElem({
            ...selectedElem,
            properties: {
                ...selectedElem.properties,
                sounds: []
            }
        });
    }, [selectedElem, setSelectedElem]);

    const hasCollider = React.useMemo(() => {
        return selectedElem?.properties.colliders !== undefined && selectedElem.properties.colliders.length > 0;
    }, [selectedElem]);

    const hasSound = React.useMemo(() => {
        return selectedElem?.properties.sounds !== undefined && selectedElem.properties.sounds.length > 0;
    }, [selectedElem]);

    const soundSize = React.useMemo(() => {
        return selectedElem?.properties.sounds?.reduce((acc, cur) => acc + (cur.data?.length || 0), 0) || 0;
    }, [selectedElem]);

    if (!selectedElem || (selectedElem.type !== "util-sound1" && selectedElem.type !== "util-triggersound"))
        return null;

    return (
        <>
            <PanelContainer title={t("audio.soundPlayer") as string}>
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
                            warningMsg={t("audio.errorSize") as string}
                            okMsg={t("audio.okSize") as string}
                        />
                    </div>

                    <ButtonGroup minimal fill style={{ marginTop: 10, marginBottom: 10 }}>
                        <Button
                            fill
                            icon="refresh"
                            text={t("audio.reset") as string}
                            onClick={onResetClick}
                        />
                        <Button
                            fill
                            icon="upload"
                            text={t("audio.upload") as string}
                            onClick={onUploadClick}
                        />
                    </ButtonGroup>
                </FormGroup>
            </PanelContainer>
            <MapError isVisible={!hasCollider} >
                {t("audio.errorNoCollider") as string}
            </MapError>
            <MapError isVisible={!hasSound} >
                {t("audio.errorNoSound") as string}
            </MapError>
        </>
    );
}
