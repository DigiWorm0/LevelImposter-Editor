import { ExpandLess } from "@mui/icons-material";
import React from "react";

export interface AnimatedCaretIconProps {
    up: boolean;
}

export default function AnimatedCaretIcon(props: AnimatedCaretIconProps) {
    return (
        <ExpandLess
            style={{
                transform: props.up ? "rotate(0deg)" : "rotate(180deg)",
                transition: "transform 0.2s"
            }}
        />
    )
}