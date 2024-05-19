import MapSwitchInput from "../properties/input/MapSwitchInput";
import MapSkyboxInput from "../properties/input/MapSkyboxInput";
import MapExileInput from "../properties/input/MapExileInput";
import React from "react";
import { useTranslation } from "react-i18next";
import GenericModal from "./GenericModal";

export interface MapPropertiesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MapPropertiesModal(props: MapPropertiesModalProps) {
    const { t } = useTranslation();

    return (
        <GenericModal
            open={props.isOpen}
            onClose={props.onClose}
        >
            <h2>
                {t("settings.map.title")}
            </h2>
            <MapSwitchInput
                name={t("settings.map.showPingTracker")}
                prop="showPingIndicator"
                defaultValue={true}
                icon="Info"
            />
            <MapSwitchInput
                name={t("settings.map.pixelArtMode")}
                prop="pixelArtMode"
                defaultValue={false}
                icon="ViewCompact"
            />
            <MapSwitchInput
                name={t("settings.map.preloadAllGIFs")}
                prop="preloadAllGIFs"
                defaultValue={false}
                icon="PlayArrow"
            />
            <MapSwitchInput
                name={t("settings.map.triggerLogging")}
                prop="triggerLogging"
                defaultValue={true}
                icon="TextSnippet"
            />
            <MapSwitchInput
                name={t("settings.map.canRemix")}
                prop="canRemix"
                defaultValue={true}
                icon="Shuffle"
            />
            <MapSkyboxInput />
            <MapExileInput />
        </GenericModal>
    )
}