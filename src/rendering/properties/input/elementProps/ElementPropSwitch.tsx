import React from "react";
import LIProperties from "@/map-format/LIProperties";
import SwitchPanelInput, {ChildSwitchInputProps} from "../panel/SwitchPanelInput";
import useSelectedElemProp from "@editor/selection/useSelectedElemProperty";


export default function ElementPropSwitch(props: ChildSwitchInputProps<LIProperties>) {
    const [prop, setProp] = useSelectedElemProp(props.prop);

    return (
        <SwitchPanelInput
            value={prop ?? props.defaultValue}
            onChange={setProp}
            {...props}
        />
    );
}