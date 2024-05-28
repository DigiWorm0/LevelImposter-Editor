import React from 'react';
import { useSettingsValue } from '../../../hooks/useSettings';
import { Alert, Button, Collapse } from "@mui/material";

export interface MapErrorProps {
    isVisible?: boolean,
    info?: boolean,
    icon?: React.ReactNode,
    children: React.ReactNode

    buttonText?: string,
    buttonIcon?: React.ReactNode,
    onButtonClick?: () => void
}

export default function MapError(props: MapErrorProps) {
    const { isInfoVisible } = useSettingsValue();

    const isVisible = (props.isVisible ?? true) &&
        (isInfoVisible || !(props.info ?? false));

    return (
        <Collapse in={isVisible}>
            <Alert
                severity={props.info ? "info" : "warning"}
                icon={props.icon}
                style={{
                    borderBottom: `3px solid ${props.info ? "rgb(37, 93, 128)" : "rgb(146, 100, 53)"}`,
                    borderRadius: 0
                }}
            >
                {props.children}

                {props.onButtonClick && props.buttonText && (
                    <Button
                        endIcon={props.buttonIcon}
                        onClick={props.onButtonClick}
                        color={props.info ? "primary" : "warning"}
                        sx={{ mt: 1 }}
                        size={"small"}
                        variant={"outlined"}
                        fullWidth
                    >
                        {props.buttonText}
                    </Button>
                )}
            </Alert>
        </Collapse>
    )
}
