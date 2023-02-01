import { Button, Classes, ControlGroup, Dialog, H5, Icon, Label, NumericInput, Switch } from "@blueprintjs/core";
import { MenuItem2, Tooltip2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import React from "react";
import { useTranslation } from "react-i18next";
import { useMapProperties } from "../../hooks/jotai/useMap";
import useSettings from "../../hooks/jotai/useSettings";
import { EXILE_IDS } from "../../types/au/AUElementDB";
import { DEFAULT_COLLIDER_HANDLE_SIZE, DEFAULT_GRID_SIZE, DEFAULT_GRID_SNAP_RESOLUTION, DEFAULT_INVISIBLE_OPACITY, LANGUAGES } from "../../types/generic/Constants";
import LIColor from "../../types/li/LIColor";
import ColorPicker from "../utils/ColorPicker";

const LanguageSelect = Select2.ofType<string>();
const ExileSelect = Select2.ofType<string>();

export default function SettingsButton() {
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

                <div style={{
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 10,
                    padding: 15
                }}>
                    <H5>
                        <Icon
                            icon="modal"
                            style={{ marginRight: 8, marginBottom: 2 }} />
                        {t("settings.interface.title")}
                    </H5>
                    <ControlGroup fill>
                        <Label style={{ width: "100%" }}>
                            {t("settings.interface.devMode") as string}
                        </Label>
                        <Switch
                            checked={settings.isDevMode === undefined ? false : settings.isDevMode}
                            onChange={(e) => {
                                setSettings({ ...settings, isDevMode: e.currentTarget.checked });
                            }}
                            style={{ marginLeft: 10 }} />
                    </ControlGroup>

                    <ControlGroup fill>
                        <Label style={{ width: "100%" }}>
                            {t("settings.interface.darkMode") as string}
                        </Label>
                        <Switch
                            checked={settings.isDarkMode === undefined ? true : settings.isDarkMode}
                            onChange={(e) => {
                                setSettings({ ...settings, isDarkMode: e.currentTarget.checked });
                            }}
                            style={{ marginLeft: 10 }} />
                    </ControlGroup>

                    <ControlGroup fill>
                        <Label style={{ width: "100%" }}>
                            {t("settings.interface.colliderPreview") as string}
                        </Label>
                        <Switch
                            checked={settings.colliderPreview === undefined ? true : settings.colliderPreview}
                            onChange={(e) => {
                                setSettings({ ...settings, colliderPreview: e.currentTarget.checked });
                            }}
                            style={{ marginLeft: 10 }} />
                    </ControlGroup>

                    <ControlGroup fill>
                        <Label style={{ width: "100%" }}>
                            {t("settings.interface.colliderHandleSize") as string}
                        </Label>
                        <NumericInput
                            defaultValue={settings.colliderHandleSize === undefined ? DEFAULT_COLLIDER_HANDLE_SIZE : settings.colliderHandleSize}
                            min={0}
                            minorStepSize={0.01}
                            stepSize={0.1}
                            majorStepSize={1}
                            onValueChange={(value) => {
                                setSettings({ ...settings, colliderHandleSize: value });
                            }}
                            buttonPosition="none"
                            style={{ marginLeft: 10, marginTop: -5, width: 180 }} />

                    </ControlGroup>

                    <ControlGroup fill>
                        <Label style={{ width: "100%" }}>
                            {t("settings.interface.scrollToSelection") as string}
                        </Label>
                        <Switch
                            checked={settings.scrollToSelection === undefined ? true : settings.scrollToSelection}
                            onChange={(e) => {
                                setSettings({ ...settings, scrollToSelection: e.currentTarget.checked });
                            }}
                            style={{ marginLeft: 10 }} />
                    </ControlGroup>

                    <ControlGroup fill>
                        <Label style={{ width: "100%" }}>
                            {t("settings.interface.objNesting") as string}
                        </Label>
                        <Switch
                            checked={settings.elementNesting === undefined ? false : settings.elementNesting}
                            onChange={(e) => {
                                setSettings({ ...settings, elementNesting: e.currentTarget.checked });
                            }}
                            style={{ marginLeft: 10 }} />
                    </ControlGroup>

                    <ControlGroup fill>
                        <Label style={{ width: "100%" }}>
                            {t("settings.interface.grid") as string}
                        </Label>
                        <Switch
                            checked={settings.isGridVisible === undefined ? true : settings.isGridVisible}
                            onChange={(e) => {
                                setSettings({ ...settings, isGridVisible: e.currentTarget.checked });
                            }}
                            style={{ marginLeft: 10 }} />
                    </ControlGroup>

                    <ControlGroup fill>
                        <Label style={{ width: "100%" }}>
                            {t("settings.interface.gridSize") as string}
                        </Label>
                        <NumericInput
                            defaultValue={settings.gridSize === undefined ? DEFAULT_GRID_SIZE : settings.gridSize}
                            min={0}
                            max={1000}
                            minorStepSize={1}
                            stepSize={5}
                            majorStepSize={10}
                            onValueChange={(value) => {
                                setSettings({ ...settings, gridSize: value });
                            }}
                            buttonPosition="none"
                            style={{ marginLeft: 10, marginTop: -5, width: 180 }} />
                    </ControlGroup>

                    <ControlGroup fill>
                        <Label style={{ width: "100%" }}>
                            {t("settings.interface.snapToGrid") as string}
                        </Label>
                        <Switch
                            checked={settings.isGridSnapEnabled === undefined ? true : settings.isGridSnapEnabled}
                            onChange={(e) => {
                                setSettings({ ...settings, isGridSnapEnabled: e.currentTarget.checked });
                            }}
                            style={{ marginLeft: 10 }} />
                    </ControlGroup>


                    <ControlGroup fill>
                        <Label style={{ width: "100%" }}>
                            {t("settings.interface.snapResolution") as string}
                        </Label>
                        <NumericInput
                            defaultValue={settings.gridSnapResolution === undefined ? DEFAULT_GRID_SNAP_RESOLUTION : settings.gridSnapResolution}
                            min={0}
                            max={10}
                            minorStepSize={0.01}
                            stepSize={0.1}
                            majorStepSize={1}
                            onValueChange={(value) => {
                                setSettings({ ...settings, gridSnapResolution: value });
                            }}
                            buttonPosition="none"
                            style={{ marginLeft: 10, marginTop: -5, width: 180 }} />
                    </ControlGroup>

                    <ControlGroup fill>
                        <Label style={{ width: "100%" }}>
                            {t("settings.interface.invisibleOpacity") as string}
                        </Label>
                        <NumericInput
                            defaultValue={settings.invisibleOpacity === undefined ? DEFAULT_INVISIBLE_OPACITY : settings.invisibleOpacity}
                            min={0}
                            max={1}
                            minorStepSize={0.01}
                            stepSize={0.1}
                            majorStepSize={1}
                            onValueChange={(value) => {
                                setSettings({ ...settings, invisibleOpacity: value });
                            }}
                            buttonPosition="none"
                            style={{ marginLeft: 10, marginTop: -5, width: 180 }} />
                    </ControlGroup>

                    <ControlGroup fill>
                        <Label style={{ width: "100%" }}>
                            {t("settings.interface.localization") as string}
                        </Label>
                        <LanguageSelect
                            filterable={false}
                            items={LANGUAGES}
                            itemRenderer={languageSelectRenderer}
                            onItemSelect={(i18nCode) => {
                                setSettings({ ...settings, language: i18nCode });
                            }}
                            popoverProps={{ minimal: true }}
                        >

                            <Button
                                rightIcon="caret-down"
                                text={getLanguageName(settings.language || "auto")}
                                style={{ marginLeft: 10, marginTop: -5, width: 180 }}
                            />
                        </LanguageSelect>
                    </ControlGroup>

                    <H5 style={{ marginTop: 10 }}>
                        <Icon
                            icon="map"
                            style={{ marginRight: 8, marginBottom: 2 }} />
                        {t("settings.map.title")}
                    </H5>

                    <ControlGroup fill>
                        <Label style={{ width: "100%" }}>
                            {t("settings.map.showPingTracker") as string}
                        </Label>
                        <Switch
                            checked={properties.showPingIndicator === undefined ? true : properties.showPingIndicator}
                            onChange={(e) => {
                                setProperties({ ...properties, showPingIndicator: e.currentTarget.checked });
                            }}
                            style={{ marginLeft: 10 }} />
                    </ControlGroup>

                    <ControlGroup fill>
                        <Label style={{ width: "100%" }}>
                            {t("settings.map.pixelArtMode") as string}
                        </Label>
                        <Switch
                            checked={properties.pixelArtMode === undefined ? false : properties.pixelArtMode}
                            onChange={(e) => {
                                setProperties({ ...properties, pixelArtMode: e.currentTarget.checked });
                            }}
                            style={{ marginLeft: 10 }} />
                    </ControlGroup>

                    <ControlGroup fill>
                        <Label style={{ width: "100%" }}>
                            {t("settings.map.canRemix") as string}
                        </Label>
                        <Switch
                            checked={properties.canRemix === undefined ? true : properties.canRemix}
                            onChange={(e) => {
                                setProperties({ ...properties, canRemix: e.currentTarget.checked });
                            }}
                            style={{ marginLeft: 10 }} />
                    </ControlGroup>

                    <ControlGroup fill>
                        <Label style={{ width: "100%" }}>
                            {t("settings.map.skyboxColor") as string}
                        </Label>
                        <ColorPicker
                            disableAlpha
                            title={t("settings.map.setColor") as string}
                            color={hexToColor(properties.bgColor || "#ffffff")}
                            onChange={(color) => {
                                setProperties({ ...properties, bgColor: colorToHex(color) });
                            }}
                            style={{ marginLeft: 10, marginTop: -5, minWidth: 180 }}
                        />
                    </ControlGroup>

                    <ControlGroup fill>
                        <Label style={{ width: "100%" }}>
                            {t("settings.map.exileAnim") as string}
                        </Label>
                        <ExileSelect
                            filterable={false}
                            items={EXILE_IDS}
                            itemRenderer={exileSelectRenderer}
                            onItemSelect={(exileID) => {
                                setProperties({ ...properties, exileID });
                            }}
                            popoverProps={{ minimal: true }}
                        >

                            <Button
                                rightIcon="caret-down"
                                text={properties.exileID || t("settings.map.setAnim") as string}
                                style={{ marginLeft: 10, marginTop: -5, minWidth: 180 }}
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
                </div>
            </Dialog>
        </>
    );
}