import { Button, Classes, ControlGroup, Dialog, FormGroup, Label, NumericInput, Switch } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import React from "react";
import { useMapProperties } from "../../hooks/jotai/useMap";
import useSettings from "../../hooks/jotai/useSettings";
import { DEFAULT_GRID_SNAP_RESOLUTION, DEFAULT_INVISIBLE_OPACITY } from "../../types/generic/Constants";

export default function SettingsButton() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [settings, setSettings] = useSettings();
    const [properties, setProperties] = useMapProperties();

    return (
        <>
            <Tooltip2
                content="Open Settings"
                position="bottom">

                <Button
                    className={Classes.MINIMAL}
                    icon="cog"
                    onClick={() => { setIsOpen(true) }} />

            </Tooltip2>

            <Dialog
                isOpen={isOpen}
                onClose={() => { setIsOpen(false) }}
                title="Settings"
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
                    </FormGroup>

                    <FormGroup label="Map">

                        <Label className="bp4-inline">
                            <input type="color" value={properties.bgColor} className="bp4-input" onChange={(e) => {
                                setProperties({ ...properties, bgColor: e.target.value });
                            }} />
                        </Label>

                    </FormGroup>
                </div>

            </Dialog>
        </>
    );
}