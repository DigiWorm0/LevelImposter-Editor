import React from "react";
import LISettings from "../../../../types/li/LISettings";
import useSettings from "../../../../hooks/useSettings";
import { InputAdornment, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import FlexNumericInput from "../../util/FlexNumericInput";

export interface SettingsNumericInputProps {
    name: string;
    prop: keyof LISettings;

    icon?: React.ReactNode;
    disabled?: boolean;
    min?: number;
    max?: number;
    stepSize?: number;
    label?: string;
}

export default function SettingsNumericInput(props: SettingsNumericInputProps) {
    const [settings, setSettings] = useSettings();

    const onChange = React.useCallback((value: number) => {
        setSettings({
            ...settings,
            [props.prop]: value
        });
    }, [settings, props.prop]);

    return (
        <ListItem
            dense
            disablePadding
            secondaryAction={
                <FlexNumericInput
                    value={settings[props.prop] as number}
                    onChange={onChange}
                    min={props.min}
                    max={props.max}
                    stepSize={props.stepSize}
                    inputProps={{
                        style: { width: 150 },
                        disabled: props.disabled,
                        InputProps: {
                            endAdornment: (<InputAdornment position={"end"}>{props.label}</InputAdornment>)
                        },
                        variant: "standard"
                    }}
                />
            }
        >
            <ListItemButton>
                {props.icon && <ListItemIcon>{props.icon}</ListItemIcon>}
                <ListItemText primary={props.name} />
            </ListItemButton>
        </ListItem>
    )
}