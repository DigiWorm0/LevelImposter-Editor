import React from "react";
import NumericPanelInput, {ChildNumericInputProps} from "../panel/NumericPanelInput";
import useSelectedElemProp from "@editor/selection/useSelectedElemProperty";
import LIProperties from "@/map-format/LIProperties";

export default function ElementPropNumericInput(props: ChildNumericInputProps<LIProperties>) {
    const [prop, setProp] = useSelectedElemProp(props.prop);

    return (
        <NumericPanelInput
            value={prop ?? props.defaultValue}
            onChange={setProp}
            {...props}
        />
    );
}