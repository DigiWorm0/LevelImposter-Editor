import React from "react";
import LIProperties from "../../../../types/li/LIProperties";
import SwitchPanelInput, { ChildSwitchInputProps } from "../generic/SwitchPanelInput";
import useSelectedElemProp from "../../../../hooks/elements/useSelectedElemProperty";


export default function ElementPropSwitch(props: ChildSwitchInputProps<LIProperties>) {
    const [prop, setProp] = useSelectedElemProp<boolean>(props.prop)

    return (
        <SwitchPanelInput
            value={prop ?? props.defaultValue}
            onChange={setProp}
            {...props}
        />
    )
}