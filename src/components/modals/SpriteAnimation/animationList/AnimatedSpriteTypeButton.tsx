import React from "react";
import {Button, Divider} from "@mui/material";

export interface AnimatedSpriteTypeRowProps {
    type: string;
    active?: boolean;
    default?: boolean;
    onClick: () => void;
}

export default function AnimatedSpriteTypeButton(props: AnimatedSpriteTypeRowProps) {
    return (
        <>
            <Button
                fullWidth
                variant={props.active ? "contained" : "text"}
                color={props.default ? "success" : "primary"}
                size={"small"}
                style={{margin: 1}}
                onClick={props.onClick}
            >
                {props.type}
            </Button>
            <Divider/>
        </>
    );
}