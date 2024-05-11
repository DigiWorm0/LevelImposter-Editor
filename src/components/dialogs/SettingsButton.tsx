import { Button, CardList, Classes, Dialog, Section, Tooltip } from "@blueprintjs/core";
import React from "react";
import { useTranslation } from "react-i18next";
import useSettings from "../../hooks/useSettings";
import SettingsSwitchInput from "../properties/input/SettingsSwitchInput";
import SettingsNumericInput from "../properties/input/SettingsNumericInput";
import {
    DEFAULT_COLLIDER_HANDLE_SIZE,
    DEFAULT_GRID_SIZE,
    DEFAULT_GRID_SNAP_RESOLUTION,
    DEFAULT_INVISIBLE_OPACITY
} from "../../types/generic/Constants";
import SettingsLocalizationInput from "../properties/input/SettingsLocalizationInput";

export default function SettingsButton() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);
    const [settings] = useSettings();

    return (
        <>
            <Tooltip
                content={t("settings.interface.title") as string}
                position="bottom"
            >
                <Button
                    className={Classes.MINIMAL}
                    icon="cog"
                    onClick={() => {
                        setIsOpen(true)
                    }}
                />
            </Tooltip>

            <Dialog
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false)
                }}
                portalClassName={settings.isDarkMode === false ? "" : "bp5-dark"}
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
                            defaultValue={true}
                            icon="moon"
                        />
                        <SettingsSwitchInput
                            name={t("settings.interface.colliderPreview")}
                            prop="colliderPreview"
                            defaultValue={true}
                            icon="polygon-filter"
                        />
                        <SettingsNumericInput
                            name={t("settings.interface.colliderHandleSize")}
                            prop="colliderHandleSize"
                            defaultValue={DEFAULT_COLLIDER_HANDLE_SIZE}
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
                            defaultValue={true}
                            icon="zoom-to-fit"
                        />
                        <SettingsSwitchInput
                            name={t("settings.interface.objNesting")}
                            prop="elementNesting"
                            defaultValue={false}
                            icon="layers"
                        />
                        <SettingsSwitchInput
                            name={t("settings.interface.showRoomName")}
                            prop="isRoomNameVisible"
                            defaultValue={true}
                            icon="home"
                        />
                        <SettingsSwitchInput
                            name={t("settings.interface.showInfo")}
                            prop="isInfoVisible"
                            defaultValue={true}
                            icon="info-sign"
                        />
                        <SettingsSwitchInput
                            name={t("settings.interface.audioDownmix")}
                            prop="isAudioDownmixEnabled"
                            defaultValue={true}
                            icon="volume-up"
                        />
                        <SettingsSwitchInput
                            name={t("settings.interface.grid")}
                            prop="isGridVisible"
                            defaultValue={true}
                            icon="grid"
                        />
                        <SettingsNumericInput
                            name={t("settings.interface.gridSize")}
                            prop="gridSize"
                            defaultValue={DEFAULT_GRID_SIZE}
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
                            defaultValue={true}
                            icon="layout-grid"
                        />
                        <SettingsNumericInput
                            name={t("settings.interface.snapResolution")}
                            prop="gridSnapResolution"
                            defaultValue={DEFAULT_GRID_SNAP_RESOLUTION}
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
                            defaultValue={DEFAULT_INVISIBLE_OPACITY}
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
                            defaultValue={false}
                            icon="code"
                        />
                    </CardList>
                </Section>
            </Dialog>
        </>
    );
}