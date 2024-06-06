import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

export interface FlexNumericInputProps {
    value: number;
    onChange: (value: number) => void;
    stepSize?: number;
    inputProps?: TextFieldProps;
    min?: number;
    max?: number;
}

/**
 * A NumericInput that allows for the value to be changed externally.
 * This maintains the uncontrolled nature of NumericInput while updating the value when the flexValue changes.
 */
export default function FlexNumericInput(props: FlexNumericInputProps) {
    const [inputValue, setInputValue] = React.useState(props.value.toString());

    /*
        Utility functions
     */
    const round = React.useCallback((value: number) => {
        return Math.round(value * 10000) / 10000;
    }, []);
    const clamp = React.useCallback((value: number) => {
        return Math.min(Math.max(value, props.min ?? -Infinity), props.max ?? Infinity);
    }, [props.min, props.max]);

    /*
        Memoized values
     */
    const currentValue = React.useMemo(() => {
        return round(props.value);
    }, [props.value]);

    React.useEffect(() => {
        if (currentValue !== parseFloat(inputValue))
            setInputValue(currentValue.toString());
    }, [currentValue]); // <-- Do not include inputValue in the dependencies


    /*
        Callbacks
     */
    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const stringValue = e.target.value;
        const newValue = round(parseFloat(stringValue));

        setInputValue(stringValue);
        if (!isNaN(newValue) && newValue !== currentValue)
            props.onChange(clamp(newValue));
    }, [props.value, props.onChange, clamp, round, currentValue]);

    const onKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter")
            props.onChange(clamp(parseFloat(inputValue)));
        else if (e.key === "Escape")
            setInputValue(currentValue.toString());
        else if (e.key === "ArrowUp")
            props.onChange(clamp(currentValue + (props.stepSize || 1)));
        else if (e.key === "ArrowDown")
            props.onChange(clamp(currentValue - (props.stepSize || 1)));
        else
            return;

        e.preventDefault();
    }, [currentValue, inputValue, props.onChange, props.stepSize, clamp]);

    return (
        <TextField
            value={inputValue}
            onChange={onChange}
            onKeyDown={onKeyDown}
            size={"small"}
            {...props.inputProps}
        />
    )
}