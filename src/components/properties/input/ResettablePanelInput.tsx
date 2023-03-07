import React from "react";
import { Button, ControlGroup } from "@blueprintjs/core";

interface ResettableInputProps {
    children: React.ReactNode;
    onReset: () => void;
}

export default function ResettablePanelInput(props: ResettableInputProps) {
    return (
        <ControlGroup fill>
            {props.children}
            <Button
                minimal
                rightIcon="refresh"
                onClick={props.onReset}
            />
        </ControlGroup>
    )
}