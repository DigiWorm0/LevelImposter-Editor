import {Checkbox, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import React from "react";

export interface CleanMapOptionProps {
    value: boolean;
    setValue: (value: boolean) => void;
    label: string;
    icon?: React.ReactNode;
}

export default function CleanMapOption(props: CleanMapOptionProps) {
    return (
        <ListItem
            disablePadding
        >
            {props.icon && (
                <ListItemIcon>
                    {props.icon}
                </ListItemIcon>
            )}

            <ListItemText primary={props.label}/>
            <Checkbox
                edge={"end"}
                checked={props.value}
                onChange={() => props.setValue(!props.value)}
                color={"primary"}
                sx={{padding: 1}}
            />
        </ListItem>
    );
}