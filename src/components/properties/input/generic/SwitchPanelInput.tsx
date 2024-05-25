import { Box, FormControlLabel, Switch, Tooltip } from "@mui/material";
import React from "react";

export interface ChildSwitchInputProps<T> {
    prop: keyof T;
    defaultValue: boolean;

    name: string;
    tooltip?: string;
    disabled?: boolean;
}

export interface SwitchInputProps {
    value: boolean | any;
    onChange: (value: boolean) => void;

    name: string;
    tooltip?: string;
    disabled?: boolean;
}

export default function SwitchPanelInput(props: SwitchInputProps) {
    if (typeof props.value !== "boolean")
        return null;
    return (
        <Box sx={{ textAlign: "center" }}>
            <Tooltip title={props.tooltip}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={props.value}
                            onChange={(e) => props.onChange(e.currentTarget.checked)}
                            disabled={props.disabled}
                        />
                    }
                    label={props.name}
                />
            </Tooltip>
        </Box>
    )
}