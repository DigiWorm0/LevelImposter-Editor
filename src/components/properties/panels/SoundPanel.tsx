import { Button, ButtonGroup, FormGroup } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import generateGUID from "../../../hooks/generateGUID";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import openUploadDialog from "../../../hooks/openUploadDialog";
import { DEFAULT_VOLUME } from "../../../types/generic/Constants";
import LISound from "../../../types/li/LISound";
import DevInfo from "../../utils/DevInfo";
import SizeTag from "../../utils/SizeTag";
import AudioPlayer from "../util/AudioPlayer";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";

export default function SoundPanel() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();

    const sound = React.useMemo(() => {
        return selectedElem?.properties.sounds?.length === 1 ? selectedElem.properties.sounds[0] : undefined;
    }, [selectedElem]);

    const onSoundChange = React.useCallback((newSound: LISound) => {
        if (!selectedElem)
            return;
        setSelectedElem({
            ...selectedElem,
            properties: {
                ...selectedElem.properties,
                sounds: [newSound]
            }
        });
    }, [selectedElem, setSelectedElem]);

    const onUploadClick = React.useCallback(() => {
        openUploadDialog("audio/wav").then((data) => {
            onSoundChange({
                id: sound?.id ?? generateGUID(),
                data,
                volume: DEFAULT_VOLUME,
                isPreset: false
            });
        });
    }, [onSoundChange, sound]);

    const onResetClick = React.useCallback(() => {
        if (!selectedElem)
            return;
        setSelectedElem({
            ...selectedElem,
            properties: {
                ...selectedElem.properties,
                sounds: undefined
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

                    <AudioPlayer
                        sound={sound}
                        onSoundChange={onSoundChange}
                    />

                    <div style={{ textAlign: "center", marginBottom: 10 }}>
                        <SizeTag
                            sizeBytes={soundSize}
                            warningMsg={t("audio.errorSize") as string}
                            okMsg={t("audio.okSize") as string}
                        />
                    </div>

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
                            disabled
                            style={{ margin: 3 }}
                        />
                        <Button
                            icon="refresh"
                            intent="danger"
                            onClick={() => onResetClick()}
                            style={{ margin: 3 }}
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
