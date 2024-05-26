import { Box } from "@mui/material";
import React from "react";
import LIColor from "../../../../types/li/LIColor";
import ColorPicker from "../../../utils/ColorPicker";
import useSelectedElemProp from "../../../../hooks/elements/useSelectedElemProperty";
import LIMinigameProps from "../../../../types/li/LIMinigameProps";

export interface ColorInputProps {
    name: string;
    prop: keyof LIMinigameProps;
    defaultValue: LIColor;
    disableAlpha?: boolean;
}

export default function MinigamePropColorInput(props: ColorInputProps) {
    const [minigameProps, setMinigameProps] = useSelectedElemProp<LIMinigameProps>("minigameProps");

    const value = minigameProps?.[props.prop] as LIColor;

    return (
        <Box sx={{ textAlign: "center" }}>
            <ColorPicker
                fill
                minimal
                title={props.name}
                color={value ?? props.defaultValue}
                onChange={(color) => setMinigameProps({
                    ...minigameProps,
                    [props.prop]: color
                })}
                disableAlpha={props.disableAlpha}
            />
        </Box>
    )
}