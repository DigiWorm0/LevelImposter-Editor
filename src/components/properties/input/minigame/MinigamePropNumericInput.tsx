import React from "react";
import useSelectedElemProp from "../../../../hooks/elements/useSelectedElemProperty";
import LIMinigameProps from "../../../../types/li/LIMinigameProps";
import NumericPanelInput, { ChildNumericInputProps } from "../panel/NumericPanelInput";


export default function MinigamePropNumericInput(props: ChildNumericInputProps<LIMinigameProps>) {
    const [minigameProps, setMinigameProps] = useSelectedElemProp("minigameProps")

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