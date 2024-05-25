import React from "react";
import { ChildSwitchInputProps } from "../generic/SwitchPanelInput";
import useSelectedElemProp from "../../../../hooks/elements/useSelectedElemProperty";
import LIMinigameProps from "../../../../types/li/LIMinigameProps";
import NumericPanelInput from "../generic/NumericPanelInput";


export default function MinigamePropSwitch(props: ChildSwitchInputProps<LIMinigameProps>) {
    const [minigameProps, setMinigameProps] = useSelectedElemProp<LIMinigameProps>("minigameProps")

    return (
        <NumericPanelInput
            value={minigameProps?.[props.prop] ?? props.defaultValue}
            onChange={(value) => {
                setMinigameProps({
                    ...minigameProps,
                    [props.prop]: value
                })
            }}
            {...props}
        />
    )
}