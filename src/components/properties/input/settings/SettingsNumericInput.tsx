import React from "react";
import LISettings from "../../../../types/li/LISettings";
import useSettings from "../../../../hooks/useSettings";
import { InputAdornment, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MaterialIcon, { IconName } from "../../../utils/MaterialIcon";
import FlexNumericInput from "../../util/FlexNumericInput";

export interface SettingsNumericInputProps {
    name: string;
    prop: keyof LISettings;

    icon?: IconName;
    disabled?: boolean;
    min?: number;
    max?: number;
    stepSize?: number;
    label?: string;
    isPercentage?: boolean;
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
                        }
                    }}
                />
            }
        >
            <ListItemButton>
                {props.icon && <ListItemIcon><MaterialIcon icon={props.icon} /></ListItemIcon>}
                <ListItemText primary={props.name} />
            </ListItemButton>
        </ListItem>
    )
}