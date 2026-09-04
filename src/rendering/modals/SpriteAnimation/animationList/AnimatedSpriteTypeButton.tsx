import React from "react";
import {Button, Divider} from "@mui/material";
import {useTranslation} from "react-i18next";

export interface AnimatedSpriteTypeRowProps {
    type: string;
    active?: boolean;
    default?: boolean;
    onClick: () => void;
}

export default function AnimatedSpriteTypeButton(props: AnimatedSpriteTypeRowProps) {
    const {t} = useTranslation();
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
                {t(`sprite.${props.type}`)}
            </Button>
            <Divider/>
        </>
    );
}