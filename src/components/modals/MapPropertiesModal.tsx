import { CardList, Dialog, Section } from "@blueprintjs/core";
import MapSwitchInput from "../properties/input/MapSwitchInput";
import MapSkyboxInput from "../properties/input/MapSkyboxInput";
import MapExileInput from "../properties/input/MapExileInput";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSettingsValue } from "../../hooks/useSettings";

export interface MapPropertiesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MapPropertiesModal(props: MapPropertiesModalProps) {
    const { t } = useTranslation();
    const { isDarkMode } = useSettingsValue();

    return (
        <Dialog
            isOpen={props.isOpen}
            onClose={props.onClose}
            portalClassName={isDarkMode ? "bp5-dark" : ""}
        >
            <Section
                icon={"cog"}
                title={t("settings.map.title")}
                subtitle={t("settings.map.subtitle")}
            >
                <CardList bordered={false} compact>
                    <MapSwitchInput
                        name={t("settings.map.showPingTracker")}
                        prop="showPingIndicator"
                        defaultValue={true}
                        icon="person"
                    />
                    <MapSwitchInput
                        name={t("settings.map.pixelArtMode")}
                        prop="pixelArtMode"
                        defaultValue={false}
                        icon="helper-management"
                    />
                    <MapSwitchInput
                        name={t("settings.map.preloadAllGIFs")}
                        prop="preloadAllGIFs"
                        defaultValue={false}
                        icon="media"
                    />
                    <MapSwitchInput
                        name={t("settings.map.triggerLogging")}
                        prop="triggerLogging"
                        defaultValue={true}
                        icon="console"
                    />
                    <MapSwitchInput
                        name={t("settings.map.canRemix")}
                        prop="canRemix"
                        defaultValue={true}
                        icon="random"
                    />
                    <MapSkyboxInput />
                    <MapExileInput />
                </CardList>
            </Section>
        </Dialog>
    )
}