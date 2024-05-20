import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

export interface FlexNumericInputProps {
    value: number;
    onChange: (value: number) => void;
    stepSize?: number;
    inputProps?: TextFieldProps;
}

/**
 * A NumericInput that allows for the value to be changed externally.
 * This maintains the uncontrolled nature of NumericInput while updating the value when the flexValue changes.
 */
export default function FlexNumericInput(props: FlexNumericInputProps) {
    const [inputValue, setInputValue] = React.useState(props.value.toString());

    const round = React.useCallback((value: number) => {
        return Math.round(value * 10000) / 10000;
    }, []);

    const currentValue = React.useMemo(() => {
        return round(props.value);
    }, [props.value]);

    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const stringValue = e.target.value;
        const newValue = round(parseFloat(stringValue));

        setInputValue(stringValue);
        if (!isNaN(newValue) && newValue !== currentValue)
            props.onChange(newValue);
    }, [props.value, props.onChange]);

    React.useEffect(() => {
        if (currentValue !== parseFloat(inputValue))
            setInputValue(currentValue.toString());
    }, [currentValue]);

    const onKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter")
            props.onChange(parseFloat(inputValue));
        else if (e.key === "Escape")
            setInputValue(currentValue.toString());
        else if (e.key === "ArrowUp")
            props.onChange(currentValue + (props.stepSize || 1));
        else if (e.key === "ArrowDown")
            props.onChange(currentValue - (props.stepSize || 1));
        else
            return;

        e.preventDefault();
    }, [currentValue, inputValue, props.onChange, props.stepSize]);

    return (
        <TextField
            value={inputValue}
            onChange={onChange}
            onKeyDown={onKeyDown}
            {...props.inputProps}
        />
    )
}