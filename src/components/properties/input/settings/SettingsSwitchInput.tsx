import React from "react";
import LISettings from "../../../../types/li/LISettings";
import useSettings from "../../../../hooks/useSettings";
import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

export interface SettingsSwitchInputProps {
    name: string;
    prop: keyof LISettings;
    icon?: React.ReactNode;
}

export default function SettingsSwitchInput(props: SettingsSwitchInputProps) {
    const [settings, setSettings] = useSettings();

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
                <ListItemText primary={props.name} />
            </ListItemButton>
        </ListItem>
    );
}