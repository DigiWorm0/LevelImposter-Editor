import React from "react";
import useSelectedElemProp from "../../../../hooks/elements/useSelectedElemProperty";
import LIMinigameProps from "../../../../types/li/LIMinigameProps";
import TextPanelInput, { ChildTextInputProps } from "../panel/TextPanelInput";


export default function MinigamePropTextInput(props: ChildTextInputProps<LIMinigameProps>) {
    const [minigameProps, setMinigameProps] = useSelectedElemProp<LIMinigameProps>("minigameProps")

    return (
        <TextPanelInput
            value={minigameProps?.[props.prop] ?? props.defaultValue ?? ""}
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