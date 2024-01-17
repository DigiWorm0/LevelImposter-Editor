import React from "react";
import { Classes, Icon, IconName, SwitchCard } from "@blueprintjs/core";
import LISettings from "../../../types/li/LISettings";
import useSettings from "../../../hooks/jotai/useSettings";

export interface SettingsSwitchInputProps {
    name: string;
    prop?: keyof LISettings;
    defaultValue: boolean;

    icon?: IconName;
}

export default function SettingsSwitchInput(props: SettingsSwitchInputProps) {
    const [settings, setSettings] = useSettings();

    const value = React.useMemo(() => {
        if (props.prop === undefined)
            return false;
        return (settings[props.prop] as boolean) ?? props.defaultValue;
    }, [settings, props.prop, props.defaultValue]);

    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.prop === undefined)
            return;
        setSettings({
            ...settings,
            [props.prop]: e.target.checked
        });
    }, [settings, props.prop, setSettings]);

    return (
        <SwitchCard
            checked={value}
            showAsSelectedWhenChecked={false}
            onChange={onChange}
            compact
        >
            <Icon
                icon={props.icon}
                className={Classes.TEXT_MUTED}
                style={{ marginRight: 8 }}
            />
            {props.name}
        </SwitchCard>
    )
}