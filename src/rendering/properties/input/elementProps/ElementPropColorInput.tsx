import {Box} from "@mui/material";
import React from "react";
import LIColor from "@/map-format/LIColor";
import LIProperties from "@/map-format/LIProperties";
import ColorPicker from "../../../utils/ColorPicker";
import useSelectedElemProp from "@editor/selection/useSelectedElemProperty";

export interface ColorInputProps {
    name: string;
    prop: keyof LIProperties;
    defaultValue: LIColor;
    disableAlpha?: boolean;
}

export default function ElementPropColorInput(props: ColorInputProps) {
    const [_color, setColor] = useSelectedElemProp(props.prop);
    const color = _color as LIColor;

    return (
        <Box sx={{textAlign: "center"}}>
            <ColorPicker
                fill
                minimal
                title={props.name}
                color={color ?? props.defaultValue}
                onChange={(color) => setColor(color)}
                disableAlpha={props.disableAlpha}
            />
        </Box>
    );
}