import { FormGroup, InputAdornment, TextField, Tooltip } from "@mui/material";
import React from "react";

// TODO: Remove duplicate code
export interface ChildTextInputProps<T> {
    name: string;
    prop: keyof T;
    defaultValue?: string;

    icon?: React.ReactNode;
    label?: string;
    color?: "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined
}

export interface TextPanelInputProps {
    name: string;
    value: string | any;
    onChange: (value: string) => void;

    icon?: React.ReactNode;
    label?: string;
    color?: "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined
}

export default function TextPanelInput(props: TextPanelInputProps) {
    return (
        <FormGroup sx={{ mt: 1, mb: 1 }}>
            <Tooltip title={props.name}>
                <span>
                    <TextField
                        value={props.value}
                        onChange={(e) => props.onChange(e.target.value)}
                        color={props.color ?? "primary"}
                        size={"small"}
                        label={props.name}
                        fullWidth
                        sx={{ ps: 1, pe: 1 }}
                        InputProps={{
                            startAdornment: props.icon && (
                                <InputAdornment position={"start"}>
                                    {props.icon}
                                </InputAdornment>
                            ),
                            endAdornment: props.label && (
                                <InputAdornment position={"end"}>
                                    {props.label}
                                </InputAdornment>
                            )
                        }}
                    />
                </span>
            </Tooltip>
        </FormGroup>
    );
}