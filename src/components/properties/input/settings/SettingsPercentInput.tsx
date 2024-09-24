import React from "react";
import LISettings from "../../../../types/li/LISettings";
import useSettings from "../../../../hooks/useSettings";
import { InputAdornment, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import FlexNumericInput from "../../util/FlexNumericInput";

export interface SettingsPercentInputProps {
    name: string;
    prop: keyof LISettings;

    icon?: React.ReactNode;
    disabled?: boolean;
}

export default function SettingsPercentInput(props: SettingsPercentInputProps) {
    const [settings, setSettings] = useSettings();

    const onChange = React.useCallback((value: number) => {
        const percent = value / 100;
        setSettings({
            ...settings,
            [props.prop]: percent
        });
    }, [settings, props.prop]);

    return (
        <ListItem
            dense
            disablePadding
            secondaryAction={
                <FlexNumericInput
                    value={(settings[props.prop] as number) * 100}
                    onChange={onChange}
                    min={0}
                    max={100}
                    stepSize={10}
                    inputProps={{
                        style: { width: 150 },
                        disabled: props.disabled,
                        InputProps: {
                            endAdornment: (<InputAdornment position={"end"}>%</InputAdornment>)
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
    );
}