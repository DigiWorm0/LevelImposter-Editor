import React from "react";
import LISettings from "../../../types/li/LISettings";
import useSettings from "../../../hooks/useSettings";
import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MaterialIcon, { IconName } from "../../utils/MaterialIcon";

export interface SettingsSwitchInputProps {
    name: string;
    prop?: keyof LISettings;
    icon?: IconName;
}

export default function SettingsSwitchInput(props: SettingsSwitchInputProps) {
    const [settings, setSettings] = useSettings();

    const value = React.useMemo(() => {
        if (props.prop === undefined)
            return false;
        return settings[props.prop] as boolean;
    }, [settings, props.prop]);

    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.prop === undefined)
            return;
        setSettings({
            ...settings,
            [props.prop]: e.target.checked
        });
    }, [settings, props.prop, setSettings]);

    const onClick = React.useCallback(() => {
        if (props.prop === undefined)
            return;
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
                {props.icon && (
                    <ListItemIcon><MaterialIcon icon={props.icon} /></ListItemIcon>
                )}
                <ListItemText primary={props.name} />
            </ListItemButton>
        </ListItem>
    )
}