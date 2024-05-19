import React from "react";
import LISettings, { DEFAULT_SETTINGS } from "../../../types/li/LISettings";
import useSettings from "../../../hooks/useSettings";
import clamp from "../../../utils/clamp";
import { InputAdornment, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material";
import MaterialIcon, { IconName } from "../../utils/MaterialIcon";

export interface SettingsNumericInputProps {
    name: string;
    prop?: keyof LISettings;

    icon?: IconName;
    disabled?: boolean;
    min?: number;
    max?: number;
    minorStepSize?: number;
    stepSize?: number;
    majorStepSize?: number;
    label?: string;
    isPercentage?: boolean;
}

export default function SettingsNumericInput(props: SettingsNumericInputProps) {
    const [settings, setSettings] = useSettings();

    const defaultValue = React.useMemo(() => {
        if (props.prop === undefined)
            return 0;
        return DEFAULT_SETTINGS[props.prop] as number;
    }, [props.prop]);

    const value = React.useMemo(() => {
        if (props.prop === undefined)
            return 0;
        return settings[props.prop] as number;
    }, [settings, props.prop]);

    const onChange = React.useCallback((numericVal: number, stringVal: string) => {
        if (props.prop === undefined)
            return;
        setSettings({
            ...settings,
            [props.prop]: isNaN(parseFloat(stringVal)) ? defaultValue : clamp(numericVal, props.min ?? -Infinity, props.max ?? Infinity)
        });
    }, [setSettings, settings, props.prop, props.min, props.max, defaultValue]);

    return (
        <ListItem
            dense
            disablePadding
            secondaryAction={
                <TextField
                    size={"small"}
                    type={"number"}
                    variant={"standard"}
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value), e.target.value)}
                    disabled={props.disabled}
                    style={{ width: 150 }}
                    InputProps={{
                        endAdornment: (<InputAdornment position={"end"}>{props.label}</InputAdornment>),
                        inputProps: {
                            step: props.stepSize,
                            min: props.min,
                            max: props.max
                        }
                    }}
                />
            }
        >
            <ListItemButton>
                {props.icon && (
                    <ListItemIcon><MaterialIcon icon={props.icon} /></ListItemIcon>
                )}
                <ListItemText primary={props.name} />
            </ListItemButton>
        </ListItem>
    )
}