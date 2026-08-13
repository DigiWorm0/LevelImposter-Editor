import MapSwitchInput from "../properties/input/mapProps/MapSwitchInput";
import MapSkyboxInput from "../properties/input/mapProps/MapSkyboxInput";
import MapExileInput from "../properties/input/mapProps/MapExileInput";
import React from "react";
import {useTranslation} from "react-i18next";
import GenericModal from "./GenericModal";
import {AllInclusive, Shuffle, TextSnippet, ViewCompact} from "@mui/icons-material";
import MapTargetInput from "../properties/input/mapProps/MapTargetInput";
import SettingsHeader from "./Settings/SettingsHeader";

export interface MapPropertiesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MapPropertiesModal(props: MapPropertiesModalProps) {
    const {t} = useTranslation();

    return (
        <GenericModal
            open={props.isOpen}
            onClose={props.onClose}
            title={t("settings.map.title")}
        >
            <SettingsHeader>
                {t("settings.gameplay")}
            </SettingsHeader>
            <MapTargetInput/>
            <MapExileInput/>

            <SettingsHeader>
                {t("settings.rendering")}
            </SettingsHeader>
            <MapSwitchInput
                name={t("settings.map.pixelArtMode")}
                prop="pixelArtMode"
                defaultValue={false}
                icon={<ViewCompact/>}
            />
            <MapSkyboxInput/>

            <SettingsHeader>
                {t("settings.triggers")}
            </SettingsHeader>
            <MapSwitchInput
                name={t("settings.map.triggerLogging")}
                prop="triggerLogging"
                defaultValue={false}
                icon={<TextSnippet/>}
            />
            <MapSwitchInput
                name={t("settings.map.triggerDetectStackOverflow")}
                prop="triggerDetectStackOverflow"
                defaultValue={true}
                icon={<AllInclusive/>}
            />
            <SettingsHeader>
                {t("settings.workshop")}
            </SettingsHeader>
            <MapSwitchInput
                name={t("settings.map.canRemix")}
                prop="canRemix"
                defaultValue={true}
                icon={<Shuffle/>}
            />
        </GenericModal>
    );
}