import React from "react";
import SwitchPanelInput, {ChildSwitchInputProps} from "../panel/SwitchPanelInput";
import useSelectedElemProp from "@editor/selection/useSelectedElemProperty";
import LIMinigameProps from "@/map-format/LIMinigameProps";


export default function MinigamePropSwitch(props: ChildSwitchInputProps<LIMinigameProps>) {
    const [minigameProps, setMinigameProps] = useSelectedElemProp("minigameProps");

    return (
        <SwitchPanelInput
            value={minigameProps?.[props.prop] ?? props.defaultValue}
            onChange={(value) => {
                setMinigameProps({
                    ...minigameProps,
                    [props.prop]: value
                });
            }}
            {...props}
        />
    );
}