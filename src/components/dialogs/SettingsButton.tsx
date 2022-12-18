import { Button, Classes, ControlGroup, Dialog, FormGroup, Label, NumericInput, Switch } from "@blueprintjs/core";
import { MenuItem2, Tooltip2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import React from "react";
import { useTranslation } from "react-i18next";
import { useMapProperties } from "../../hooks/jotai/useMap";
import useSettings from "../../hooks/jotai/useSettings";
import { EXILE_IDS } from "../../types/au/AUElementDB";
import { DEFAULT_COLLIDER_HANDLE_SIZE, DEFAULT_GRID_SNAP_RESOLUTION, DEFAULT_INVISIBLE_OPACITY } from "../../types/generic/Constants";
import SelectableLanguages, { Language } from "../../types/generic/Language";
import LIColor from "../../types/li/LIColor";
import ColorPicker from "../ColorPicker";

const LanguageSelect = Select2.ofType<Language>();
const ExileSelect = Select2.ofType<string>();

export default function SettingsButton() {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);
    const [settings, setSettings] = useSettings();
    const [properties, setProperties] = useMapProperties();

    const languageSelectRenderer: ItemRenderer<Language> = (language, props) => (
        <MenuItem2
            key={language.value}
            text={language.label}
            label={language.value}
            active={props.modifiers.active}
            disabled={props.modifiers.disabled}
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
        return { r, g, b, a: 0 };
    }

    const colorToHex = (color: LIColor): string => {
        const r = Math.round(color.r).toString(16).padStart(2, "0");
        const g = Math.round(color.g).toString(16).padStart(2, "0");
        const b = Math.round(color.b).toString(16).padStart(2, "0");
        return `#${r}${g}${b}`;
    }

    return (
        <>
            <Tooltip2
                content={t("settings.title") as string}
                position="bottom">

                <Button
                    className={Classes.MINIMAL}
                    icon="cog"
                    onClick={() => { setIsOpen(true) }} />

            </Tooltip2>

            <Dialog
                isOpen={isOpen}
                onClose={() => { setIsOpen(false) }}
                title={t("settings.title")}
                portalClassName={settings.isDarkMode === false ? "" : "bp4-dark"}>

                <div style={{ margin: 15 }} >
                    <FormGroup label={t("settings.interface.title")}>
                        <Switch
                            label={t("settings.interface.devMode") as string}
                            checked={settings.isDevMode === undefined ? false : settings.isDevMode}
                            onChange={(e) => {
                                setSettings({ ...settings, isDevMode: e.currentTarget.checked });
                            }} />

                        <Switch
                            label={t("settings.interface.darkMode") as string}
                            checked={settings.isDarkMode === undefined ? true : settings.isDarkMode}
                            onChange={(e) => {
                                setSettings({ ...settings, isDarkMode: e.currentTarget.checked });
                            }} />

                        <Switch
                            label={t("settings.interface.colliderPreview") as string}
                            checked={settings.colliderPreview === undefined ? true : settings.colliderPreview}
                            onChange={(e) => {
                                setSettings({ ...settings, colliderPreview: e.currentTarget.checked });
                            }} />

                        <ControlGroup fill={true}>
                            <NumericInput
                                defaultValue={settings.colliderHandleSize === undefined ? DEFAULT_COLLIDER_HANDLE_SIZE : settings.colliderHandleSize}
                                min={0}
                                minorStepSize={0.01}
                                stepSize={0.1}
                                majorStepSize={1}
                                onValueChange={(value) => {
                                    setSettings({ ...settings, colliderHandleSize: value });
                                }} />
                            <Label>
                                {t("settings.interface.colliderHandleSize") as string}
                            </Label>
                        </ControlGroup>

                        <Switch
                            label={t("settings.interface.scrollToSelection") as string}
                            checked={settings.scrollToSelection === undefined ? true : settings.scrollToSelection}
                            onChange={(e) => {
                                setSettings({ ...settings, scrollToSelection: e.currentTarget.checked });
                            }} />

                        <Switch
                            label={t("settings.interface.objNesting") as string}
                            checked={settings.elementNesting === undefined ? false : settings.elementNesting}
                            onChange={(e) => {
                                setSettings({ ...settings, elementNesting: e.currentTarget.checked });
                            }} />

                        <Switch
                            label={t("settings.interface.grid") as string}
                            checked={settings.isGridVisible === undefined ? true : settings.isGridVisible}
                            onChange={(e) => {
                                setSettings({ ...settings, isGridVisible: e.currentTarget.checked });
                            }} />

                        <Switch
                            label={t("settings.interface.snapToGrid") as string}
                            checked={settings.isGridSnapEnabled === undefined ? true : settings.isGridSnapEnabled}
                            onChange={(e) => {
                                setSettings({ ...settings, isGridSnapEnabled: e.currentTarget.checked });
                            }} />

                        <ControlGroup fill={true}>
                            <NumericInput
                                defaultValue={settings.gridSnapResolution === undefined ? DEFAULT_GRID_SNAP_RESOLUTION : settings.gridSnapResolution}
                                min={0}
                                max={10}
                                minorStepSize={0.01}
                                stepSize={0.1}
                                majorStepSize={1}
                                onValueChange={(value) => {
                                    setSettings({ ...settings, gridSnapResolution: value });
                                }} />
                            <Label>
                                {t("settings.interface.snapResolution") as string}
                            </Label>
                        </ControlGroup>

                        <ControlGroup fill={true}>
                            <NumericInput
                                defaultValue={settings.invisibleOpacity === undefined ? DEFAULT_INVISIBLE_OPACITY : settings.invisibleOpacity}
                                min={0}
                                max={1}
                                minorStepSize={0.01}
                                stepSize={0.1}
                                majorStepSize={1}
                                onValueChange={(value) => {
                                    setSettings({ ...settings, invisibleOpacity: value });
                                }} />
                            <Label>
                                {t("settings.interface.invisibleOpacity") as string}
                            </Label>
                        </ControlGroup>

                        <ControlGroup fill={true} style={{ textAlign: "center", marginTop: 10 }}>
                            <LanguageSelect
                                filterable={false}
                                items={SelectableLanguages}
                                itemRenderer={languageSelectRenderer}
                                onItemSelect={(language) => {
                                    setSettings({ ...settings, language: language.value });
                                }}>

                                <Button
                                    rightIcon="caret-down"
                                    text={settings.language ? SelectableLanguages.find(l => l.value === settings.language)?.label : "Auto"}
                                    fill
                                />
                            </LanguageSelect>
                            <Label>Localization</Label>
                        </ControlGroup>

                    </FormGroup>

                    <FormGroup label={t("settings.map.title")}>

                        <Switch
                            label={t("settings.map.showPingTracker") as string}
                            checked={properties.showPingIndicator === undefined ? true : properties.showPingIndicator}
                            onChange={(e) => {
                                setProperties({ ...properties, showPingIndicator: e.currentTarget.checked });
                            }} />

                        <ColorPicker
                            disableAlpha
                            title={t("settings.map.bgColor") as string}
                            color={hexToColor(properties.bgColor || "#000000")}
                            onChange={(color) => {
                                setProperties({ ...properties, bgColor: colorToHex(color) });
                            }} />

                        <ControlGroup fill>
                            <ExileSelect
                                filterable={false}
                                items={EXILE_IDS}
                                itemRenderer={exileSelectRenderer}
                                onItemSelect={(exileID) => {
                                    setProperties({ ...properties, exileID });
                                }}>

                                <Button
                                    fill
                                    rightIcon="caret-down"
                                    text={properties.exileID || t("settings.map.exileAnim") as string}
                                />

                            </ExileSelect>
                        </ControlGroup>
                        {/*
                        <ControlGroup fill>

                            <ControlGroup>
                                <FileInput
                                    inputProps={{
                                        accept: ".wav",
                                        type: "file"
                                    }}
                                    hasSelection={!!properties.sabotageSound}
                                    text={properties.sabotageSound ? properties.sabotageSound.name : "Upload Sabotage Sound"}
                                    onInputChange={(e) => {
                                        const file = e.currentTarget.files?.[0];
                                        if (file == null) return;
                                        const reader = new FileReader();
                                        reader.onload = (e) => {
                                            setProperties({
                                                ...properties, sabotageSound: {
                                                    id: generateGUID(),
                                                    name: file.name,
                                                    data: e.target?.result as string,
                                                    volume: DEFAULT_VOLUME,
                                                    isPreset: false,
                                                }
                                            });
                                        };
                                        reader.readAsDataURL(file);
                                    }} />

                                <Button
                                    minimal
                                    icon="refresh"
                                    disabled={!properties.sabotageSound}
                                    onClick={() => {
                                        setProperties({ ...properties, sabotageSound: undefined });
                                    }} />
                            </ControlGroup>


                            <Label style={{
                                paddingTop: 5,
                            }}>
                                Sabotage Sound
                            </Label>
                        </ControlGroup>
                        */}

                    </FormGroup>
                </div>

            </Dialog>
        </>
    );
}