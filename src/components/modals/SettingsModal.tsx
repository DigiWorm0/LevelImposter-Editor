import React from "react";
import { useTranslation } from "react-i18next";
import SettingsSwitchInput from "../properties/input/SettingsSwitchInput";
import SettingsNumericInput from "../properties/input/SettingsNumericInput";
import SettingsLocalizationInput from "../properties/input/select/SettingsLocalizationInput";
import GenericModal from "./GenericModal";

export interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SettingsModal(props: SettingsModalProps) {
    const { t } = useTranslation();

    return (
        <GenericModal
            open={props.isOpen}
            onClose={props.onClose}
            title={t("settings.interface.title") as string}
        >
            <SettingsSwitchInput
                name={t("settings.interface.darkMode")}
                prop="isDarkMode"
                icon="ModeNight"
            />
            <SettingsSwitchInput
                name={t("settings.interface.colliderPreview")}
                prop="colliderPreview"
                icon="ShapeLine"
            />
            <SettingsNumericInput
                name={t("settings.interface.colliderHandleSize")}
                prop="colliderHandleSize"
                icon="AdsClick"
                min={1}
                minorStepSize={0.5}
                stepSize={1}
                majorStepSize={2}
                label={"px"}
            />
            <SettingsSwitchInput
                name={t("settings.interface.scrollToSelection")}
                prop="scrollToSelection"
                icon="SwapVert"
            />
            <SettingsSwitchInput
                name={t("settings.interface.objNesting")}
                prop="elementNesting"
                icon="Layers"
            />
            <SettingsSwitchInput
                name={t("settings.interface.showRoomName")}
                prop="isRoomNameVisible"
                icon="Article"
            />
            <SettingsSwitchInput
                name={t("settings.interface.showInfo")}
                prop="isInfoVisible"
                icon="Info"
            />
            <SettingsSwitchInput
                name={t("settings.interface.audioDownmix")}
                prop="isAudioDownmixEnabled"
                icon="VolumeUp"
            />
            <SettingsSwitchInput
                name={t("settings.interface.grid")}
                prop="isGridVisible"
                icon="GridOn"
            />
            <SettingsNumericInput
                name={t("settings.interface.gridSize")}
                prop="gridSize"
                icon="AspectRatio"
                min={1}
                minorStepSize={0.5}
                stepSize={1}
                majorStepSize={2}
                label={"px"}
            />
            <SettingsNumericInput
                name={t("settings.interface.gridSpacing")}
                prop="gridSpacing"
                icon="LineWeight"
                min={1}
                minorStepSize={0.5}
                stepSize={1}
                majorStepSize={2}
                label={"px"}
            />
            <SettingsSwitchInput
                name={t("settings.interface.snapToGrid")}
                prop="isGridSnapEnabled"
                icon="Grid3x3"
            />
            <SettingsNumericInput
                name={t("settings.interface.snapResolution")}
                prop="gridSnapResolution"
                icon="GridGoldenratio"
                min={0}
                minorStepSize={0.05}
                stepSize={0.1}
                majorStepSize={1}
                label={"px"}
            />
            <SettingsNumericInput
                name={t("settings.interface.invisibleOpacity")}
                prop="invisibleOpacity"
                icon="Visibility"
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
                icon="Code"
            />
        </GenericModal>
    );
}