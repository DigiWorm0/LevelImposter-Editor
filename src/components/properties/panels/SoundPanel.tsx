import React from "react";
import { useTranslation } from "react-i18next";
import useSelectedElem from "../../../hooks/jotai/useSelectedElem";
import LISound from "../../../types/li/LISound";
import MapError from "../util/MapError";
import PanelContainer from "../util/PanelContainer";
import SoundUpload from "../util/SoundUpload";

export default function SoundPanel() {
    const { t } = useTranslation();
    const [selectedElem, setSelectedElem] = useSelectedElem();

    const sound = React.useMemo(() => {
        return selectedElem?.properties.sounds?.length === 1 ? selectedElem.properties.sounds[0] : undefined;
    }, [selectedElem]);

    const isNotWav = React.useMemo(() => {
        return !sound?.data?.startsWith("data:audio/wav;base64,");
    }, [sound]);

    const onChange = React.useCallback((newSound: LISound) => {
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

    const onReset = React.useCallback(() => {
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

    if (!selectedElem || (selectedElem.type !== "util-sound1" && selectedElem.type !== "util-triggersound"))
        return null;

    return (
        <>
            <PanelContainer title={t("audio.soundPlayer") as string}>
                <SoundUpload
                    title={selectedElem?.name}
                    sound={sound}
                    onChange={onChange}
                    onReset={onReset}
                    loop
                />
            </PanelContainer>
            <MapError
                isVisible={!hasCollider}
                icon="polygon-filter"
            >
                {t("audio.errorNoCollider") as string}
            </MapError>
            <MapError
                isVisible={!hasSound}
                icon="volume-off"
            >
                {t("audio.errorNoSound") as string}
            </MapError>
            <MapError
                isVisible={isNotWav}
                icon="volume-off"
            >
                {t("audio.errorNotWav") as string}
            </MapError>
        </>
    );
}
