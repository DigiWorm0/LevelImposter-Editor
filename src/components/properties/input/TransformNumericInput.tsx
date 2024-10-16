import LIElement from "../../../types/li/LIElement";
import FlexNumericInput from "../util/FlexNumericInput";
import useSelectedElemTransform from "../../../hooks/elements/useSelectedElemTransform";
import { InputAdornment } from "@mui/material";
import React from "react";

export interface TransformNumericInputProps {
    name: string;
    prop: keyof LIElement;
    icon?: React.ReactNode;
    stepSize?: number;
}

export default function TransformNumericInput(props: TransformNumericInputProps) {
    const [value, setValue] = useSelectedElemTransform<number>(props.prop);

    if (value === undefined)
        return null;
    return (
        <FlexNumericInput
            value={value}
            onChange={setValue}
            stepSize={props.stepSize ?? 0.1}
            inputProps={{
                size: "small",
                fullWidth: true,
                placeholder: props.name,
                InputProps: props.icon ? {
                    endAdornment: (<InputAdornment position={"end"}>{props.icon}</InputAdornment>)
                } : undefined
            }}
        />
    );
}