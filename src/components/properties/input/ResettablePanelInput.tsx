import React from "react";
import { ButtonGroup, IconButton } from "@mui/material";
import { Refresh } from "@mui/icons-material";

interface ResettableInputProps {
    children: React.ReactNode;
    onReset: () => void;
}

export default function ResettablePanelInput(props: ResettableInputProps) {
    return (
        <ButtonGroup fullWidth>
            {props.children}
            <IconButton
                size={"small"}
                onClick={props.onReset}
            >
                <Refresh />
            </IconButton>
        </ButtonGroup>
    )
}