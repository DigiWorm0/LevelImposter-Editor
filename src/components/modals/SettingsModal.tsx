import { CardList, Dialog, Section } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSettingsValue } from "../../hooks/useSettings";
import SettingsSwitchInput from "../properties/input/SettingsSwitchInput";
import SettingsNumericInput from "../properties/input/SettingsNumericInput";
import SettingsLocalizationInput from "../properties/input/SettingsLocalizationInput";

export interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SettingsModal(props: SettingsModalProps) {
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
                title={t("settings.interface.title")}
                subtitle={t("settings.interface.subtitle")}
            >
                <CardList bordered={false} compact>
                    <SettingsSwitchInput
                        name={t("settings.interface.darkMode")}
                        prop="isDarkMode"
                        icon="moon"
                    />
                    <SettingsSwitchInput
                        name={t("settings.interface.colliderPreview")}
                        prop="colliderPreview"
                        icon="polygon-filter"
                    />
                    <SettingsNumericInput
                        name={t("settings.interface.colliderHandleSize")}
                        prop="colliderHandleSize"
                        icon="polygon-filter"
                        min={1}
                        minorStepSize={0.5}
                        stepSize={1}
                        majorStepSize={2}
                        label={"px"}
                    />
                    <SettingsSwitchInput
                        name={t("settings.interface.scrollToSelection")}
                        prop="scrollToSelection"
                        icon="zoom-to-fit"
                    />
                    <SettingsSwitchInput
                        name={t("settings.interface.objNesting")}
                        prop="elementNesting"
                        icon="layers"
                    />
                    <SettingsSwitchInput
                        name={t("settings.interface.showRoomName")}
                        prop="isRoomNameVisible"
                        icon="home"
                    />
                    <SettingsSwitchInput
                        name={t("settings.interface.showInfo")}
                        prop="isInfoVisible"
                        icon="info-sign"
                    />
                    <SettingsSwitchInput
                        name={t("settings.interface.audioDownmix")}
                        prop="isAudioDownmixEnabled"
                        icon="volume-up"
                    />
                    <SettingsSwitchInput
                        name={t("settings.interface.grid")}
                        prop="isGridVisible"
                        icon="grid"
                    />
                    <SettingsNumericInput
                        name={t("settings.interface.gridSize")}
                        prop="gridSize"
                        icon="grid-view"
                        min={1}
                        minorStepSize={0.5}
                        stepSize={1}
                        majorStepSize={2}
                        label={"px"}
                    />
                    <SettingsNumericInput
                        name={t("settings.interface.gridSpacing")}
                        prop="gridSpacing"
                        icon="grid-view"
                        min={1}
                        minorStepSize={0.5}
                        stepSize={1}
                        majorStepSize={2}
                        label={"px"}
                    />
                    <SettingsSwitchInput
                        name={t("settings.interface.snapToGrid")}
                        prop="isGridSnapEnabled"
                        icon="layout-grid"
                    />
                    <SettingsNumericInput
                        name={t("settings.interface.snapResolution")}
                        prop="gridSnapResolution"
                        icon="layout-skew-grid"
                        min={0}
                        minorStepSize={0.05}
                        stepSize={0.1}
                        majorStepSize={1}
                        label={"px"}
                    />
                    <SettingsNumericInput
                        name={t("settings.interface.invisibleOpacity")}
                        prop="invisibleOpacity"
                        icon="eye-off"
                        min={0}
                        minorStepSize={0.05}
                        stepSize={0.1}
                        majorStepSize={0.2}
                        label={"x100%"}
                    />
                    <SettingsLocalizationInput />
                    <SettingsSwitchInput
                        name={t("settings.interface.devMode")}
                        prop="isDevMode"
                        icon="code"
                    />
                </CardList>
            </Section>
        </Dialog>
    );
}