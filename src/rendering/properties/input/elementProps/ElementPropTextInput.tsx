import React from "react";
import useSelectedElemProp from "@editor/selection/useSelectedElemProperty";
import LIProperties from "@/map-format/LIProperties";
import TextPanelInput, {ChildTextInputProps} from "../panel/TextPanelInput";

export default function ElementPropTextInput(props: ChildTextInputProps<LIProperties>) {
    const [prop, setProp] = useSelectedElemProp(props.prop);

    return (
        <TextPanelInput
            value={prop ?? props.defaultValue ?? ""}
            onChange={setProp}
            {...props}
        />
    );
}