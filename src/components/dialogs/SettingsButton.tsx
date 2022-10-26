import { Button, Classes, ControlGroup, Dialog, FileInput, FormGroup, Label, NumericInput, Switch } from "@blueprintjs/core";
import { MenuItem2, Tooltip2 } from "@blueprintjs/popover2";
import { ItemRenderer, Select2 } from "@blueprintjs/select";
import React from "react";
import generateGUID from "../../hooks/generateGUID";
import { useMapProperties } from "../../hooks/jotai/useMap";
import useSettings from "../../hooks/jotai/useSettings";
import useTranslation from "../../hooks/useTranslation";
import { EXILE_IDS } from "../../types/au/AUElementDB";
import { DEFAULT_GRID_SNAP_RESOLUTION, DEFAULT_INVISIBLE_OPACITY, DEFAULT_VOLUME } from "../../types/generic/Constants";
import LIColor from "../../types/li/LIColor";
import LITranslations from "../../types/localization/LITranslations";
import ColorPicker from "../ColorPicker";

const LanguageSelect = Select2.ofType<string>();
const ExileSelect = Select2.ofType<string>();

export default function SettingsButton() {
    const translation = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);
    const [settings, setSettings] = useSettings();
    const [properties, setProperties] = useMapProperties();

    const languageSelectRenderer: ItemRenderer<string> = (language, props) => (
        <MenuItem2
            key={language}
            text={LITranslations[language].LanguageName}
            label={language}
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
                content={translation.Settings}
                position="bottom">

                <Button
                    className={Classes.MINIMAL}
                    icon="cog"
                    onClick={() => { setIsOpen(true) }} />

            </Tooltip2>

            <Dialog
                isOpen={isOpen}
                onClose={() => { setIsOpen(false) }}
                title={translation.Settings}
                portalClassName={settings.isDarkMode === false ? "" : "bp4-dark"}>

                <div style={{ margin: 15 }} >
                    <FormGroup label="Interface">

                        <Switch
                            label="Developer Mode"
                            checked={settings.isDevMode === undefined ? false : settings.isDevMode}
                            onChange={(e) => {
                                setSettings({ ...settings, isDevMode: e.currentTarget.checked });
                            }} />

                        <Switch
                            label="Dark Mode"
                            checked={settings.isDarkMode === undefined ? true : settings.isDarkMode}
                            onChange={(e) => {
                                setSettings({ ...settings, isDarkMode: e.currentTarget.checked });
                            }} />

                        <Switch
                            label="Collider Preview"
                            checked={settings.colliderPreview === undefined ? true : settings.colliderPreview}
                            onChange={(e) => {
                                setSettings({ ...settings, colliderPreview: e.currentTarget.checked });
                            }} />

                        <Switch
                            label="Scroll to Selection"
                            checked={settings.scrollToSelection === undefined ? true : settings.scrollToSelection}
                            onChange={(e) => {
                                setSettings({ ...settings, scrollToSelection: e.currentTarget.checked });
                            }} />

                        <Switch
                            label="Object Nesting"
                            checked={settings.elementNesting === undefined ? false : settings.elementNesting}
                            onChange={(e) => {
                                setSettings({ ...settings, elementNesting: e.currentTarget.checked });
                            }} />

                        <Switch
                            label="Grid"
                            checked={settings.isGridVisible === undefined ? true : settings.isGridVisible}
                            onChange={(e) => {
                                setSettings({ ...settings, isGridVisible: e.currentTarget.checked });
                            }} />

                        <Switch
                            label="Snap to Grid"
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
                            <Label>Grid Snap Resolution</Label>
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
                            <Label>Invisible Opacity</Label>
                        </ControlGroup>
                        {/*
                        <ControlGroup fill={true} style={{ textAlign: "center", marginTop: 10 }}>
                            <LanguageSelect
                                filterable={false}
                                items={Object.keys(LITranslations)}
                                itemRenderer={languageSelectRenderer}
                                onItemSelect={(language) => {
                                    setSettings({ ...settings, language });
                                }}>

                                <Button
                                    rightIcon="caret-down"
                                    text={settings.language ? LITranslations[settings.language]?.LanguageName : "Default"}
                                    fill
                                />
                            </LanguageSelect>
                            <Label>Localization</Label>
                        </ControlGroup>
                        */}
                    </FormGroup>

                    <FormGroup label="Map">

                        <ColorPicker
                            disableAlpha
                            title="Background Color"
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
                                    text={properties.exileID || "Exile Animation"}
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