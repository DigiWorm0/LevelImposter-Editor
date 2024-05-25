import React from "react";
import NumericPanelInput, { ChildNumericInputProps } from "../generic/NumericPanelInput";
import useSelectedElemProp from "../../../../hooks/elements/useSelectedElemProperty";
import LIProperties from "../../../../types/li/LIProperties";

export default function ElementPropNumericInput(props: ChildNumericInputProps<LIProperties>) {
    const [prop, setProp] = useSelectedElemProp<number>(props.prop)

    return (
        <NumericPanelInput
            value={prop ?? props.defaultValue}
            onChange={setProp}
            {...props}
        />
    )
}