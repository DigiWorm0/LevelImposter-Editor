import React from "react";
import useSelectedElemProp from "../../../../hooks/elements/useSelectedElemProperty";
import LIProperties from "../../../../types/li/LIProperties";
import TextPanelInput, { ChildTextInputProps } from "../panel/TextPanelInput";

export default function ElementPropTextInput(props: ChildTextInputProps<LIProperties>) {
    const [prop, setProp] = useSelectedElemProp<string>(props.prop)

    return (
        <TextPanelInput
            value={prop ?? props.defaultValue ?? ""}
            onChange={setProp}
            {...props}
        />
    )
}