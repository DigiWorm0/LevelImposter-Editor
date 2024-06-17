import { FormGroup, InputAdornment, Tooltip } from "@mui/material";
import React from "react";
import FlexNumericInput from "../../util/FlexNumericInput";

// TODO: Remove duplicate code
export interface ChildNumericInputProps<T> {
    name: string;
    prop: keyof T;
    defaultValue: number;

    icon?: React.ReactNode;
    label?: string;
    min?: number;
    max?: number;
    stepSize?: number;
    color?: "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined
}

export interface NumericPanelInputProps {
    name: string;
    value: number | any;
    onChange: (value: number) => void;

    icon?: React.ReactNode;
    label?: string;
    min?: number;
    max?: number;
    stepSize?: number;
    color?: "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined
}

export default function NumericPanelInput(props: NumericPanelInputProps) {
    return (
        <FormGroup sx={{ mt: 1, mb: 1 }}>
            <Tooltip title={props.name}>
                <span>
                    <FlexNumericInput
                        value={props.value}
                        onChange={props.onChange}
                        stepSize={props.stepSize}
                        inputProps={{
                            color: props.color ?? "primary",
                            size: "small",
                            label: props.name,
                            fullWidth: true,
                            sx: { ps: 1, pe: 1 },
                            InputProps: {
                                startAdornment: props.icon && (
                                    <InputAdornment position={"start"}>
                                        {props.icon}
                                    </InputAdornment>
                                ),
                                endAdornment: props.label && (
                                    <InputAdornment position={"end"}>
                                        {props.label}
                                    </InputAdornment>
                                ),
                            }
                        }}
                    />
                </span>
            </Tooltip>
        </FormGroup>
    );
}