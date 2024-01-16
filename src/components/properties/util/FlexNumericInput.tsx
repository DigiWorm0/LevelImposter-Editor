import { NumericInput, NumericInputProps } from "@blueprintjs/core";
import React from "react";

export interface FlexNumericInputProps extends NumericInputProps {
    value: number;
    onChange: (value: number) => void;
}

/**
 * A NumericInput that allows for the value to be changed externally.
 * This maintains the uncontrolled nature of NumericInput while updating the value when the flexValue changes.
 */
export default function FlexNumericInput(props: FlexNumericInputProps) {
    const [inputValue, setInputValue] = React.useState(props.value.toString());

    const onChange = React.useCallback((value: number, stringValue: string) => {
        setInputValue(stringValue);
        if (!isNaN(value) && value !== props.value)
            props.onChange(value);
    }, [props.value, props.onChange]);

    React.useEffect(() => {
        if (props.value !== parseFloat(inputValue))
            setInputValue(props.value.toString());
    }, [props.value]);

    return (
        <NumericInput
            {...props}
            value={inputValue}
            onValueChange={onChange}
            onChange={undefined}
        />
    )
}