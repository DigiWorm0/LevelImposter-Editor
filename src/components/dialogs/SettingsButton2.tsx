import { Button, CardList, Classes, Dialog, Tooltip } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";
import { ItemRenderer } from "@blueprintjs/select";
import React from "react";
import { useTranslation } from "react-i18next";
import { useMapProperties } from "../../hooks/jotai/useMap";
import useSettings from "../../hooks/jotai/useSettings";
import LIColor from "../../types/li/LIColor";
import SettingsSwitchInput from "../properties/input/SettingsSwitchInput";
import SettingsNumericInput from "../properties/input/SettingsNumericInput";
import {
    DEFAULT_COLLIDER_HANDLE_SIZE,
    DEFAULT_GRID_SIZE,
    DEFAULT_GRID_SNAP_RESOLUTION,
    DEFAULT_INVISIBLE_OPACITY
} from "../../types/generic/Constants";
import SettingsLocalizationInput from "../properties/input/SettingsLocalizationInput";

export default function SettingsButton2() {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);
    const [settings, setSettings] = useSettings();
    const [properties, setProperties] = useMapProperties();

    const getLanguageName = (i18nCode: string): string => {
        return i18nCode === "auto" ? t("language.auto") : i18n.t(`language.${i18nCode}`) as string;
    }

    const languageSelectRenderer: ItemRenderer<string> = (i18nCode, props) => (
        <MenuItem2
            key={i18nCode}
            text={getLanguageName(i18nCode)}
            label={i18nCode}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
            intent={i18nCode !== "auto" ? "success" : undefined}
            onClick={props.handleClick}
            onFocus={props.handleFocus} />
    );

    const exileSelectRenderer: ItemRenderer<string> = (exileID, props) => (
        <MenuItem2
            key={exileID}
            text={exileID}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
            onClick={props.handleClick}
            onFocus={props.handleFocus} />
    );

    const hexToColor = (hex: string): LIColor => {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);
        return { r, g, b, a: 1 };
    }

    const colorToHex = (color: LIColor): string => {
        const r = Math.round(color.r).toString(16).padStart(2, "0");
        const g = Math.round(color.g).toString(16).padStart(2, "0");
        const b = Math.round(color.b).toString(16).padStart(2, "0");
        return `#${r}${g}${b}`;
    }

    return (
        <>
            <Tooltip
                content={t("settings.title") as string}
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
                title={t("settings.title")}
                portalClassName={settings.isDarkMode === false ? "" : "bp5-dark"}
            >
                <CardList bordered={false}>
                    <SettingsSwitchInput
                        name={t("settings.interface.devMode")}
                        prop="isDevMode"
                        defaultValue={false}
                        icon="code"
                    />
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
                </CardList>
            </Dialog>
        </>
    );
}