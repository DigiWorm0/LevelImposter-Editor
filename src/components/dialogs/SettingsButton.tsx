import { setElement } from "../../hooks/useElement";
import useMap from "../../hooks/useMap";
import AUElement from "../../types/au/AUElement";
import AUElementDB from "../../types/au/AUElementDB";
import LIElement from "../../types/li/LIElement";
import generateGUID from '../../hooks/generateGUID';
import { Button, Classes, Dialog, FormGroup, InputGroup, Menu, MenuItem, Switch } from "@blueprintjs/core";
import { Omnibar } from "@blueprintjs/select";
import React from "react";
import useSettings from "../../hooks/useSettings";

export default function SettingsButton() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [settings, setSettings] = useSettings();

    return (
        <>
            <Button
                className={Classes.MINIMAL}
                icon="cog"
                text="Settings"
                onClick={() => { setIsOpen(true) }} />

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
                </div>

            </Dialog>
        </>
    );
}