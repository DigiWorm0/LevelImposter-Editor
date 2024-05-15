import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

export interface FlexNumericInputProps {
    value: number;
    onChange: (value: number) => void;
    inputProps?: TextFieldProps;
}

/**
 * A NumericInput that allows for the value to be changed externally.
 * This maintains the uncontrolled nature of NumericInput while updating the value when the flexValue changes.
 */
export default function FlexNumericInput(props: FlexNumericInputProps) {
    const [inputValue, setInputValue] = React.useState(props.value.toString());

    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const stringValue = e.target.value;
        const value = parseFloat(stringValue);

        setInputValue(stringValue);
        if (!isNaN(value) && value !== props.value)
            props.onChange(value);
    }, [props.value, props.onChange]);

    React.useEffect(() => {
        if (props.value !== parseFloat(inputValue))
            setInputValue(props.value.toString());
    }, [props.value]);

    return (
        <TextField
            value={inputValue}
            onChange={onChange}
            {...props.inputProps}
        />
    )
}