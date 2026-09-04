import React from "react";
import {EditorSettings} from "@editor/settings/EditorSettings";
import {Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useAtom} from "jotai";
import {settingsAtom} from "@editor/settings/settingsStore";

export interface SettingsSwitchInputProps {
    name: string;
    prop: keyof EditorSettings;
    icon?: React.ReactNode;
    experimental?: boolean;
}

export default function SettingsSwitchInput(props: SettingsSwitchInputProps) {
    const [settings, setSettings] = useAtom(settingsAtom);
    const {t} = useTranslation();

    const value = settings[props.prop] as boolean;

    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSettings({
            ...settings,
            [props.prop]: e.target.checked
        });
    }, [settings, props.prop, setSettings]);

    const onClick = React.useCallback(() => {
        setSettings({
            ...settings,
            [props.prop]: !value
        });
    }, [settings, props.prop, setSettings, value]);

    return (

        <Tooltip
            title={props.experimental ? t("settings.experimentalInfo") : undefined}

        >
            <ListItem
                dense
                disablePadding
                secondaryAction={
                    <Checkbox
                        edge={"end"}
                        checked={value}
                        onChange={onChange}
                    />
                }
            >
                <ListItemButton onClick={onClick}>
                    {props.icon && <ListItemIcon>{props.icon}</ListItemIcon>}
                    <ListItemText primary={props.name}/>

                </ListItemButton>
            </ListItem>
        </Tooltip>
    );
}