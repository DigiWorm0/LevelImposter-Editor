import {Checkbox, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import React from "react";

export interface OptimizeMapOptionProps {
    enabled: boolean;
    setEnabled: (value: boolean) => void;
    label: string;
    description?: string;
    icon?: React.ReactNode;
}

export default function OptimizeMapOption(props: OptimizeMapOptionProps) {
    return (
        <ListItemButton onClick={() => props.setEnabled(!props.enabled)}>
            {props.icon && (
                <ListItemIcon>
                    {props.icon}
                </ListItemIcon>
            )}

            <ListItemText
                primary={props.label}
                secondary={props.description}
            />

            <Checkbox
                edge={"end"}
                checked={props.enabled}
                onChange={() => props.setEnabled(!props.enabled)}
                color={"primary"}
                sx={{padding: 1}}
            />
        </ListItemButton>
    );
}