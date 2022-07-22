import { Button, Classes, Dialog, FormGroup, Label, Switch } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import React from "react";
import useMap, { useMapProperties } from "../../hooks/jotai/useMap";
import useSettings from "../../hooks/jotai/useSettings";

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
                portalClassName={settings.isDarkMode ? "bp4-dark" : ""}>

                <div style={{ margin: 15 }} >
                    <FormGroup label="Interface">

                        <Switch
                            label="Dark Mode"
                            checked={settings.isDarkMode}
                            onChange={(e) => {
                                setSettings({ ...settings, isDarkMode: e.currentTarget.checked });
                            }} />

                        <Switch
                            label="Grid"
                            checked={settings.isGridVisible}
                            onChange={(e) => {
                                setSettings({ ...settings, isGridVisible: e.currentTarget.checked });
                            }} />

                        <Switch
                            label="Axis"
                            checked={settings.isAxisVisible}
                            onChange={(e) => {
                                setSettings({ ...settings, isAxisVisible: e.currentTarget.checked });
                            }} />

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